/**
 * ¿Cómo funciona?
 * Para encriptar el texto utilizaremos un código facilitado por el usuario, dicho código nos marcará en cada posición
 * cual es la base de encriptación que debemos utilizar, además para hacerlo un poco mas complicado de descifrar, cada
 * letra utilizará una base, osea, si ponemos el texto "Hola mundo" y establecemos el código "123" el El textEncript lo
 * que hace es coger la primera letra la "H" y la busca en la Base para saber la posición en la base de caracteres
 * después va al código y utiliza el primer número para establecer la base de encriptación con lo que utilizaría el "1"
 * y buscaría la posición 18 (que pertenece a la letra "H" en la base) en baseEncrip[1], esto le devuelve el
 * valor "50" y busca dicho valor en la Base y lo sustituye por el original, seguidamente pasa al segundo caracter en
 * este caso la letra "o" y hace lo mismo pero al igual que se ha posicionado en el segundo caracter del texto ahora
 * también se posiciona en el segundo caracter de la clave con lo que ahora utilizará baseEncrip[2] para sustituir el
 * segundo caracter, y así una posición tras otra, con la salvedad de que cuando el código de encriptacion llega a su
 * última posición, este para la siguiente posición del texto vuelve a utilizar la primera posición de dicho código.
 *
 * Aquí definimos la constante Base que contendrá todos los caracteres que serán reconocidos por el encriptador
 * Después tenemos el Array de Arrays baseEncrip que es lo que usaremos para encriptar y desencriptar el texto
 * en función del código número establecido por el usuario.
 */
const Base = ["a","A","á","b","B","c","C","d","D","e","E","é","f","F","g","G","h","H","i","I","í","j","J","k","K","l","L","m","M","n","N","ñ","Ñ","o","O","ó","p","P","q","Q","r","R","s","S","t","T","u","U","ú","ü","v","V","w","W","x","X","y","Y","z","Z","0","1","2","3","4","5","6","7","8","9"," ",",",".","-","_","?","¿","!","¡",":",";","'","\"","/","\\","€","$","@","#","+","*","<",">","=","%","&","{","}","[","]"];
var baseEncrip = [
    [86, 62, 30, 91, 78, 64, 10, 5, 17, 36, 4, 97, 23, 79, 66, 59, 18, 90, 82, 75, 56, 99, 55, 95, 81, 96, 0, 72, 77, 47, 98, 33, 26, 6, 35, 60, 92, 83, 44, 65, 9, 74, 69, 38, 54, 84, 48, 8, 87, 51, 41, 40, 13, 49, 12, 28, 85, 14, 21, 71, 19, 22, 32, 39, 3, 25, 7, 24, 2, 43, 58, 94, 1, 67, 45, 63, 37, 52, 76, 61, 88, 34, 29, 57, 50, 73, 16, 11, 46, 89, 93, 70, 27, 80, 42, 15, 53, 20, 68, 31],
    [94, 36, 10, 25, 43, 28, 74, 88, 54, 83, 56, 81, 71, 44, 39, 61, 11, 64, 33, 49, 98, 93, 38, 37, 73, 24, 99, 15, 32, 41, 3, 85, 84, 40, 52, 78, 63, 5, 13, 19, 60, 34, 29, 42, 66, 59, 90, 91, 12, 48, 53, 50, 68, 86, 45, 57, 96, 72, 51, 6, 30, 76, 58, 21, 23, 0, 62, 97, 67, 69, 80, 17, 82, 27, 95, 47, 35, 55, 1, 20, 46, 92, 77, 79, 65, 4, 14, 2, 7, 9, 8, 16, 22, 18, 70, 89, 31, 26, 75, 87],
    [54, 23, 17, 6, 10, 65, 88, 70, 16, 1, 64, 84, 26, 89, 77, 48, 95, 25, 75, 43, 66, 98, 94, 19, 86, 83, 55, 99, 34, 20, 44, 32, 46, 74, 67, 72, 8, 13, 11, 28, 27, 18, 0, 42, 91, 37, 58, 52, 47, 38, 79, 4, 61, 24, 78, 90, 82, 31, 14, 9, 3, 96, 5, 39, 53, 12, 92, 33, 56, 93, 69, 85, 51, 21, 76, 71, 35, 45, 7, 2, 68, 87, 15, 50, 57, 41, 49, 63, 22, 40, 81, 30, 97, 73, 60, 80, 59, 62, 36, 29],
    [8, 22, 4, 17, 74, 40, 75, 72, 85, 21, 63, 6, 23, 47, 66, 36, 27, 38, 25, 42, 99, 50, 31, 5, 43, 49, 73, 37, 46, 88, 77, 87, 10, 51, 93, 64, 60, 11, 44, 61, 57, 33, 24, 89, 58, 1, 48, 39, 3, 18, 16, 45, 0, 79, 26, 78, 9, 56, 92, 55, 28, 41, 14, 80, 86, 19, 32, 90, 82, 95, 81, 68, 34, 30, 59, 76, 20, 67, 96, 65, 52, 91, 2, 62, 71, 97, 69, 83, 15, 94, 70, 54, 84, 53, 98, 12, 35, 13, 7, 29],
    [27, 6, 75, 93, 57, 23, 59, 47, 94, 86, 81, 91, 65, 69, 54, 22, 25, 66, 42, 19, 26, 45, 9, 99, 77, 5, 41, 72, 64, 78, 58, 32, 71, 82, 38, 83, 98, 84, 63, 35, 80, 90, 73, 28, 43, 53, 92, 39, 2, 74, 95, 20, 11, 96, 60, 8, 13, 49, 89, 88, 55, 46, 21, 30, 0, 61, 52, 51, 68, 12, 36, 37, 15, 24, 48, 16, 97, 3, 10, 85, 40, 17, 50, 1, 34, 62, 18, 67, 56, 44, 33, 79, 70, 14, 31, 29, 4, 7, 76, 87],
    [37, 98, 19, 78, 90, 28, 47, 70, 22, 48, 11, 53, 82, 15, 52, 73, 58, 76, 97, 36, 32, 39, 25, 68, 0, 75, 6, 29, 95, 51, 72, 18, 64, 45, 74, 93, 43, 46, 17, 8, 33, 66, 1, 7, 55, 80, 42, 5, 10, 84, 21, 91, 69, 67, 9, 20, 87, 4, 92, 99, 65, 59, 89, 27, 85, 44, 54, 13, 2, 23, 38, 77, 50, 41, 57, 62, 56, 61, 24, 60, 94, 86, 63, 12, 30, 40, 3, 81, 83, 79, 88, 71, 31, 35, 14, 26, 96, 34, 16, 49],
    [48, 54, 21, 35, 24, 25, 23, 27, 3, 72, 8, 58, 33, 37, 1, 53, 73, 19, 78, 65, 38, 39, 12, 96, 56, 76, 69, 90, 51, 61, 81, 89, 34, 85, 42, 18, 30, 99, 36, 17, 97, 87, 22, 57, 60, 10, 71, 93, 28, 6, 74, 92, 14, 52, 98, 47, 63, 32, 40, 91, 43, 49, 45, 0, 75, 79, 44, 7, 67, 13, 2, 82, 11, 5, 9, 46, 84, 59, 64, 31, 15, 50, 94, 66, 88, 55, 4, 16, 26, 95, 68, 83, 20, 77, 70, 29, 80, 41, 86, 62],
    [25, 91, 72, 99, 39, 83, 40, 69, 64, 56, 13, 34, 87, 79, 8, 55, 0, 90, 61, 12, 27, 80, 86, 29, 43, 9, 26, 89, 2, 33, 58, 54, 21, 23, 18, 44, 75, 15, 53, 48, 88, 82, 95, 20, 36, 5, 65, 92, 22, 63, 98, 16, 42, 85, 45, 66, 10, 73, 71, 17, 70, 78, 93, 62, 68, 52, 46, 11, 51, 84, 57, 28, 38, 74, 77, 30, 60, 97, 59, 49, 35, 94, 50, 19, 1, 24, 6, 3, 32, 76, 81, 96, 67, 41, 47, 37, 14, 7, 31, 4],
    [0, 58, 12, 53, 28, 56, 31, 26, 88, 48, 18, 75, 74, 64, 1, 50, 46, 52, 8, 95, 91, 68, 96, 55, 49, 67, 21, 54, 9, 79, 30, 80, 69, 3, 66, 97, 10, 37, 42, 19, 59, 11, 57, 5, 17, 98, 36, 22, 14, 62, 45, 72, 38, 25, 13, 90, 63, 16, 99, 83, 73, 81, 44, 41, 51, 76, 43, 93, 78, 20, 89, 6, 70, 2, 15, 32, 24, 47, 85, 86, 35, 60, 39, 94, 33, 84, 92, 34, 82, 29, 77, 71, 27, 23, 65, 40, 87, 61, 4, 7],
    [21, 71, 85, 74, 69, 63, 18, 49, 76, 14, 0, 17, 54, 89, 12, 22, 50, 13, 29, 24, 39, 46, 98, 40, 34, 30, 15, 47, 77, 9, 95, 64, 2, 5, 31, 65, 96, 56, 61, 94, 57, 37, 1, 36, 82, 27, 26, 84, 44, 7, 81, 90, 53, 58, 70, 28, 52, 41, 45, 4, 91, 92, 10, 72, 25, 55, 11, 80, 35, 6, 83, 86, 43, 8, 42, 38, 75, 67, 20, 73, 88, 97, 93, 79, 78, 68, 62, 51, 99, 23, 59, 60, 48, 32, 16, 3, 87, 33, 19, 66]
];

 // Accedemos al elemento HTML que contendrá el texto que vamos a encriptar o desencriptar
const Mensaje = document.getElementById("mensaje");

/**
  * Funcion para encriptar texto
  * Lo primero que se hace es solicitar al usuario un código el cual se usará para establecer las bases de encriptación
  * que utilizaremos. Después comprobamos la longitud del código.
  * Seguidamente guardamos el texto en una variable y comprobamos su longitud también.
  * Comprobamos si la longitud del código es mayor que la del texto de ser así el código no será válido y se solicitara
  * un nuevo código ya que el código no puede ser mayor que la longitud del texto.
  * Si el código está correcto procedemos a la encriptación.
  * Primero borramos el valor del elemento HTML para posteriormente escribir el texto encriptado en él.
  * Establecemos la variable code la cual nos marcará la posición en la que nos encontramos del código y así poder saber
  * cual baseEncrip utilizar.
  * Recorremos el texto con el ciclo for(c of texto), dentro de este ciclo recorremos el array Base para saber cual letra
  * coincide con la del texto y capturar su posición en la Base
  * Seguidamente buscamos dicha posición en la baseEncrip que corresponda según el código y la posición de la letra en la
  * la Base y la guardamos en la variable newCaracter.
  * Buscamos la posición guardada en newCaracter en la Base y guardamos el valor de dicho posición en la variable codificar
  * y dicha variable sustituirá al caracter real.
  * Después lo pasamos en el elemento HTML para mostrarlo.
  * Por último comprobamos la posición del código y si la variable code en menos que la longitud del código le suma uno a code
  * si no reinicia la posición para que así la baseEncrip vaya rotando hasta el final del texto.
  */
function encripText() {
    let codigo = prompt("Establece el código numérico de desencriptación:");
    let codigoEnBase = codigo.length;
    let texto = String(Mensaje.value);
    let newTexto = texto.replaceAll("\n", "NEWLINE");
    let mensajeEnBase = texto.length;
    if(codigoEnBase > mensajeEnBase) {
        alert("El código de encripcatión no puede ser mayor a la longitud del mensaje");
        encripText();
    } else {
        Mensaje.value = "";
        let code = 0;
        for(c of newTexto) {
            for(b in Base) {
                if(c == Base[b]) {
                    let newCaracter = baseEncrip[codigo[code]][b];
                    let codificar = Base[newCaracter];
                    Mensaje.value += codificar;
                }
            }
            if (code < codigoEnBase-1){
                code++;
            } else {
                code = 0;
            }
        }
    }
}

/**
  * Función de desencriptación.
  * Funciona mas o menos igual que la de encriptación pero no hace falta algunas comprobaciones.
  * Lo primero solicitar el código de desencriptación ni que decir tienen que debe ser el mismo si no, no se usará el
  * baseEncrip correcto en cada posición lo que puede ocasionar que no se desencripte bien el texto.
  * Al no existir ninguna copia del código esto otorga total confidencialidad, pero conlleva el riesgo de que si
  * se pierde el código el texto quedara inservible.
  * Una vez capturado el código comprobamos su longitud y la guardamos en la variable codigoEnBase
  * Accedemos al texto encriptado que está en el elemento HTML y lo pasamos a la variable texto
  * Establecemos el code para la posición del código como en el caso anterior.
  * Y borramos el elemento HTML para después poder mostrar el texto desencriptado.
  * Y en este punto hacemos casi todo igual que para encriptar pero a la inversa.
  * Recorremos el texto con el ciclo for(c of texto) dentro de este ciclo recorremos la base para saber la
  * posición que tiene el caracter, una vez encontrada la posición la buscamos en el baseEncrip correspondiente
  * y establecemos la posición, después buscamos la posición en la Base para saber el caracter real y lo guardamos
  * en newCaracter.
  * Seguidamente lo pasamos al elemento HTML para mostrarlo.
  * Por último solo queda comprobar la posición del code con respecto a la longitud del código de desencriptación
  * para sumarle una posición o reiniciarlo.
  */
function desencripText() {
    let codigo = prompt("Inserta el código numérico de desencriptación:");
    let codigoEnBase = codigo.length;
    let texto = String(Mensaje.value);
    let code = 0;
    Mensaje.value = "";
    for(c of texto) {
        for(b in Base) {
            if(c == Base[b]) {
                for(d of baseEncrip[codigo[code]]) {
                    if(b == baseEncrip[codigo[code]][d]) {
                        let newCaracter = Base[d];
                        Mensaje.value += newCaracter;
                    }
                }
            }
        }
        if (code < codigoEnBase-1){
            code++;
        } else {
            code = 0;
        }
    }
    let secret = Mensaje.value
    let newMensaje = secret.replaceAll("NEWLINE","\n");
    Mensaje.value = newMensaje;
}
/**
  * Función para copiar texto al portapapeles
  * Tengo que decir que esta no es mía he visto la he visto en varios foros y site y por supuesto la he copiado.
  * Siento que todo el código no sea mio originalmente pero debemos reconocer que todo buen programador reutiliza
  * códigos de otros programadores
  */

function copyToClipBoard() {
    var content = document.getElementById("mensaje");
    content.select();
    document.execCommand('copy');
    alert("Copied!");
}
