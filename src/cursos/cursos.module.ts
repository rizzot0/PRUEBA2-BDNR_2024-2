import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Curso, CursoSchema } from './schemas/curso.schema';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';
import { UnidadesModule } from './unidades.module';
import { ComentariosModule } from './comentarios.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Curso.name, schema: CursoSchema }]),
    forwardRef(() => UnidadesModule),
    forwardRef(() => ComentariosModule), 
  ],
  controllers: [CursosController],
  providers: [CursosService],
  exports: [CursosService, MongooseModule],
})
export class CursosModule {}
