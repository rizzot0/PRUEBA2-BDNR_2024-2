import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comentario } from './schemas/comentario.schema';
import { Curso } from './schemas/curso.schema';
import { Clase } from './schemas/clase.schema';
import { CreateComentarioDto } from './dto/create-comentario.dto';

@Injectable()
export class ComentariosService {
  constructor(
    @InjectModel(Comentario.name) private readonly comentarioModel: Model<Comentario>,
    @InjectModel(Curso.name) private readonly cursoModel: Model<Curso>,
    @InjectModel(Clase.name) private readonly claseModel: Model<Clase>,
  ) {}

  async create(createComentarioDto: CreateComentarioDto): Promise<Comentario> {
    const newComentario = await this.comentarioModel.create(createComentarioDto);
    const idRelacion = new Types.ObjectId(createComentarioDto.idrelacion);

    // Verificar si el comentario está relacionado con un curso o una clase
    const curso = await this.cursoModel.findById(idRelacion);
    if (curso) {
      // Añadir el comentario al array de comentarios del curso
      curso.comentarios.push(newComentario._id as Types.ObjectId);
      await curso.save();
    } else {
      const clase = await this.claseModel.findById(idRelacion);
      if (clase) {
        // Añadir el comentario al array de comentarios de la clase
        clase.comentarios.push(newComentario._id as Types.ObjectId);
        await clase.save();
      } else {
        throw new NotFoundException(`Curso o Clase con ID ${createComentarioDto.idrelacion} no encontrado`);
      }
    }

    return newComentario;
  }

  async findAll(): Promise<Comentario[]> {
    return this.comentarioModel.find().exec();
  }

  async findOne(id: string): Promise<Comentario> {
    const comentario = await this.comentarioModel.findById(id).exec();
    if (!comentario) {
      throw new NotFoundException(`Comentario con ID ${id} no encontrado`);
    }
    return comentario;
  }

  async update(id: string, updateComentarioDto: CreateComentarioDto): Promise<Comentario> {
    const updatedComentario = await this.comentarioModel
      .findByIdAndUpdate(id, updateComentarioDto, { new: true })
      .exec();
    if (!updatedComentario) {
      throw new NotFoundException(`Comentario con ID ${id} no encontrado`);
    }
    return updatedComentario;
  }

  async remove(id: string): Promise<void> {
    const result = await this.comentarioModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Comentario con ID ${id} no encontrado`);
    }
  }
}
