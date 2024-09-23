import axios from "axios";

// Fetches the contents of a folder in the GitHub repository, only taking .txt files
const fetchFolderContents = async () => {
  const username = "osdc";
  const repo = "pokedc";
  const folder = "cdn";
  const branch = "main";

  // GitHub API URL to list folder contents
  const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/${folder}?ref=${branch}`;

  try {
    // Fetch the folder contents
    const folderResponse = await axios.get(apiUrl);

    // Filter out only .txt files
    const txtFiles = folderResponse.data.filter(
      (item) => item.type === "file" && item.name.endsWith(".txt"),
    );

    // Fetch raw content for each .txt file
    const filePromises = txtFiles.map((file) => {
      const rawUrl = `https://raw.githubusercontent.com/${username}/${repo}/${branch}/${folder}/${file.name}`;
      return axios
        .get(rawUrl)
        .then((response) => ({
          fileName: file.name,
          content: response.data,
        }))
        .catch((error) => {
          console.error(`Error fetching ${file.name}:`, error);
          return null;
        });
    });

    // Wait for all files to be fetched
    const fileContents = await Promise.all(filePromises);

    // Filter out nulls (if any file fetch failed)
    return fileContents.filter((file) => file !== null);
  } catch (error) {
    console.error("Error fetching folder contents:", error);
    return [];
  }
};

// Parses the raw file content and returns the user data
const parseUserFile = (fileContent) => {
  const parts = fileContent
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);
  if (parts.length != 4) {
    console.warn(`Incomplete data: ${fileContent}`);
    return null;
  }
  const [name, enrl, numberStr, oneLiner] = parts;
  const number = parseInt(numberStr, 10);
  if (isNaN(number) || number > 600 || number < 1) {
    console.warn(`Invalid number: ${numberStr}`);
    return null;
  }
  if (oneLiner.length > 150) {
    console.warn("Thats a huge one liner!");
    return null;
  }
  return {
    name,
    enrl,
    number,
    oneLiner,
  };
};

// Fetches and processes Pokémon data
export const fetchPokemonData = async () => {
  try {
    // Step 1: Fetch user files (only .txt) from the GitHub repo
    const folderContents = await fetchFolderContents();
    const users = folderContents
      .map((file) => parseUserFile(file.content))
      .filter((user) => user !== null);

    console.log("Parsed user data:", users);

    // Step 2: Create an array of promises for all Pokémon API requests
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

    // Step 3: Resolve all promises in parallel
    const resolvedResults = await Promise.all(pokemonRequests);

    // Step 4: Filter out any null values from failed requests
    return resolvedResults.filter((result) => result !== null);
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return [];
  }
};
