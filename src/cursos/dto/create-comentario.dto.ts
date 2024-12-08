import { IsString, IsNotEmpty } from 'class-validator';

export class CreateComentarioDto {
  @IsString()
  @IsNotEmpty()
  nombre_autor: string;

  @IsNotEmpty()
  fecha: Date;

  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  detalle: string;

  @IsString()
  @IsNotEmpty()
  idrelacion: string; 
}
