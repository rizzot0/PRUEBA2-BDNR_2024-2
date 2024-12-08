# Proyecto de Gestión de Cursos con NestJS y MongoDB
Este proyecto es una aplicación desarrollada en Node.js utilizando el framework NestJS para gestionar cursos. La base de datos utilizada es MongoDB, que está corriendo en un contenedor Docker.

## Tecnologías Utilizadas
### -Lenguaje: TypeScript
### -Framework: NestJS
### -Base de Datos: MongoDB
### -MongoDB GUI: MongoDB Compass (Para visualizar los datos)
  
## Requisitos Previos
Asegúrate de tener instaladas las siguientes herramientas antes de ejecutar la aplicación:

### -Node.js (versión 18 o superior)
### -MongoDB Compass
### -Visual Studio Code
### -Thunder Cliente (Extension de Visual Studio Code para ver los distintos request)


## Instalación

- Descargar el repositorio y extraerlo.
- Abrir la carpeta del proyecto en Visual Studio
- Ejecutar el siguiente comando para ejecutar la aplicación
  
```
  npm install
  npm run start:dev
```
- En MongoDB Compass se podra visualizar que se crea en el puerto 27017 (Puerto local determinado de mongo) una base de datos denominada **taller1BD** con las colecciones **clases, comentarios, cursos y unidades**
- Utilizando **ThunderClient** se utiliza el puerto **3000** (Puerto determinado para las aplicaciones en nestjs) probando las distintos endpoints configurados para la aplicacion explicados a continuación. 

## Endpoints
### -Aplicación principal: http://localhost:3000 
### -Endpoint para gestión de cursos: http://localhost:3000/cursos
### -Endpoint para gestión de unidades: http://localhost:3000/unidades
### -Endpoint para gestión de clases: http://localhost:3000/clases
### -Endpoint para gestión de comentarios: http://localhost:3000/comentarios


## Uso de la API

### 4.1 Gestión de Cursos

#### a) Obtener todos los cursos
- Verbo HTTP: GET Ruta: /cursos
- Descripción: Devuelve un listado de todos los cursos disponibles, mostrando el nombre, imagen, descripción, y valoración de cada curso.

#### b) Obtener detalles de un curso
- Verbo HTTP: GET Ruta: /cursos/:id
- Parámetros: id (ID del curso)
- Descripción: Devuelve los detalles completos de un curso específico, incluyendo unidades, clases, usuarios inscritos, comentarios y valoración.

#### c) Crear un curso nuevo
- Verbo HTTP: POST Ruta: /cursos
- Parámetros en el Body (JSON):

```
{
  "nombre": String,
  "descripcion": String,
  "imagen_portada": String,
  "imagen_banner": String,
  "valoracion": int,
  "unidades": [],  // Array inicializado vacío para unidades
  "comentarios": []  // Array inicializado vacío para comentarios
}
```

#### d) Actualizar un curso
- Verbo HTTP: PUT Ruta: /cursos/:id 
- Parámetros: id (ID del curso a actualizar) 
- Descripción: Actualiza los detalles de un curso específico.


#### e) Eliminar un curso
- Verbo HTTP: DELETE Ruta: /cursos/:id
- Parámetros: id (ID del curso) 
- Descripción: Elimina un curso y toda su información de la plataforma.

### 4.2 Gestión de Unidades
#### a) Agregar una unidad a un curso
- Verbo HTTP: POST Ruta: /unidades
- Descripción: Permite agregar una nueva unidad a un curso.
```
{
  "nombre": String,
  "numero_orden": integer,
  "idCurso": String,  // ID del curso al que pertenece esta unidad
  "clases": []  // Array inicializado vacío para clases
}

```


#### b) Eliminar una unidad de un curso
- Verbo HTTP: DELETE Ruta: /unidades/:idUnidad
- Parámetros: unidadId: ID de la unidad a eliminar.
- Descripción: Elimina una unidad de un curso específico.

### 4.3 Gestión de Clases
#### a) Agregar una clase a una unidad
- Verbo HTTP: POST Ruta: /clases
- Body (JSON):

```
{
  "nombre": String,
  "descripcion": String,
  "video_url": String,
  "contenido_descargable": [
    {
      "titulo": String,
      "url": String
    }
  ],
  "numero_orden":integer,
  "idUnidad": "ID_DE_LA_UNIDAD",  // ID de la unidad a la que pertenece esta clase, es de tipo String
  "comentarios": [],  // Array inicializado vacío para comentarios
  "me_gusta": integer,
  "no_me_gusta": integer
}

```

Descripción: Agrega una clase nueva a una unidad específica dentro de un curso.

#### b) Eliminar una clase de una unidad
- Verbo HTTP: DELETE Ruta: /clase/:id
- Parámetros:  unidadId: ID de la unidad. 
- Descripción: Elimina una clase específica de una unidad en un curso.

### 4.4 Gestión de Comentarios
#### a) Agregar un comentario a un curso o a una clase
- Verbo HTTP: POST Ruta: /comentarios
- Body (JSON):

```
{
  "nombre_autor": String,
  "fecha": String,
  "titulo": String,
  "detalle": String,
  "idrelacion": "ID_DEL_CURSO_O_CLASE"  // ID del curso o clase al que está relacionado este comentario, tipo String
}
```

#### b) Eliminar un comentario 
- Verbo HTTP: POST Ruta: /comentarios/:id
- Descripcion: Eliminar un comentario con su id correspondiente

## JSON De prueba

### Curso

```
{
  "nombre": "Curso de Desarrollo Web",
  "descripcion": "Curso avanzado sobre desarrollo web con tecnologías modernas.",
  "imagen_portada": "http://example.com/imagen_portada.jpg",
  "imagen_banner": "http://example.com/imagen_banner.jpg",
  "valoracion": 5,
  "unidades": [],  // Array inicializado vacío para unidades
  "comentarios": []  // Array inicializado vacío para comentarios
}
```

### Unidad

```
{
  "nombre": "Unidad 1: Introducción a HTML",
  "numero_orden": 1,
  "idCurso": "ID_DEL_CURSO",  // ID del curso al que pertenece esta unidad
  "clases": []  // Array inicializado vacío para clases
}
```

### Clase

```
{
  "nombre": "Clase 1: Conceptos básicos de HTML",
  "descripcion": "Descripción sobre qué es HTML y cómo se estructura.",
  "video_url": "http://example.com/video_html.mp4",
  "contenido_descargable": [
    {
      "titulo": "Guía Rápida de HTML",
      "url": "http://example.com/guia_html.pdf"
    }
  ],
  "numero_orden": 1,
  "idUnidad": "ID_DE_LA_UNIDAD",  // ID de la unidad a la que pertenece esta clase
  "comentarios": [],  // Array inicializado vacío para comentarios
  "me_gusta": 0,
  "no_me_gusta": 0
}
```

### Comentario

```
{
  "nombre_autor": "Juan Perez",
  "fecha": "2024-01-01T12:00:00Z",
  "titulo": "Gran Curso",
  "detalle": "Este curso me ayudó mucho a entender los conceptos básicos.",
  "idrelacion": "ID_DEL_CURSO_O_CLASE"  // ID del curso o clase al que está relacionado este comentario
}
```


# PRUEBA 2

### 1. Base de Datos de Clave-Valor Utilizada
La aplicación utiliza **Redis** como base de datos de clave-valor para manejar información relacionada con usuarios y sus interacciones con los cursos. Redis se seleccionó por su alta velocidad y facilidad para manejar datos estructurados de manera sencilla en formatos no relacionales, **Se tiene que ejecutar Redis Sever antes de ejecutar la aplicación sino tirara error de conexion**

- **Tecnología:** Redis ( Se tiene que estar instalado previamente para poder utilizanrse https://redis.io/downloads/ )
- **Puerto:** `6379` (puerto predeterminado de Redis)
- **Tipo de almacenamiento:** Hashes para representar usuarios y sus datos asociados.

---

### 2. Estructura de la Información a Almacenar

#### Estructura del Usuario en Redis
Cada usuario se almacena como una clave en Redis con un hash que contiene la siguiente información:


```
"user:<username>": {
  "password": "string",
  "cursos": {
    "<cursoId>": {
      "estado": "string",       // Estado del curso (INICIADO, EN CURSO, COMPLETADO)
      "avance": "number",      // Porcentaje de avance del curso
      "fechaIngreso": "string",// Fecha en formato YYYY-MM-DD
      "puntuacion": "number",  // Valoración del curso
      "comentario": "string"   // Comentario del usuario sobre el curso
    }
  }
}
```

Ejemplo:

```
"user:juanita": {
  "password": "123456",
  "cursos": {
    "64f7c9d5d2feca4cfbd78901": {
      "estado": "EN CURSO",
      "avance": 50,
      "fechaIngreso": "2024-12-07",
      "puntuacion": 5,
      "comentario": "¡Excelente curso!"
    }
  }
}
```
### 3. Manejo de Relaciones y Consistencia de la Información

#### Relación entre Usuarios y Cursos

- **Redis:**  
  Los usuarios almacenan sus interacciones con los cursos en la clave `user:<username>` bajo el campo `cursos`. Esto incluye:
  - Estado del curso (INICIADO, EN CURSO, COMPLETADO).
  - Porcentaje de avance.
  - Puntuación asignada.
  - Comentario dejado por el usuario.

- **MongoDB:**  
  Los cursos almacenan las puntuaciones de todos los usuarios en el array `puntuaciones`. El promedio de la valoración del curso se actualiza dinámicamente cada vez que se recibe una nueva puntuación.

#### Consistencia

La consistencia de la información entre Redis y MongoDB se asegura mediante las siguientes estrategias:

1. **Transacciones en Redis :**  
   Usar los comandos `MULTI` y `EXEC` para manejar operaciones atómicas si se requieren múltiples cambios en Redis.

2. **Lógica de la Aplicación:**  
   Cada vez que un usuario agrega una puntuación o un comentario:
   - **Redis:** Se actualizan los datos del usuario (estado, avance, puntuación, comentario).
   - **MongoDB:** Se actualiza el promedio de puntuación del curso y los arrays relacionados.


## Codigos de ejemplo:

### Registrar usuario

```
{
  "username": "juanita",
  "password": "123456"
}

```

### Iniciar sesion

```
{
  "username": "juanita",
  "password": "123456"
}

```

### Registrar curso a usuario

```
{
  "username": "juanita",
  "cursoId": "64f7c9d5d2feca4cfbd78901" //Id curso mongodb
}

```

### Actualizar estado y avance de curso

```
{
  "username": "juanita",
  "cursoId": "64f7c9d5d2feca4cfbd78901", //Id curso mongodb
  "estado": "EN CURSO",
  "avance": 50
}

```

### Obtemer curso registrados por usuario

```
{
  "username": "juanita"
}

```

### Agregar comentario y puntuacion a un curso siendo usuario

```
{
  "username": "juanita",
  "puntuacion": 5,
  "comentario": "¡Excelente curso, aprendí mucho!"
}

```

### Obtener cursos revisados por usuario

```
{
  "username": "juanita"
}

```

### Eliminar Curso a usuario

```
{
  "username": "juanita",
  "cursoId": "cursoId123" //id curso Mongodb
}
```

## Comandos Redis

### Redis Server
```
redis-server
```
### Redis Consola 
```
redis-cli
```
### Ver detalles Curso

```
hgetall user:juanita
```

### Ver cursos registrados por usuario

```
hkeys user:juanita
```

### Ver informacion curso especifico

```
hget user:juanita cursos.cursoId123
```

### Eliminar un Curso de un Usuario

```
hdel user:juanita cursos.cursoId123
```

### Ver Todas las Claves que Contienen Usuarios

```
keys user:*
```

### Eliminar usuario

```
del user:juanita
```



