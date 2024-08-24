import axios from "axios";
const getPokemon = async (id: number) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`, {
      timeout: 5000,
    });
    const pokemon = res.data;
    return {
      Pokiname: pokemon.name,
      PokiHeight: pokemon.height,
      PokeSprite:
        pokemon.sprites.versions["generation-v"]["black-white"].front_default,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export default getPokemon;
