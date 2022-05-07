"use strict";

console.log("----------------------------------------");
console.log("Fetch de HTTP");

// Opciones de la petición (valores por defecto)
const options = {
    method: "GET"
};
   
// Petición HTTP
fetch("https://pokeapi.co/api/v2/pokemon/1", options)
    .then(response => response.text())
    .then(data => {
        /** Procesar los datos **/
        console.log("Datos procesados en formato texto");
});

console.log("----------------------------------------");
console.log("Método text vs json");

fetch("https://pokeapi.co/api/v2/pokemon/1")
    .then(response => response.text())
    .then(data => {
        const json = JSON.parse(data);
        console.log(json);
    });

fetch("https://pokeapi.co/api/v2/pokemon/1")
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });


console.log("----------------------------------------");
console.log("Validación de datos");

const URL = "https://pokeapi.co/api/v2/pokemon/1"

// Como validamos los datos hasta el momento con "ok"
fetch(URL)
    .then(response => {
        if (response.ok)
            return response.json()
        else
            throw new Error(response.status);
    })
    .then(data => {
        console.log("Datos: " + data);
    })
    .catch(err => {
        console.error("ERROR: ", err.message)
    });


// Encapsular la validación para limpiar el código
const isResponseOk = (response) => {
    if (!response.ok)
        throw new Error(response.status);
    return response.json()
}
   
fetch(URL)
    .then(response => isResponseOk(response))
    .then(data => console.log("Datos: ", data))


console.log("----------------------------------------");
console.log("Utilizando async");

const request = async (url) => {
    const response = await fetch(url);
    if (!response.ok)
        throw new Error("WARN", response.status);
    const data = await response.json();
    return data;
}

document.querySelector("button").onclick = async () => {
    const URL = "https://pokeapi.co/api/v2/pokemon/1";
    const resultOk = await request(URL);
    console.log(`resultOk: ${resultOk}`);

    const URLFalsa = "https://pokeapifalsa";
    const resultError = await request(URLFalsa);
    console.log(`resultError: ${resultError}`);
}
