import React, { useEffect, useRef } from "react";
import getPokemon from "./utils/pokeAPI";
import { getRandomInt } from "./utils/misc";
const baseHeight = 10;
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
        canvas.width = side;
        canvas.height = side;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "#fdffaf";
          ctx.fillRect(0, 0, side, side);
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

          const [startx, starty] = [side / 10, side / 8];

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

export default Canvas;
