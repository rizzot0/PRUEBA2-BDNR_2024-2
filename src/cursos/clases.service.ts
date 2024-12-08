import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Clase } from './schemas/clase.schema';
import { CreateClaseDto } from './dto/create-clase.dto';
import { UnidadesService } from './unidades.service';

@Injectable()
export class ClasesService {
  constructor(
    @InjectModel(Clase.name) private readonly claseModel: Model<Clase>,
    private readonly unidadesService: UnidadesService,
  ) {}

  async create(createClaseDto: CreateClaseDto): Promise<Clase> {
    const unidadId = new Types.ObjectId(createClaseDto.unidadId);

    const newClase = new this.claseModel({
      ...createClaseDto,
      idUnidad: unidadId,
    });
    await newClase.save();

    await this.unidadesService.addClaseToUnidad(unidadId, newClase._id as Types.ObjectId);

    return newClase;
  }




  async findAll() {
    return this.claseModel.find().exec();
  }

  async findOne(id: string) {
    const clase = await this.claseModel.findById(id);
    if (!clase) {
      throw new NotFoundException(`Clase con ID ${id} no encontrada`);
    }
    return clase;
  }

  async update(id: string, updateClaseDto: CreateClaseDto) {
    const updatedClase = await this.claseModel.findByIdAndUpdate(id, updateClaseDto, { new: true });
    if (!updatedClase) {
      throw new NotFoundException(`Clase con ID ${id} no encontrada`);
    }
    return updatedClase;
  }

  async remove(id: string) {
    const deletedClase = await this.claseModel.findByIdAndDelete(id);
    if (!deletedClase) {
      throw new NotFoundException(`Clase con ID ${id} no encontrada`);
    }
    return deletedClase;
  }

  async addComentarioToClase(claseId: string, comentarioId: Types.ObjectId): Promise<void> {
    const clase = await this.claseModel.findById(claseId);
    if (!clase) {
      throw new NotFoundException(`Clase con ID ${claseId} no encontrada`);
    }
    clase.comentarios.push(comentarioId);
    await clase.save();
  }
}
