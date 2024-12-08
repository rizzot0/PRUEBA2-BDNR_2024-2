import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Comentario extends Document {
  @Prop({ required: true })
  nombre_autor: string;

  @Prop()
  fecha: Date;

  @Prop({ required: true })
  titulo: string;

  @Prop({ required: true })
  detalle: string;

  @Prop({ type: Types.ObjectId })
  idrelacion: Types.ObjectId; // ID del curso o clase al que se relaciona este comentario
}

export const ComentarioSchema = SchemaFactory.createForClass(Comentario);
