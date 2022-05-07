"use strict";

console.log("----------------------------------------");
console.log("Fetch PokeApi");

const request = async (url) => {
    const response = await fetch(url);
    if (!response.ok)
        throw new Error("WARN", response.status);
    const data = await response.json();
    return data;
}

document.querySelector("button").onclick = async () => {
    const numeroPokemon = document.querySelector("#pokeNumber").value;
    if(numeroPokemon == "" || numeroPokemon < 1 || numeroPokemon > 151) {
        alert("Nº pokemon incorrecto, rango valido de 1 a 151");
        return;
    }
    const URL = `https://pokeapi.co/api/v2/pokemon/${numeroPokemon}`;
    const data = await request(URL);
    
    const pokeName = document.querySelector('#pokeName');
    const pokeId = document.querySelector('#pokeId');
    const pokeTypes = document.querySelector('#pokeTypes');
    const pokeStats = document.querySelector('#pokeStats');


    pokeName.textContent = data.name;
    pokeId.textContent = `Nº ${data.id}`;
    const { stats, types } = data;

    pokeTypes.innerHTML = '';  // Borrar todos los divs dentro
    types.forEach(type => {
        // Por cada type crear un div cuyo contenido sea el tipo de pokemon
        const typeTextElement = document.createElement("div");
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });

    pokeStats.innerHTML = '';  // Borrar todos los divs dentro
    stats.forEach(stat => {
        // Por cada type crear un div cuyo contenido
        // sea el nombre del atributo (name) y su cantidad (amount)
        const statElement = document.createElement("div");

        const statElementName = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        
        const statElementAmount = document.createElement("div");
        statElementAmount.textContent = stat.base_stat;       
        
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });

}
