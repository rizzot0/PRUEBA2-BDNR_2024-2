import { IsString, IsNotEmpty } from 'class-validator';

export class CreateClaseDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsString()
  video_url: string;

  contenido_descargable: { titulo: string; url: string }[];

  @IsNotEmpty()
  numero_orden: number;

  @IsString()
  @IsNotEmpty()
  unidadId: string; // ID de la unidad para relacionar la clase
}
