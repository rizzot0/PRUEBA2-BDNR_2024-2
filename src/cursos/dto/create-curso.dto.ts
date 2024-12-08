import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateCursoDto {
  @IsString()
  readonly nombre: string;

  @IsOptional()
  @IsString()
  readonly descripcion?: string;

  @IsOptional()
  @IsString()
  readonly imagen_portada?: string;

  @IsOptional()
  @IsString()
  readonly imagen_banner?: string;

  @IsOptional()
  @IsArray()
  readonly unidades?: string[]; 
}
