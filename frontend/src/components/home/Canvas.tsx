import React, { useEffect, useRef } from "react";
import axios from "axios";
const baseHeight = 10;
const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fetchAndDrawPokemon = async () => {
      const canvas = canvasRef.current;
      const side = (window.innerHeight * 8) / 10;
      if (canvas) {
        canvas.width = side * 2;
        canvas.height = side;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "#fdffaf";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          const pokemonData: object[] = [];
          for (let i = 0; i < 100; i++) {
            const data = await getPokemon(getRandomInt(1, 600));
            if (data) {
              if (data.PokiHeight > 20) data.PokiHeight = 20;
              pokemonData.push(data);
            }
          }
          pokemonData.sort((a, b) => b.PokiHeight - a.PokiHeight);
          for (let i = 0; i < pokemonData.length; i++) {
            console.log(pokemonData[i].PokiHeight);
            const img = new Image();
            img.src = pokemonData[i].PokeSprite;

            img.onload = () => {
              // Draw the image only after it has loaded
              ctx.drawImage(
                img,
                getRandomInt(0, side),
                getRandomInt(0, side),
                baseHeight * pokemonData[i].PokiHeight,
                baseHeight * pokemonData[i].PokiHeight,
              );
            };

            img.onerror = () => {
              console.error("Failed to load image:", pokemonData[i].PokeSprite);
            };
          }
        }
      }
    };

    fetchAndDrawPokemon();
  }, []);

  return <canvas ref={canvasRef} width={500} height={500}></canvas>;
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
        pokemon.sprites.versions["generation-v"]["black-white"].animated
          .front_default,
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
