# Ingeniería de Software

Escuela Superior de Cómputo | Instituto Politécnico Nacional

> _**Semestre:** 2022-1_  
> _**Profesor:** Marko Alfonso González Ramírez_  
> _**Autor:** Alan Ignacio Delgado Alarcón_

## Contribuidores (Equipo)
* [José Ricardo Carapia González](https://github.com/JRCG241997)
* [Paulina Galicia Fuerte](https://github.com/PauGF)
* [Janice Amairani García Samperio](https://github.com/JaniceGar)
* [Edher Aldair López Hernández](https://github.com/Aldair88e)

### Menciones
Los siguientes compañeros fueron parte del equipo inicial, pero el profesor decidió hacer cambios random durante el 2do parcial.
* Fernando Arellano García
* Sebastián Cipriano Damián
* ~~Aarón Ascencio Mata~~

## Información General
Repositorio del proyecto final de la asignatura **_Ingeniería de Software_**.  
Para ver una demo visita la **[Heroku demo](http://mathebasics.herokuapp.com/)**

### MatheBasics
Aplicación Web de apoyo en el aprendizaje de la asignatura de **Matemáticas** en el nivel de educación básica (Secundaria).  
En este proyecto se presentan los temas para el **3er grado** de educación Secundaria, con base en los programas y planes vigente de la SEP (Secretaría de Educación Pública) en México. 

### Tecnologías
El código fuente esta desarrollado con y necesita de:  
> `JavaScript` `NodeJS` `HTML5` `CSS3` `MySQL`

## Inicialización de la aplicación
* Clona el repositorio en tu computadora local
``` bash
git clone https://github.com/AlaniD19/IngenieriaDeSoftware.git
```

* En una terminal con la ruta de la carpeta del proyecto instala los módulos de node:
``` bash
npm install
```

* Abre la carpeta del proyecto en tu editor de código de código preferido.
* En la carpeta `database` se encuentra el script para generar la base de datos.
* Copia y pega este script en tu SGBD preferido y ejecuta.
* en el archivo `keys.js` actualiza el usuario y contraseña de tu SGBD si es necesario.
* Para iniciar la aplicación, en la terminal ejecuta el siguiente comando:
``` bash
npm run dev
```

* En la consola deberas ver los siguientes mensajes:
``` bash
server run on port: 3000
__DATABASE CONECTED
```

* En tu navegador preferido ingresa a `localhost:3000` para ver la aplicación

## Funcionamiento
Al inicar la aplicación deberás registrar una cuenta para inicar sesión.
La aplicación cuenta con:
* Modulo de curso (Unicamente se desarrollo el 3er año)
* Modulo de unidad del curso (6 unidades)
* Modulo de lección por unidad (2-6 lecciones por unidad)
* Modulo de examenes por unidad (6 examenes)
* Modulo de seguimiento
* Modulo de perfil de usuario 

La aplicación tiene 2 tipos de perfiles de usuario que podrás seleccionar al inicar sesión por primera vez:
### Guiado
En este perfil se deberán revisar todos los temas de acuerdo al programa, que se encuentra dividio en unidades. Al entrar al dashboard del curso solo estará activa la 1er unidad. Para desbloquear el resto deberás estudiar y visitar las lecciones disponibles de la unidad activa.  
Cada vez que se visite un tema se marcara como visto y lo podrás visualizar en el panel del curso. Si no haz terminado de ver las lecciones no podrás acceder al examen de la unidad. Para aprobar la unidad deberás obtener una puntuación igual o superior a **8 (ocho)** en el exámen. Tienes intentos ilimitados y cada uno se registrará en el tablero de avance del curso que podrás ver en la pestaña `progreso`.

### Libre
En este perfil podrás ver y aplicar a las lecciones y los exámenes de manera totalmente libre. Encontrarás todo el contenido del curso disponible y activo para poderlo ver. Tus puntuaciones en los examenes tambien se registrarán en el tablero de avance del curso, pero no afectarán a la activación o bloqueo de undades; solo será un indicador de consulta extra.

## Observaciones de funcionamiento
* En el perfil del usuario solo podrás actualizar la contraseña, ya que el correo electrónico registrado es tu clave de usuario única.
* No se recopila ningun dato sensible de usuario en el registro más que el correo electrónico por seguridad y definición de regla de negocio.
* Ya que no se guardan datos sensibles la aplicación cambiará el avatar de perfil aleatoriamente entre páginas con algunos avatares establecidos. Encontrarás 2 avatares especiales (Einstein y Marilyn Monroe).

## Imágenes muestra
_**Home:**_  
![Home](/capturas/home.png)

_**Primer inicio de sesión / Selección de tipo de curso**_  
![User type](/capturas/dashboard.png)

_**Perfil de usuario**_  
![Profile](/capturas/profile.png)

_**Panel de progreso**_  
![Progress](/capturas/progress.png)

_**Examén**_  
![Exam](/capturas/exam.png)

_**Lección**_
![Lesson](/capturas/unit.png)