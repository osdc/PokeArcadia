import React, { useEffect, useRef } from "react";
import axios from "axios";

const baseHeight = 10;

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fetchAndDrawPokemon = async () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "#fdffaf";
          /*const background = new Image();
          background.src =
            "https://opengameart.org/sites/default/files/big%20ol%20ssss_0.png";
          background.onload = () => {
            ctx.drawImage(
              background,
              0,
              0,
              window.innerWidth,
              window.innerHeight,
            );
            };*/

          const pokemonData: {
            Pokiname: string;
            PokiHeight: number;
            PokeSprite: string;
            img: HTMLImageElement;
          }[] = [];

          // Fetch Pokémon data and preload images
          for (let i = 0; i < 20; i++) {
            const data = await getPokemon(getRandomInt(1, 600));
            if (data) {
              data.PokiHeight = Math.max(10, Math.min(data.PokiHeight, 20));

              const img = new Image();
              img.src = data.PokeSprite;

              // Wait for the image to load
              await new Promise((resolve, reject) => {
                img.onload = () => resolve(null);
                img.onerror = () =>
                  reject(`Failed to load image: ${data.PokeSprite}`);
              });

              pokemonData.push({ ...data, img });
            }
          }

          const maxWidth = canvas.width;
          const maxHeight = canvas.height;

          const [startx, starty] = [
            window.innerWidth / 10,
            window.innerHeight / 8,
          ];

          // Sort Pokémon by natural image height in descending order
          pokemonData.sort((a, b) => b.PokiHeight - a.PokiHeight);

          // Set up coordinates and padding
          let padding = 10;
          const xOffsetMin = -500;
          const xOffsetMax = 1500;
          let xCoord = padding;
          let yCoord = padding;
          let base: number = pokemonData[0].PokiHeight * baseHeight;

          // Draw each Pokémon on the canvas
          for (let i = 0; i < pokemonData.length; i++) {
            const { img, PokiHeight } = pokemonData[i];
            const size = baseHeight * PokiHeight;

            // Ensure xCoord and yCoord stay within canvas bounds
            if (xCoord + startx + size > maxWidth || xCoord + startx < 0) {
              xCoord = padding;
              yCoord += size / 2 + getRandomInt(1, 5); // Move to the next row
              base = pokemonData[i].PokiHeight * baseHeight;
            }

            if (yCoord + starty + size > maxHeight || yCoord + starty < 0) {
              // Stop drawing if it exceeds the canvas height
              break;
            }

            ctx.drawImage(
              img,
              xCoord + startx,
              starty + base + yCoord - size,
              size,
              size,
            );

            padding = (size * getRandomInt(xOffsetMin, xOffsetMax)) / 1000;
            xCoord += size + padding;
          }
        }
      }
    };

    fetchAndDrawPokemon();
  }, []);

  return <canvas ref={canvasRef} width={0} height={0}></canvas>;
};

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

export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default Canvas;
