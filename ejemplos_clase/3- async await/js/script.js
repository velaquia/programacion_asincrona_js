"use strict";

const NOTA = `NOTA IMPORTANTE:
        Para que este código funcione debe lanzar el index.html
        desde liveserver, de lo contrario el sistema le arrojará
        un error de CORS`
console.log(NOTA);

console.log("----------------------------------------");
console.log("Cómo utilizar async/await");

async function funcion_asincrona() {
    return 42;
}

// Misma manera de crear una función async pero en formato flecha
const funcion_asincrona2 = async () => {
    return 42
};

// Mismo caso pero evitando el return por tratarse de una
// una instrucción
const funcion_asincrona3 = async () => 42;

// Consumiendo la función async dentro de una rutina asíncrona
// En este caso al presionar el boton en el HTML
// Utilizamos "await" para invocar a la función async
document.querySelector("button").addEventListener("click", async () => {
    const resultado = await funcion_asincrona();
    console.log(resultado);
});
  
console.log("----------------------------------------");
console.log("Procesar varias promesas con async/await");

async function pasarMayusculas(datos) {
    return datos.map(dato => dato.toUpperCase());
}

async function mostrarConsola(datos) {
    datos.forEach(dato => console.log(dato));
}

// Crear promesas
const promesa1 = fetch("./datos2.txt")
    .then(res => res.text());
const promesa2 = fetch("./datos3.txt")
    .then(res => res.text());
    
// Ejecutar promesas
Promise.all([promesa1, promesa2])
    .then( async datos => {
        const datosMayuscula = await pasarMayusculas(datos);
        await mostrarConsola(datosMayuscula);
    })