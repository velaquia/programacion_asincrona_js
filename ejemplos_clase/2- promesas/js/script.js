"use strict";

const NOTA = `NOTA IMPORTANTE:
        Para que este código funcione debe lanzar el index.html
        desde liveserver, de lo contrario el sistema le arrojará
        un error de CORS`
console.log(NOTA);

console.log("----------------------------------------");
console.log("Consumir una promesa con fetch");

// Este ejemplo a continuación no funcionará porque
// esta armado como código secuencial
const textoRespuesta = fetch("./datos.txt").then(function(response) {
    /* Código a realizar cuando se cumpla la promesa */
    return response.text();
});
  
console.log(`Datos1: ${textoRespuesta}`)

fetch("./datos.txt")
    .then(response => {
        /* Retornar los datos cuando se cumple la promesa */
        return response.text();
    })
    .then(data => {
        /* Código seguido a que se cumpla la promesa */
        console.log(`Datos2: ${data}`)
    });

/* 
    Conclusión: Podrá ver en la consola que "Datos1" nunca imprime el
    texto que se encuentra en datos.txt porque nunca esperamos
    a que se cumpliera la promesa, ese consol.log se llama aún cuando
    la promesa está en pending (no funciona el código secuencial).
    Si necesita realizar una acción seguida de una promesa, deben encadenar
    otra promesa con la siguiente acción a realizar, como sucede con "Datos2".
*/

console.log("----------------------------------------");
console.log("Encadenando promesas");
 
fetch("./datos.txt")
    .then(res => {
        // Si los datos pudieron ser leidos
        // retornamos los datos al siguiente "then"
        if (res.ok) return res.text();
        // Si no se pudo leer el archivo, lanzamos
        // un error para que capture el catch
        return res.text().
            then(error => {throw new Error(error)})
    })
    .then(data => data.toUpperCase())
    .then(data => console.log(data))
    .catch(error => console.log(error))
    .finally(() => console.log("¡Terminado!"))
    

console.log("----------------------------------------");
console.log("Procesar de igual manera varias promesas juntas");

function pasarMayusculas(datos) {
    return datos.map(dato => dato.toUpperCase());
}

function mostrarConsola(datos) {
    datos.forEach(dato => console.log(dato));
}

// Crear promesas
const promesa1 = fetch("./datos2.txt")
    .then(res => res.text());
const promesa2 = fetch("./datos3.txt")
    .then(res => res.text());

// Ejecutar promesas
Promise.all([promesa1, promesa2])
    .then(pasarMayusculas)
    .then(mostrarConsola)