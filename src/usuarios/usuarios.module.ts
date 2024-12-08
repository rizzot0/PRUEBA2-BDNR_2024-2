import { Module, forwardRef } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { RedisModule } from '../redis/redis.module'; 
import { MongooseModule } from '@nestjs/mongoose';
import { Curso, CursoSchema } from '../cursos/schemas/curso.schema'; 
import { CursosModule } from '../cursos/cursos.module'; 

@Module({
  imports: [
    RedisModule,
    MongooseModule.forFeature([{ name: Curso.name, schema: CursoSchema }]),  
    forwardRef(() => CursosModule), 
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
