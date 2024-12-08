// create-unidad.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUnidadDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  numero_orden: number;

  @IsString()
  @IsNotEmpty()
  idCurso: string; 
}
