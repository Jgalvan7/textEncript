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
const Base = ["a","A","á","b","B","c","C","d","D","e","E","é","f","F","g","G","h","H","i","I","í","j","J","k","K","l","L","m","M","n","N","ñ","Ñ","o","O","ó","p","P","q","Q","r","R","s","S","t","T","u","U","ú","ü","v","V","w","W","x","X","y","Y","z","Z","0","1","2","3","4","5","6","7","8","9"," ",",",".","-","_","?","¿","!","¡",":",";","'","\"","/","\\","€","$","@","#","+","-","*","<",">","=","%","&","{","}","[","]"];
var baseEncrip = [
    [67, 87, 69, 1, 21, 61, 73, 23, 7, 36, 33, 9, 98, 15, 17, 88, 91, 90, 29, 24, 41, 27, 18, 89, 97, 45, 94, 5, 6, 51, 39, 86, 34, 57, 85, 35, 65, 26, 16, 42, 99, 79, 66, 8, 76, 75, 50, 49, 22, 78, 68, 37, 54, 62, 3, 95, 4, 74, 25, 72, 30, 71, 63, 12, 31, 81, 64, 28, 32, 14, 43, 58, 60, 0, 38, 47, 55, 2, 19, 59, 13, 53, 52, 48, 11, 46, 20, 80, 93, 92, 83, 56, 40, 77, 70, 10, 84, 82, 100, 44, 96],
    [98, 77, 83, 64, 85, 56, 93, 34, 32, 26, 12, 45, 16, 58, 28, 25, 78, 50, 48, 79, 10, 22, 66, 63, 14, 0, 49, 2, 20, 31, 6, 97, 15, 61, 5, 17, 52, 42, 65, 62, 1, 8, 41, 43, 72, 100, 44, 92, 47, 60, 7, 84, 70, 21, 29, 11, 54, 74, 90, 88, 68, 55, 69, 46, 57, 38, 89, 39, 19, 80, 91, 33, 4, 67, 37, 27, 36, 35, 87, 82, 71, 96, 76, 30, 86, 73, 75, 59, 51, 95, 53, 13, 3, 81, 18, 94, 99, 40, 24, 9, 23],
    [6, 48, 90, 50, 18, 67, 55, 15, 56, 88, 68, 30, 34, 38, 70, 78, 9, 58, 26, 92, 25, 94, 33, 31, 85, 12, 40, 13, 37, 8, 87, 60, 98, 20, 3, 64, 51, 72, 61, 39, 21, 0, 4, 89, 36, 43, 74, 54, 93, 77, 44, 10, 99, 49, 5, 27, 52, 73, 80, 62, 24, 96, 45, 29, 97, 22, 79, 23, 63, 69, 46, 1, 53, 35, 81, 83, 59, 7, 100, 14, 66, 11, 17, 86, 75, 19, 82, 65, 76, 28, 16, 57, 41, 47, 32, 95, 71, 42, 91, 2, 84],
    [38, 65, 81, 79, 7, 46, 18, 6, 54, 78, 93, 86, 88, 23, 15, 64, 82, 28, 56, 80, 29, 14, 72, 11, 89, 39, 73, 50, 24, 26, 13, 8, 96, 53, 70, 47, 45, 35, 19, 60, 25, 44, 98, 48, 83, 75, 1, 100, 3, 68, 69, 95, 17, 85, 76, 27, 66, 63, 74, 21, 57, 36, 9, 42, 92, 40, 49, 16, 37, 41, 99, 31, 0, 22, 55, 10, 58, 20, 87, 97, 59, 67, 43, 91, 84, 94, 62, 61, 51, 12, 2, 4, 34, 30, 90, 5, 71, 32, 77, 52, 33],
    [82, 29, 49, 31, 21, 92, 60, 67, 68, 39, 5, 81, 47, 62, 46, 32, 7, 17, 69, 76, 89, 28, 43, 6, 16, 66, 63, 96, 56, 57, 10, 40, 51, 58, 38, 14, 22, 72, 1, 48, 12, 95, 84, 35, 37, 19, 79, 78, 75, 61, 77, 93, 42, 11, 26, 41, 0, 2, 90, 88, 15, 45, 44, 25, 80, 91, 18, 24, 13, 83, 53, 34, 86, 94, 73, 30, 50, 85, 23, 71, 74, 54, 4, 36, 55, 33, 98, 64, 87, 20, 27, 9, 100, 59, 97, 52, 65, 8, 3, 70, 99],
    [43, 21, 22, 11, 59, 78, 34, 40, 15, 16, 38, 82, 53, 24, 71, 64, 17, 12, 91, 45, 5, 4, 61, 80, 1, 95, 90, 41, 47, 94, 85, 26, 2, 54, 92, 63, 23, 31, 72, 25, 62, 6, 52, 9, 65, 98, 8, 19, 75, 10, 66, 74, 39, 58, 73, 37, 86, 13, 42, 60, 100, 96, 67, 36, 77, 32, 93, 7, 99, 68, 84, 89, 46, 3, 81, 97, 88, 14, 87, 0, 44, 33, 18, 49, 69, 51, 20, 27, 30, 55, 70, 28, 83, 57, 29, 76, 79, 35, 48, 56, 50],
    [41, 7, 86, 45, 40, 10, 70, 95, 50, 32, 60, 48, 79, 67, 2, 37, 14, 34, 97, 5, 36, 46, 6, 80, 90, 20, 30, 82, 96, 62, 24, 75, 39, 27, 71, 74, 42, 4, 19, 28, 38, 11, 18, 1, 15, 65, 23, 98, 83, 25, 77, 49, 31, 52, 26, 78, 44, 66, 68, 12, 99, 94, 13, 0, 43, 85, 54, 92, 63, 33, 3, 73, 53, 17, 76, 57, 61, 21, 81, 87, 100, 22, 93, 64, 51, 88, 84, 29, 56, 59, 69, 16, 91, 47, 55, 72, 35, 89, 9, 8, 58],
    [17, 89, 41, 80, 47, 76, 99, 20, 32, 93, 63, 24, 73, 67, 25, 82, 7, 74, 6, 83, 60, 79, 72, 94, 36, 33, 12, 77, 14, 38, 19, 43, 88, 34, 11, 23, 75, 62, 3, 84, 54, 51, 56, 53, 81, 35, 58, 13, 98, 97, 59, 92, 5, 52, 21, 69, 27, 44, 18, 87, 55, 29, 31, 86, 50, 2, 66, 16, 68, 9, 37, 100, 39, 10, 95, 28, 46, 22, 15, 61, 65, 49, 26, 30, 70, 57, 78, 48, 0, 40, 45, 85, 71, 42, 96, 91, 64, 90, 4, 8, 1],
    [93, 59, 15, 22, 64, 0, 49, 84, 42, 13, 20, 4, 18, 8, 2, 74, 66, 48, 23, 72, 86, 99, 76, 73, 82, 47, 30, 58, 25, 27, 41, 19, 79, 54, 78, 9, 56, 87, 24, 67, 98, 39, 40, 81, 100, 45, 52, 16, 5, 68, 28, 55, 38, 7, 77, 89, 60, 26, 36, 83, 69, 94, 14, 11, 44, 53, 71, 96, 85, 80, 91, 46, 6, 10, 70, 17, 92, 51, 63, 65, 62, 3, 43, 32, 90, 61, 50, 21, 35, 57, 34, 88, 75, 1, 37, 33, 29, 31, 95, 97, 12],
    [12, 32, 70, 68, 100, 17, 1, 83, 7, 29, 20, 38, 92, 30, 41, 65, 71, 23, 94, 34, 76, 4, 22, 75, 59, 80, 62, 89, 61, 99, 15, 25, 97, 93, 98, 40, 64, 56, 58, 37, 6, 53, 43, 42, 16, 87, 33, 50, 60, 19, 79, 21, 18, 9, 13, 73, 77, 74, 45, 27, 72, 96, 44, 63, 36, 69, 95, 57, 3, 51, 8, 91, 24, 88, 48, 46, 67, 47, 84, 55, 52, 49, 54, 81, 66, 5, 10, 11, 86, 14, 90, 35, 78, 31, 82, 0, 26, 85, 39, 2, 28]
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
    texto = texto.replaceAll("\n", "NEWLINE");
    let mensajeEnBase = texto.length;
    if(codigoEnBase > mensajeEnBase) {
        alert("El código de encripcatión no puede ser mayor a la longitud del mensaje");
        encripText();
    } else {
        Mensaje.value = "";
        let code = 0;
        for(c of texto) {
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
