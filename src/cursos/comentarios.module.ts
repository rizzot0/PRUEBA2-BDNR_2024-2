// comentarios.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComentariosService } from './comentarios.service';
import { ComentariosController } from './comentarios.controller';
import { Comentario, ComentarioSchema } from './schemas/comentario.schema';
import { CursosModule } from './cursos.module'; 
import { Clase, ClaseSchema } from './schemas/clase.schema'; 

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comentario.name, schema: ComentarioSchema },
      { name: Clase.name, schema: ClaseSchema },
    ]),
    forwardRef(() => CursosModule), 
  ],
  controllers: [ComentariosController],
  providers: [ComentariosService],
  exports: [ComentariosService, MongooseModule], 
})
export class ComentariosModule {}
