import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Unidad, UnidadSchema } from './schemas/unidad.schema';
import { UnidadesService } from './unidades.service';
import { UnidadesController } from './unidades.controller';
import { CursosModule } from './cursos.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Unidad.name, schema: UnidadSchema }]),
    forwardRef(() => CursosModule),
  ],
  controllers: [UnidadesController],
  providers: [UnidadesService],
  exports: [UnidadesService, MongooseModule],
})
export class UnidadesModule {}
