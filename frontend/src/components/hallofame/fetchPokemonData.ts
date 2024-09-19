import axios from "axios";

export const fetchPokemonData = async () => {
  const results = [];
  try {
    const response = await axios.get("http://localhost:3000/");
    const users = response.data.userPokemons;

    console.log("users object is: ", users);

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${user.number}`,
        );
        results.push({
          ...user,
          Pokiname: res.data.name,
          PokiHeight: res.data.height,
          PokiSprite:
            res.data.sprites.versions["generation-v"]["black-white"].animated
              .front_default,
        });
      } catch (apiError) {
        console.error(`API error for Pokémon number ${user.number}`);
      }
    }
  } catch (backendError) {
    console.error("Backend reading error:");
  }

  return results;
};
