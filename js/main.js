const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
const Url = "https://pokeapi.co/api/v2/pokemon/";

(async () => {
for (let i = 1; i <= 151; i++) {
  await fetch(Url + i)
    .then((response) => response.json())
    .then((data) => mostrarPokemon(data));
  }
})();

function mostrarPokemon(poke) {
  let types = poke.types.map((type) => `
  <p class="${type.type.name} tipo">${type.type.name}</p>
  `);
  types = types.join('');

  let pokeId = poke.id.toString();
  if (pokeId.length === 1) {
    pokeId = "00" + pokeId;
  } if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
  }

  const div = document.createElement("div");
  div.classList.add(`pokemon`);
  div.innerHTML = `
    <p class="pokemon-id-back">#${pokeId}</p>
    <div class="pokemon-imagen">
      <img src="${poke.sprites.other.home.front_default}" alt="${poke.name}" />
    </div>
    <div class="pokemon-info">
      <div class="nombre-contenedor">
        <p class="pokemon-id">#${pokeId}</p>
        <h2 class="pokemon-nombre">${poke.name}</h2>
      </div>
        <div class="pokemon-tipos">
         ${types}
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

botonesHeader.forEach(boton => boton.addEventListener('click', async (e) => {
  const botonId = e.currentTarget.id
  
  listaPokemon.innerHTML = "";
  let elementosPokemon = document.getElementsByClassName('pokemon');
  
  const fetchPokemonData = async (pokemonNumber) => {
    const response = await fetch(Url + pokemonNumber);
    const data = await response.json();
    return data;
  };

  const promises = [];
  for (let i = 1; i <= 151; i++) {
    promises.push(fetchPokemonData(i));
  }

  const pokemonDataArray = await Promise.all(promises);

  for (const data of pokemonDataArray) {
    if (botonId === "ver-todos") {
      mostrarPokemon(data);
    } else {
      const tipos = data.types.map(type => type.type.name);
      if (tipos.some(tipo => tipo.includes(botonId))) {
        mostrarPokemon(data);
        agregarClase(elementosPokemon, tipos, botonId);
      }
    } 
  }
  
}));

function agregarClase(elementos, tipos, botonId) {
  for (let i = 0; i < elementos.length; i++) {
    if (elementos[i].classList.includes = `${botonId}`) {
      elementos[i].classList.add(`${botonId}`);
    } else{
      console.log("No funciona la validacion");
    }
  }
}
