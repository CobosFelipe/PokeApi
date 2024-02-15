const listaPokemon = document.querySelector("#listaPokemon");
const Url = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
  fetch(Url + i)
    .then((response) => response.json())
    .then((data) => mostrarPokemon(data));
}

function mostrarPokemon(poke) {
  const div = document.createElement("div");
  div.classList.add("pokemon")
  div.innerHTML = `
    <p class="pokemon-id-back">#${poke.id}</p>
    <div class="pokemon-imagen">
      <img src="${poke.sprites.other.home.front_default}" alt="${poke.name}" />
    </div>
    <div class="pokemon-info">
      <div class="nombre-contenedor">
        <p class="pokemon-id">#${poke.id}</p>
        <h2 class="pokemon-nombre">${poke.name}</h2>
      </div>
        <div class="pokemon-tipos">
          <p class="electric tipo"></p>
          <p class="fighting tipo">FIGHTING</p>
        </div>
        <div class="pokemon-stats">
          <p class="stats">${poke.height}M</p>
          <p class="stats">${poke.weight}Kg</p>
        </div>
      </div>
    </div>
  `;
  listaPokemon.append(div);
}

/*

*/
