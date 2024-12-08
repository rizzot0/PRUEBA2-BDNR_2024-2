import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types} from 'mongoose';
import Redis from 'ioredis';
import { Curso } from '../cursos/schemas/curso.schema';

@Injectable()
export class UsuariosService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
    @InjectModel(Curso.name) private readonly cursoModel: Model<Curso>,
  ) {}

  async crearUsuario(username: string, password: string): Promise<string> {
    const exists = await this.redisClient.exists(`user:${username}`);
    if (exists) {
      throw new Error('El usuario ya existe');
    }
    await this.redisClient.hset(`user:${username}`, 'password', password);
    return 'Usuario creado exitosamente';
  }

  async iniciarSesion(username: string, password: string): Promise<string> {
    const storedPassword = await this.redisClient.hget(`user:${username}`, 'password');
    if (storedPassword === password) {
      return 'Inicio de sesión exitoso';
    }
    throw new Error('Credenciales incorrectas');
  }

  async obtenerUsuarios(): Promise<string[]> {
    const keys = await this.redisClient.keys('user:*');
    return keys.map((key) => key.replace('user:', ''));
  }

  async eliminarUsuario(username: string): Promise<string> {
    const result = await this.redisClient.del(`user:${username}`);
    if (result === 1) {
      return 'Usuario eliminado exitosamente';
    }
    throw new Error('Usuario no encontrado');
  }

  async agregarCurso(username: string, cursoId: string): Promise<string> {
    const key = `user:${username}`;
    const exists = await this.redisClient.exists(key);
    if (!exists) {
      throw new Error('Usuario no encontrado');
    }
    const cursoKey = `cursos.${cursoId}`;
    const fechaIngreso = new Date().toISOString().split('T')[0]; // Fecha en formato "YYYY-MM-DD"
    await this.redisClient.hset(
      key,
      cursoKey,
      JSON.stringify({ estado: 'INICIADO', avance: 0, fechaIngreso }),
    );
    return 'Curso registrado con fecha de ingreso';
  }
  

  async actualizarCurso(username: string, cursoId: string, estado: string, avance: number): Promise<string> {
    const key = `user:${username}`;
    const cursoKey = `cursos.${cursoId}`;
    const curso = await this.redisClient.hget(key, cursoKey);
    if (!curso) {
      throw new Error('Curso no registrado para el usuario');
    }
    const cursoData = JSON.parse(curso);
    cursoData.estado = estado;
    cursoData.avance = avance;
    await this.redisClient.hset(key, cursoKey, JSON.stringify(cursoData));
    return 'Estado del curso actualizado';
  }
  
  async obtenerCursos(username: string): Promise<Record<string, any>> {
    const key = `user:${username}`;
    const cursosKeys = await this.redisClient.hkeys(key);
    const cursos = {};
    for (const cursoKey of cursosKeys) {
      if (cursoKey.startsWith('cursos.')) {
        const cursoId = cursoKey.replace('cursos.', '');
        cursos[cursoId] = JSON.parse(await this.redisClient.hget(key, cursoKey));
      }
    }
    return cursos;
  }

   async agregarComentarioYPuntuacion(
    username: string,
    cursoId: string,
    puntuacion: number,
    comentario: string,
  ): Promise<string> {
    const key = `user:${username}`;
    const cursoKey = `cursos.${cursoId}`;
    const curso = await this.redisClient.hget(key, cursoKey);
    if (!curso) {
      throw new Error('Curso no registrado para el usuario');
    }
    const cursoData = JSON.parse(curso);
    cursoData.puntuacion = puntuacion;
    cursoData.comentario = comentario;

    // Convertir cursoId a ObjectId
    const objectIdCursoId = new Types.ObjectId(cursoId);
    const cursoMongo = await this.cursoModel.findById(objectIdCursoId);
    if (!cursoMongo) {
      throw new Error('Curso no encontrado en MongoDB');
    }
    cursoMongo.puntuaciones.push(puntuacion);
    cursoMongo.valoracion =
      cursoMongo.puntuaciones.reduce((a, b) => a + b, 0) /
      cursoMongo.puntuaciones.length;
    await cursoMongo.save();

    await this.redisClient.hset(key, cursoKey, JSON.stringify(cursoData));
    return 'Comentario y puntuación registrados exitosamente';
  }

  async eliminarCurso(username: string, cursoId: string): Promise<string> {
    const key = `user:${username}`;
    const cursoKey = `cursos.${cursoId}`;
    const cursoExists = await this.redisClient.hget(key, cursoKey);
  
    if (!cursoExists) {
      throw new Error('Curso no registrado para el usuario');
    }
  
    await this.redisClient.hdel(key, cursoKey);
    return 'Curso eliminado exitosamente del usuario';
  }
  
  
  async obtenerCursosRevisados(username: string): Promise<any[]> {
    const key = `user:${username}`;
    const cursosKeys = await this.redisClient.hkeys(key);
    const cursos = [];
    for (const cursoKey of cursosKeys) {
      if (cursoKey.startsWith('cursos.')) {
        const cursoId = cursoKey.replace('cursos.', '');
        const cursoData = JSON.parse(await this.redisClient.hget(key, cursoKey));
        const cursoMongo = await this.cursoModel.findById(cursoId);
        if (cursoMongo) {
          cursos.push({
            ...cursoMongo.toObject(),
            estado: cursoData.estado,
            avance: cursoData.avance,
            fechaIngreso: cursoData.fechaIngreso,
            comentario: cursoData.comentario,
            puntuacion: cursoData.puntuacion,
          });
        }
      }
    }
    return cursos;
  }
  
  
  
}
