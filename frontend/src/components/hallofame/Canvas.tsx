import React, { useEffect, useRef } from "react";
import getPokemon from "./utils/pokeAPI";
import { getRandomInt } from "./utils/misc";
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
            PokeSprite: string;
            img: HTMLImageElement;
          }[] = [];

          // Fetch Pokémon data and preload images
          for (let i = 0; i < 5; i++) {
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
              ctx.fillStyle = "#fdffaf";
              ctx.fillRect(20, side - 40, side, side);
              ctx.font = "20px Roboto";
              ctx.fillStyle = "black";
              sum += data.PokiHeight;
              ctx.fillText(
                `Generated ${pokemonData[i].Pokiname}(${19 - i})`,
                20,
                side - 20,
              );
            }
          }
          const estimatedSide = Math.sqrt(sum);
          console.log(estimatedSide);
          //Now we have the Pokemon Array
          //Let us sort it based on heights, in descending order
          pokemonData.sort((a, b) => b.PokiHeight - a.PokiHeight);
          //Now we will make an array of coordinates
          const coords: { xs: number; ys: number; xe: number; ye: number }[] =
            [];
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
          //console.log(coords);

          //This is for displaying the pokemon
          for (let i = 0; i < pokemonData.length; i++) {
            ctx.drawImage(
              pokemonData[i].img,
              coords[i].xs * scaleFactor,
              coords[i].ys * scaleFactor,
              pokemonData[i].PokiHeight * scaleFactor,
              pokemonData[i].PokiHeight * scaleFactor,
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
