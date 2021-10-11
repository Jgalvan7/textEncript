# Text Encript
![Portada del juego Zorro Feroz](https://jgalvandesign.com/assets/images/project__textEncript.jpg)
## Descripción
Bienvenidos, este es un proyecto sencillo en el cual encriptamos un texto en función de una clave numérica, si copiamos y pegamos el texto encriptado y facilitamos la clave numérica de encriptación podemos desencriptar el texto y ver el mensaje secreto.

Aunque el proyecto no es gran cosa me pareció divertido realizarlo, su aplicación real no es otra más allá de mandar mensajes secretos que no quedan registrados en ninguna parte y que no pueden ser descifrados por nadie que no tenga la clave, al menos de momento, ya veré si puedo darle algún otro uso más adelante.


### Link de acceso
Https://jgalvandesign.com/textEncript.html


### Tecnologías
HTML5, CSS, Javascript


### LICENCIA
MIT


## INSTALACIÓN
Puedes descargar los archivos desde Github directamente o clonar el repositorio.

URL de Descarga: https://github.com/Jgalvan7/textEncript.git

Clonar erpositorio: $ git clone https://github.com/Jgalvan7/textEncript.git


## CÓMO USAR
Para implementarlo en otro proyecto, simplemente debe agregar estas tres líneas de código al proyecto y guardar los archivos de CSS y JS en las carpetas correspondientes:


En el HEAD:

``<link rel="stylesheet" href="/css/styles.css">``

En el BODY:

``<section class="moduloEncript">``

``<div class="moduloEncript__container">``

``<textarea class="moduloEncript__container--mensaje" name="mensaje" id="mensaje" cols="30" rows="10"></textarea>``

``<div class="moduloEncript__container--action">``

``<input type="button" value="Encriptar" onclick="encripText()">``

``<input type="button" value="Desencriptar" onclick="desencripText()">``

``<input type="button" value="Copiar" onclick="copyToClipBoard()">``

``</div>``

``</div>``

``</section>``

``<script src="./src/textEncript.js"></script>``


## Actualizaciones y Parches
### Versión
1.0


### Fecha último Update
11/10/2021


### Notas del último parche 11/10/2021
Este es el update inicial, con una versión estable del proyecto, en futuras actualizaciones se mejorara el código para hacerlo mas compacto y corregir algunos bug.

