import React, { useEffect, useRef, useState } from "react";
import getPokemon from "./utils/pokeAPI";
import { getRandomInt } from "./utils/misc";
import gba from "/gba.png";
import introVideo from "/intro.mp4"; // Path to the intro video

let scaleFactor = 1;
let maxX = 0;
let maxY = 0;
let side: number;
let loaded: boolean = false;

const Canvas: React.FC = () => {
  const videoCanvasRef = useRef<HTMLCanvasElement>(null); // Video canvas
  const imagesCanvasRef = useRef<HTMLCanvasElement>(null); // Images canvas
  const videoRef = useRef<HTMLVideoElement>(null);
  const [allAssetsLoaded, setAllAssetsLoaded] = useState(false);

  useEffect(() => {
    const fetchAndDrawPokemon = async () => {
      const videoCanvas = videoCanvasRef.current;
      const imagesCanvas = imagesCanvasRef.current;
      const video = videoRef.current;

      if (videoCanvas && imagesCanvas && video) {
        const videoCtx = videoCanvas.getContext("2d");
        const imagesCtx = imagesCanvas.getContext("2d");
        side =
          window.innerHeight < window.innerWidth
            ? window.innerHeight
            : window.innerWidth;

        let sum = 0;
        videoCanvas.width = (window.innerWidth * 9) / 10;
        videoCanvas.height = (window.innerHeight * 9) / 10;
        imagesCanvas.width = videoCanvas.width;
        imagesCanvas.height = videoCanvas.height;
        side = videoCanvas.height * 0.476;

        // Draw the gba image on both canvases
        const imga = new Image();
        imga.src = gba;

        imga.onload = () => {
          videoCtx?.drawImage(
            imga,
            0,
            0,
            videoCanvas.width,
            videoCanvas.height,
          );
          imagesCtx?.drawImage(
            imga,
            0,
            0,
            imagesCanvas.width,
            imagesCanvas.height,
          );

          // Set up the video to play inside the canvas
          video.play();

          // Calculate the size and position of the video to fit within the gba screen
          const videoWidth = side;
          const videoHeight = side;
          const videoX = videoCanvas.width * 0.28;
          const videoY = videoCanvas.height * 0.191;

          // Play the video inside the gba screen (draw the video frame by frame)
          const drawVideo = () => {
            if (videoCtx && !allAssetsLoaded) {
              videoCtx.fillStyle = "#A8C281";
              videoCtx.fillRect(
                videoX,
                videoY,
                videoCanvas.width * 0.4381,
                videoHeight,
              );
              videoCtx.drawImage(
                video,
                videoX + side / 2,
                videoY,
                videoWidth,
                videoHeight,
              );
              requestAnimationFrame(drawVideo); // Continue drawing video until images load
            }
          };
          drawVideo();
        };

        // Fetch Pokémon data and preload images
        const pokemonData: {
          Pokiname: string;
          PokiHeight: number;
          PokeSprite: string;
          img: HTMLImageElement;
        }[] = [];

        for (let i = 0; i < 50; i++) {
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
            sum += data.PokiHeight;
          }
        }

        // Once all Pokémon images have loaded, prepare to draw them
        const estimatedSide = Math.sqrt(sum / 0.671);
        pokemonData.sort((a, b) => b.PokiHeight - a.PokiHeight);

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
          if (temp.ye > maxY) maxY = temp.ye;

          if (temp.xe > maxX) maxX = temp.xe;
          x += (pokemonData[i].PokiHeight * getRandomInt(3, 8)) / 10;

          if (x > estimatedSide * 2) {
            x = 0;
            y += max * 0.6;
            max = pokemonData[i].PokiHeight;
          }

          coords.push(temp);
        }
        console.log(maxX, " ", imagesCanvas.width);
        scaleFactor = side / maxY;
        const pushFactor =
          (0.719 * imagesCanvas.width -
            (maxX * scaleFactor + 0.284 * imagesCanvas.width)) /
          2;

        loaded = true;

        // Draw Pokémon images on the images canvas
        const drawPokemonImages = () => {
          if (imagesCtx) {
            imagesCtx.fillStyle = "white";
            imagesCtx.fillRect(
              imagesCanvas.width * 0.28,
              imagesCanvas.height * 0.191,
              imagesCanvas.width * 0.4381,
              side,
            );

            for (let i = 0; i < pokemonData.length; i++) {
              imagesCtx.drawImage(
                pokemonData[i].img,
                coords[i].xs * scaleFactor +
                  0.284 * imagesCanvas.width +
                  pushFactor,
                coords[i].ys * scaleFactor + imagesCanvas.height * 0.191,
                pokemonData[i].PokiHeight * scaleFactor,
                pokemonData[i].PokiHeight * scaleFactor,
              );
            }

            setAllAssetsLoaded(true); // Set this after drawing Pokémon images
          }
        };

        drawPokemonImages();
      }
    };

    fetchAndDrawPokemon();
  }, [allAssetsLoaded]);

  return (
    <div style={{ position: "relative", width: "90vw", height: "90vh" }}>
      {/* Canvas for video */}
      {!allAssetsLoaded && (
        <canvas
          ref={videoCanvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1, // This makes the video canvas appear on top
          }}
        ></canvas>
      )}
      {/* Canvas for images */}
      <canvas
        ref={imagesCanvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0, // This keeps the image canvas at the back
        }}
      ></canvas>

      {/* Hidden video element */}
      {!allAssetsLoaded && (
        <video
          ref={videoRef}
          src={introVideo}
          style={{ display: "none" }}
          preload="auto"
          muted
        />
      )}
    </div>
  );
};

export default Canvas;
