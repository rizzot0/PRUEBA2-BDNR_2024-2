// unidad.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Unidad extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  numero_orden: number;

  @Prop({ type: Types.ObjectId, ref: 'Curso', required: true }) 
  idCurso: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Clase' }] })
  clases: Types.ObjectId[];
}

export const UnidadSchema = SchemaFactory.createForClass(Unidad);
