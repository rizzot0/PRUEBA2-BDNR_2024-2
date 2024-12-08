import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Clase extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop()
  video_url: string;

  @Prop([{ titulo: String, url: String }])
  contenido_descargable: { titulo: string; url: string }[];

  @Prop({ required: true })
  numero_orden: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comentario' }] })
  comentarios: Types.ObjectId[];

  @Prop({ default: 0 })
  me_gusta: number;

  @Prop({ default: 0 })
  no_me_gusta: number;

  @Prop({ type: Types.ObjectId, ref: 'Unidad', required: true }) 
  idUnidad: Types.ObjectId;
}

export const ClaseSchema = SchemaFactory.createForClass(Clase);
