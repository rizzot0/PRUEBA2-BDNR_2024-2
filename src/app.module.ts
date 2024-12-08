import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CursosModule } from './cursos/cursos.module';
import { UnidadesModule } from './cursos/unidades.module';
import { ClasesModule } from './cursos/clases.module';
import { ComentariosModule } from './cursos/comentarios.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module'; // Importamos el módulo Redis

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/taller1BD'),
    RedisModule, 
    CursosModule,
    UnidadesModule,
    ClasesModule,
    ComentariosModule,
    UsuariosModule,
    AuthModule,
  ],
  controllers: [AuthController],
})
export class AppModule {}
