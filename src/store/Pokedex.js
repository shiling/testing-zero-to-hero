export default class PokeDex {
  store = {};

  constructor() {}

  listPokemons(filters) {
    let pokemons = Object.values(this.store);
    return pokemons;
  }

  getPokemonByIndex(id) {
    let pokemons = Object.values(this.store);
    let match = null;
    pokemons.forEach((pokemon) => {
      if (pokemon.id === id) {
        match = pokemon; // found it!
        return false; // break from loop, since we've found the pokemon
      }
    });
    return match;
  }

  getPokemonByName(name) {
    let result = this.store[name.trim().toLowerCase()];
    return result ? result : null;
  }

  getPokemon(id) {
    let index = Number.parseInt(id);
    if (Number.isInteger(index)) {
      return this.getPokemonByIndex(index);
    } else {
      return this.getPokemonByName(id);
    }
  }

  addPokemon(pokemon) {
    let name = pokemon.name.trim().toLowerCase();
    this.store[name] = pokemon;
  }

  updatePokemon(pokemon) {
    let name = pokemon.name.trim().toLowerCase();
    this.store[name] = pokemon;
  }

  deletePokemon(id) {
	console.log("delete pokemon: ", id)
    let pokemon = this.getPokemon(id);
	console.log("pokemon to delete: ", pokemon)
	if(pokemon != null){
		delete this.store[pokemon.name.trim().toLowerCase()];
	}
  }

  getTotal() {
    return Object.keys(this.store).length;
  }
}
