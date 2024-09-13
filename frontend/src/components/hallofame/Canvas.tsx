import React, { useEffect, useRef } from "react";
import { getRandomInt } from "./utils/misc";
import { fetchPokemonData } from "./fetchPokemonData";

let scaleFactor = 1;
let maxX = 0;
let side: number;

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fetchAndDrawPokemon = async () => {
      const canvas = canvasRef.current;
      if (canvas) {
        side =
          window.innerHeight < window.innerWidth
            ? window.innerHeight
            : window.innerWidth;
        side *= 4 / 5;
        let sum = 0;
        canvas.width = side;
        canvas.height = side;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "#fdffaf";
          ctx.fillRect(0, 0, side, side);
          const pokemonData: {
            Pokiname: string;
            PokiHeight: number;
            PokiSprite: string;
            img: HTMLImageElement;
          }[] = [];

          // Fetch Pokémon data
          const pokemons = await fetchPokemonData();
          console.log("The array of objects is: ", pokemons);

          // Preload Pokémon images using Promise.all
          await Promise.all(
            pokemons.map(async (pokemon) => {
              if (pokemon) {
                // Ensure Pokémon height is within bounds
                pokemon.PokiHeight = Math.max(10, Math.min(pokemon.PokiHeight, 20));

                const img = new Image();
                img.src = pokemon.PokiSprite;

                // Wait for the image to load
                await new Promise((resolve, reject) => {
                  img.onload = () => resolve(null);
                  img.onerror = () => reject(`Failed to load image: ${pokemon.PokiSprite}`);
                });

                pokemonData.push({ ...pokemon, img });
                sum += pokemon.PokiHeight;
              }
            })
          );

          console.log("Pokemons is: ", pokemons);

          const estimatedSide = Math.sqrt(sum);
          console.log("Estimated side: ", estimatedSide);

          // Sort the Pokémon data based on height (descending order)
          pokemonData.sort((a, b) => b.PokiHeight - a.PokiHeight);

          // Calculate coordinates for each Pokémon
          const coords: { xs: number; ys: number; xe: number; ye: number }[] = [];
          let x = 0,
            y = 0;
          let max = pokemonData[0].PokiHeight;
          for (let i = 0; i < pokemonData.length; i++) {
            const temp = {
              xs: x,
              ys: y + (max - pokemonData[i].PokiHeight),
              xe: x + pokemonData[i].PokiHeight,
              ye: y + max,
            };
            if (temp.xe > maxX) {
              maxX = temp.xe;
            }
            x += (pokemonData[i].PokiHeight * getRandomInt(3, 8)) / 10;

            if (x > estimatedSide * 2) {
              x = 0;
              y += max * 0.6;
              max = pokemonData[i].PokiHeight;
            }

            coords.push(temp);
          }

          scaleFactor = canvas.width / maxX;

          // Draw Pokémon on the canvas
          for (let i = 0; i < pokemonData.length; i++) {
            ctx.drawImage(
              pokemonData[i].img,
              coords[i].xs * scaleFactor,
              coords[i].ys * scaleFactor,
              pokemonData[i].PokiHeight * scaleFactor,
              pokemonData[i].PokiHeight * scaleFactor
            );
          }
        }
      }
    };

    fetchAndDrawPokemon();
  }, []);

  return <canvas ref={canvasRef} width={0} height={0}></canvas>;
};

export default Canvas;
