import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ClasesService } from './clases.service';
import { CreateClaseDto } from './dto/create-clase.dto';

@Controller('clases')
export class ClasesController {
  constructor(private readonly clasesService: ClasesService) {}

  @Get()
  findAll() {
    return this.clasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clasesService.findOne(id);
  }

  @Post()
  create(@Body() createClaseDto: CreateClaseDto) {
    return this.clasesService.create(createClaseDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateClaseDto: CreateClaseDto) {
    return this.clasesService.update(id, updateClaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clasesService.remove(id);
  }
}
