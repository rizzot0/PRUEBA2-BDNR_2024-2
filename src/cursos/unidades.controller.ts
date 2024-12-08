import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UnidadesService } from './unidades.service';
import { CreateUnidadDto } from './dto/create-unidad.dto';

@Controller('unidades')
export class UnidadesController {
  constructor(private readonly unidadesService: UnidadesService) {}


  //Obtener todas las unidades
  @Get()
  findAll() {
    return this.unidadesService.findAll();
  }

  //Obtener una unidad por id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unidadesService.findOne(id);
  }

  //Crear una unidad
  @Post()
  create(@Body() createUnidadDto: CreateUnidadDto) {
    return this.unidadesService.create(createUnidadDto);
  }

  //Actualizar una unidad
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUnidadDto: CreateUnidadDto) {
    return this.unidadesService.update(id, updateUnidadDto);
  }


  //Eliminar una unidad
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unidadesService.remove(id);
  }

  
}
