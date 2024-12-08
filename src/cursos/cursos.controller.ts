import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';

@Controller('cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Get()
  findAll() {
    return this.cursosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cursosService.findOne(id);
  }

  @Post()
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursosService.create(createCursoDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCursoDto: CreateCursoDto) {
    return this.cursosService.update(id, updateCursoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cursosService.remove(id);
  }



@Post(':cursoId/puntuaciones')
async agregarPuntuacion(@Param('cursoId') cursoId: string, @Body() body: { puntuacion: number }) {
  return this.cursosService.agregarPuntuacion(cursoId, body.puntuacion);
}

}
