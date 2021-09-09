const pokemonContainer = document.getElementById("pokemon_container");
const search = document.getElementById("search");
const pokemonsNumber = 150;
const colors = {
  fire: "#EE8130",
  grass: "#7AC74C",
  eletric: "#F7D02C",
  water: "#6390F0",
  ground: "#E2BF65",
  rock: "#B6A136",
  fairy: "#D685AD",
  poison: "#A33EA1",
  bug: "#A6B91A",
  dragon: "#6F35FC",
  psychic: "#F95587",
  flying: "#A98FF3",
  fighting: "#C22E28",
  normal: "#A8A77A",
  ice: "#96D9D6",
  ghost: "#735797",
  dark: "#705746",
  steel: "#B7B7CE",
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  createPokemonCard(pokemon);
};

const getPokemons = async () => {
  for (let index = 1; index <= pokemonsNumber; index++) {
    await getPokemon(index);
  }
  filter();
};

getPokemons();

const createPokemonCard = (pokemon) => {
  const pokemonCard = document.createElement("div");
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const type = pokemon.types[0].type.name;
  const color = colors[type];

  pokemonCard.classList.add("pokemon_card");
  pokemonCard.setAttribute("id", name);
  pokemonCard.style.backgroundColor = color;

  const pokemonInnerHTML = `
  <div class="img-container" >
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
      pokemon.id
    }.png" />
  </div>

  <div class="info">
    <span class="number">#${pokemon.id.toString().padStart(3, "0")} </span>
    <h3>${name}</h3>
    <small class="type">Type:<span>${type}</span> </small>
  </div>
  `;

  pokemonCard.innerHTML = pokemonInnerHTML;
  pokemonContainer.appendChild(pokemonCard);
};

const filter = () => {
  const cards = document.querySelectorAll(".pokemon_card");
  search.addEventListener("keyup", (e) => {
    const value = e.target.value.toLowerCase();
    cards.forEach((card) => {
      if (card.id.toLowerCase().includes(value)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
};
