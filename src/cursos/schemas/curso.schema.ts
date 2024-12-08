import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Comentario } from './comentario.schema';

@Schema()
export class Curso extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop()
  imagen_portada: string;

  @Prop()
  imagen_banner: string;

  @Prop({ default: 0 })
  valoracion: number; 

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Unidad' }] })
  unidades: Types.ObjectId[]; 

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comentario' }] })
  comentarios: Types.ObjectId[]; 

  @Prop({ type: [Number], default: [] })
  puntuaciones: number[]; 

  
}

export const CursoSchema = SchemaFactory.createForClass(Curso);
