import axios from "axios";

export const fetchPokemonData = async () => {
  try {
    const results = [];

    // Fetch the userPokemons list from your backend
    const response = await axios.get("http://localhost:3000"); //"https://pokearcadia.onrender.com/");
    const users = response.data.userPokemons;

    console.log("users object is: ", users);

    // Create an array of promises for all Pokémon API requests
    const pokemonRequests = users.map((user) =>
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${user.number}`)
        .then((res) => ({
          ...user,
          Pokiname: res.data.name,
          PokiHeight: res.data.height,
          PokiSprite:
            res.data.sprites.versions["generation-v"]["black-white"].animated
              .front_default,
        }))
        .catch(() => {
          console.error(`API error for Pokémon number ${user.number}`);
          return null; // Return null if there's an error to handle failed requests
        }),
    );

    // Resolve all promises in parallel
    const resolvedResults = await Promise.all(pokemonRequests);

    // Filter out any null values from failed requests
    return resolvedResults.filter((result) => result !== null);
  } catch (backendError) {
    console.error("Backend reading error:", backendError);
    return [];
  }
};
