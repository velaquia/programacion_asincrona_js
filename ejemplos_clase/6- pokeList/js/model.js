function Pokemon(id, name, types, stats) {
    this.id = id;
    this.name = name;
    const id_str = id.toString().padStart(3, "0");
    this.thumbnail = `https://raw.githubusercontent.com/InoveAlumnos/pokemon_assets_js/main/assets/${id_str}.png`;
    this.types = types;
    this.stats = stats;

    this.render = (clase) => {
        return  `<article pokemonId=${this.id} class="${clase}">
                    <img
                    src=${this.thumbnail}
                    class="icon-type"
                    alt="icon type"
                    />
                    <p>
                        ${this.name}
                    </p>
                </article>
                `
    };
}
