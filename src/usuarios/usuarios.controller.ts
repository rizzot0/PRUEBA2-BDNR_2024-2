import { Controller, Post, Get, Delete, Body, Patch, Param } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('crear')
  async crearUsuario(@Body() body: { username: string; password: string }) {
    return this.usuariosService.crearUsuario(body.username, body.password);
  }

  @Post('login')
  async iniciarSesion(@Body() body: { username: string; password: string }) {
    return this.usuariosService.iniciarSesion(body.username, body.password);
  }

  @Get()
  async obtenerUsuarios() {
    return this.usuariosService.obtenerUsuarios();
  }

  @Delete('eliminar')
  async eliminarUsuario(@Body() body: { username: string }) {
    return this.usuariosService.eliminarUsuario(body.username);
  }

  @Post('cursos/registrar')
  async agregarCurso(@Body() body: { username: string; cursoId: string }) {
    return this.usuariosService.agregarCurso(body.username, body.cursoId);
  }
  

  @Patch('cursos/actualizar')
  async actualizarCurso(@Body() body: { username: string; cursoId: string; estado: string; avance: number }) {
    return this.usuariosService.actualizarCurso(body.username, body.cursoId, body.estado, body.avance);
  }

  @Get('cursos')
  async obtenerCursos(@Body() body: { username: string }) {
    return this.usuariosService.obtenerCursos(body.username);
  }

  @Post('cursos/:cursoId/comentarios')
    async agregarComentarioYPuntuacion(
      @Param('cursoId') cursoId: string,
      @Body() body: { username: string; puntuacion: number; comentario: string },
    ) {
      return this.usuariosService.agregarComentarioYPuntuacion(
        body.username,
        cursoId,
        body.puntuacion,
        body.comentario,
      );
    }

  @Delete('cursos/eliminar')
    async eliminarCurso(@Body() body: { username: string; cursoId: string }) {
  return this.usuariosService.eliminarCurso(body.username, body.cursoId);
  }


  @Get('cursos/revisados')
    async obtenerCursosRevisados(@Body() body: { username: string }) {
  return this.usuariosService.obtenerCursosRevisados(body.username);
  }

}
