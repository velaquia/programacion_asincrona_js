"use strict";

console.log("----------------------------------------");
console.log("Fetch de JSON");
 
const ejemplo = 1;

if(ejemplo == 1) {

// Fetch de un archivo JSON
fetch("./poke.json")
    .then(response => response.text())
    .then(data => {
        /** Procesar los datos **/
        console.log("Datos procesados en formato ¿?");
        console.log(data);
});


}
if (ejemplo == 2) {

console.log("----------------------------------------");
console.log("Método JSON.parse vs json");

fetch("./poke.json")
    .then(response => response.text())
    .then(data => {
        const json = JSON.parse(data);
        console.log(json);
    });

fetch("./poke.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });

}
if (ejemplo == 3) {

console.log("----------------------------------------");
console.log("Validación de datos");

// Como validamos los datos hasta el momento con "ok"
fetch("./poke.json")
    .then(response => {
        if (response.ok)
            return response.json()
        else
            throw new Error(response.status);
    })
    .then(data => {
        console.table(data);
    })
    .catch(err => {
        console.error("ERROR: ", err.message)
    });

}

const request = async (rutaArchivo) => {
    const response = await fetch(rutaArchivo);
    if (!response.ok)
        throw new Error("WARN", response.status);
    const data = await response.json();
    return data;
}

document.querySelector("button").onclick = async () => {
    console.log("----------------------------------------");
    console.log("Utilizando async");

    const rutaArchivo = "./poke.json";
    const resultado = await request(rutaArchivo);
    console.log(resultado);

    const rutaArchivoFalsa = "./pokemon.json";
    const resultadoError = await request(rutaArchivoFalsa);
    console.log(resultadoError);
}
