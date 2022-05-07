
"use strict";

function addPokemonEvents(pokemonsFiltrados) {
    // Apuntar a todas las tarjetas de pokemons (article)
    const tarjetas = document.querySelectorAll("article");

    // Agregar eventos ...
    for(const tarjeta of tarjetas) {
        // Agregar un evento por clickear una tarjeta de pokemon
        tarjeta.onclick = () => {
            // Se toma el id del pokemon del HTML de la tarjeta
            const pokemonId = parseInt(tarjeta.getAttribute("pokemonId"));
            // Se busca el pokemon en la lista de pokemons
            // Se resta "1" porque la lista comienza en cero
            const pokemon = pokemonsFiltrados[pokemonId-1];
            console.log(`Click pokemon: ${pokemon.name}`);

            pokeName.innerText = pokemon.name;
            pokeNum.innerText = `#${pokemon.id}`;
            pokeImg.src = pokemon.thumbnail

            // Cargar los valores de stats y modificar el ancho de las barras
            for(const stat of pokemon.stats) {
                document.querySelector(`#${stat.stat.name} .stat-value`).innerText = stat.base_stat;
                const bar = document.querySelector(`#${stat.stat.name} .stat-bar`)
                const bar_width = Math.min(stat.base_stat*100/200, 100);
                bar.setAttribute("style", `width:${bar_width}%`)
            }

            // Reiniciar las clases de los tipos
            type1.className = '';
            type2.className = '';
            // Setear la clase de type1
            type1.innerText = pokemon.types[0];
            type1.classList.add(type2clase(pokemon.types[0]));

            // Setear la clase de type2 (si es que el pokemon tiene 2 clases)
            if (pokemon.types.length === 2) {
                type2.innerHTML = pokemon.types[1];
                type2.classList.add(type2clase(pokemon.types[1]));
            } else {
                type2.innerHTML = '';
                type2.classList.add('hideType');
            }

            // Mostrar la descripcion
            popup.classList.remove('hideType');

        };
    }

    /* Evento al cambiar el tipo de pokemon a mostrar */
    document.querySelector('#typeSelected').onchange = () => {
        /* JSON objecto a Pokemon */
        const pokemons = JSON.parse(sessionStorage.pokemons).map(pokeData => {
            return new Pokemon(
                pokeData.id,
                pokeData.name,
                pokeData.types,
                pokeData.stats
                );
        });
        pokeRender(pokeFilter(pokemons));
        // Almacenar la nueva seleccion en la session storage
        sessionStorage.typeSelectValue = typeSelect.value;
    }
}

/* Agregar eventos del HTML */
const popupContainer = document.querySelector('#popupContainer');
popupContainer.onclick = () => {
    // Ocultar la descripcion
    popup.classList.add('hideType');
}