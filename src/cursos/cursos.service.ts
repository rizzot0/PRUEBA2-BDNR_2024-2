import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';  
import { CreateCursoDto } from './dto/create-curso.dto';
import { Curso } from './schemas/curso.schema';
import { Unidad } from './schemas/unidad.schema';  
import { Comentario } from './schemas/comentario.schema';  

@Injectable() 
export class CursosService {
  constructor(
    @InjectModel(Curso.name) private readonly cursoModel: Model<Curso>,
    @InjectModel(Unidad.name) private readonly unidadModel: Model<Unidad>,
    @InjectModel(Comentario.name) private readonly comentarioModel: Model<Comentario>,
  ) {}

  // Método para obtener todos los cursos
  async findAll(): Promise<Curso[]> {
    return this.cursoModel.find().exec();
  }

  // Método para obtener un curso específico por su ID
  async findOne(id: string): Promise<Curso> {
    const curso = await this.cursoModel.findById(id).exec();
    if (!curso) {
      throw new NotFoundException(`Curso con ID ${id} no encontrado`);
    }
    return curso;
  }

  // Método para crear un curso nuevo
  async create(createCursoDto: CreateCursoDto): Promise<Curso> {
    const nuevoCurso = new this.cursoModel(createCursoDto);
    return nuevoCurso.save();
  }

  // Método para actualizar un curso existente por su ID
  async update(id: string, updateCursoDto: CreateCursoDto): Promise<Curso> {
    const cursoActualizado = await this.cursoModel.findByIdAndUpdate(id, updateCursoDto, { new: true }).exec();
    if (!cursoActualizado) {
      throw new NotFoundException(`Curso con ID ${id} no encontrado`);
    }
    return cursoActualizado;
  }

  // Método para eliminar un curso por su ID
  async remove(id: string): Promise<void> {
    const cursoEliminado = await this.cursoModel.findByIdAndDelete(id).exec();
    if (!cursoEliminado) {
      throw new NotFoundException(`Curso con ID ${id} no encontrado`);
    }
  }

  // Método para agregar una unidad al curso
  async addUnidadToCurso(cursoId: string, unidadId: Types.ObjectId) {
    const curso = await this.cursoModel.findById(cursoId);
    if (!curso) {
      throw new NotFoundException(`Curso con ID ${cursoId} no encontrado`);
    }
    curso.unidades.push(unidadId);
    await curso.save();
  }

  // Método para agregar un comentario al curso
  async addComentarioToCurso(cursoId: string, comentarioId: Types.ObjectId) {
    const curso = await this.cursoModel.findById(cursoId);
    if (!curso) {
      throw new NotFoundException(`Curso con ID ${cursoId} no encontrado`);
    }
    curso.comentarios.push(comentarioId);
    await curso.save();
  }

  async agregarPuntuacion(cursoId: string, puntuacion: number): Promise<string> {
    const curso = await this.cursoModel.findById(cursoId);
    curso.puntuaciones.push(puntuacion);
    curso.valoracion = curso.puntuaciones.reduce((a, b) => a + b) / curso.puntuaciones.length;
    await curso.save();
    return 'Puntuación agregada y valor promedio actualizado';
  }


}
