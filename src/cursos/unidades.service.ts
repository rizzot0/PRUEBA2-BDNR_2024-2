import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Unidad } from './schemas/unidad.schema';
import { Curso } from './schemas/curso.schema';
import { CreateUnidadDto } from './dto/create-unidad.dto';

@Injectable()
export class UnidadesService {
  constructor(
    @InjectModel(Unidad.name) private readonly unidadModel: Model<Unidad>,
    @InjectModel(Curso.name) private readonly cursoModel: Model<Curso>,
  ) {}

// Crear una nueva unidad
async create(createUnidadDto: CreateUnidadDto): Promise<Unidad> {
  const newUnidad = new this.unidadModel({
    ...createUnidadDto,
    idCurso: new Types.ObjectId(createUnidadDto.idCurso), // Asegura que idCurso es de tipo ObjectId
  });
  await newUnidad.save();

  await this.addUnidadToCurso(new Types.ObjectId(createUnidadDto.idCurso), newUnidad._id as Types.ObjectId);
  return newUnidad;
}

  
  // Método para añadir una unidad a un curso
  async addUnidadToCurso(cursoId: Types.ObjectId, unidadId: Types.ObjectId): Promise<void> {
    const curso = await this.cursoModel.findById(cursoId);
    if (!curso) {
      throw new NotFoundException(`Curso con ID ${cursoId} no encontrado`);
    }
    curso.unidades.push(unidadId as Types.ObjectId); // Asegura que unidadId es de tipo ObjectId
    await curso.save();
  }
  

  // Listar todas las unidades
  async findAll(): Promise<Unidad[]> {
    return this.unidadModel.find().exec();
  }

  // Buscar una unidad por ID
  async findOne(id: string): Promise<Unidad> {
    const unidad = await this.unidadModel.findById(id).exec();
    if (!unidad) {
      throw new NotFoundException('Unidad no encontrada');
    }
    return unidad;
  }

  // Actualizar una unidad
  async update(id: string, updateUnidadDto: CreateUnidadDto): Promise<Unidad> {
    const updatedUnidad = await this.unidadModel
      .findByIdAndUpdate(id, updateUnidadDto, { new: true })
      .exec();
    if (!updatedUnidad) {
      throw new NotFoundException('Unidad no encontrada');
    }
    return updatedUnidad;
  }

  // Eliminar una unidad
  async remove(id: string): Promise<void> {
    const result = await this.unidadModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Unidad no encontrada');
    }
  }

// Método para añadir una clase a una unidad
async addClaseToUnidad(unidadId: Types.ObjectId, claseId: Types.ObjectId): Promise<void> {
  const unidad = await this.unidadModel.findById(unidadId);
  if (!unidad) {
    throw new NotFoundException(`Unidad con ID ${unidadId} no encontrada`);
  }

  if (!unidad.clases.includes(claseId)) {
    unidad.clases.push(claseId);
    await unidad.save();
  }
}

}
