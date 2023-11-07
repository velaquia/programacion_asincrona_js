"use strict";

function PrimeraLetraMayuscula(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

console.log("----------------------------------------");
console.log("Fetch Poke JSON");
const tableHead =

    fetch("./bulbasaur.json")
        .then(response => {
            if (response.ok)
                return response.json()
            else
                throw new Error(response.status);
        })
        .then(data => {
            let name = data.name
            name = PrimeraLetraMayuscula(name)
            document.getElementById('pokeName').innerHTML = name
            const fragment = document.createDocumentFragment();
            const ul = document.createElement('ul');
            const type = document.getElementById('pokeTypes');
            for (const [key, value] of Object.entries(data.types)) {
                for (const [key2, value2] of Object.entries(value)) {
                    if (key2 === "type") {
                        let tipo = value2.name;
                        tipo = PrimeraLetraMayuscula(tipo)
                        const li = document.createElement('li');
                        li.textContent = `${tipo}`;
                        fragment.appendChild(li);
                    }
                }
            }
            ul.appendChild(fragment);
            type.appendChild(ul);

            const pokeStats = document.getElementById('pokeStats');
            const tabla = document.createElement('table');
            tabla.setAttribute('border', '1')
            const titulo = document.createElement('tr');
            for (const [key, value] of Object.entries(data.stats)) {
                for (const [key2, value2] of Object.entries(value)) {
                    if (key2 ==="stat") {
                        let name = value2.name;
                        name = PrimeraLetraMayuscula(name)
                        const th = document.createElement('th');
                        th.textContent = `${name}`;
                        titulo.appendChild(th);
                        tabla.appendChild(titulo);
                    }
                }
            } 
            
            const stats = document.createElement('tr');
            for (const [key, value] of Object.entries(data.stats)) {
                for (const [key2, value2] of Object.entries(value)) {
                     if (key2 === "base_stat") {
                        const stat = value2;
                        const td = document.createElement('td')
                        td.textContent = `${stat}`;
                        stats.appendChild(td)
                        tabla.appendChild(stats);
                    }
                } 
            }                  
            pokeStats.appendChild(tabla);
       })