import React, { useEffect, useRef, useState } from "react";
import { getRandomInt } from "./utils/misc";
import gba from "/largeboy.png";
import { fetchPokemonData } from "./fetchPokemonData";
let scaleFactor = 1;
let maxX = 0;
let maxY = 0;
let side: number;
let pointerCanvas: HTMLCanvasElement;
let pointerCtx: CanvasRenderingContext2D;
const pokemonData: {
  Pokiname: string;
  PokiHeight: number;
  PokeSprite: string;
  img: HTMLImageElement;
}[] = [];
const coords: { xs: number; ys: number; xe: number; ye: number }[] = [];
//Here x,y are top left of the mini screen
//xl,yl are dimensions of the miniscreen and l,b are dimensions of the entire scene
//Their ratios are used to make it compatible with every screen
let pushFactor: number;
const x = 409,
  y = 264,
  xl = 1084,
  yl = 787,
  l = 1922,
  b = 1321,
  r = 50,
  b1 = [47 + r, 471 + r],
  b2 = [223 + r, 471 + r],
  b3 = [1692 - 62 + r, 463 + r],
  b4 = [1853 - 62 + r, 391 + r];
const A = yl / b,
  B = x / l,
  C = y / b,
  D = xl / l,
  E = b / l,
  F = xl / b;

let newRad: number, nb1: number[], nb2: number[], nb3: number[], nb4: number[];
//const A = 0.476,
//  B = 0.284,
//  C = 0.191,
//  D = 0.4381,
//  E = 0.671,
//  F = 0.709;
const Canvas: React.FC = () => {
  const [mode, setMode] = useState(-1);
  const [pokeIndex, setPokeIndex] = useState(0);
  const videoCanvasRef = useRef<HTMLCanvasElement>(null); // Video canvas
  const imagesCanvasRef = useRef<HTMLCanvasElement>(null); // Images canvas
  const pointerCanvasRef = useRef<HTMLCanvasElement>(null); //The pointer
  const videoRef = useRef<HTMLVideoElement>(null);
  const [allAssetsLoaded, setAllAssetsLoaded] = useState(false);

  useEffect(() => {
    const fetchAndDrawPokemon = async () => {
      const videoCanvas = videoCanvasRef.current;
      const imagesCanvas = imagesCanvasRef.current;
      pointerCanvas = imagesCanvasRef.current;
      const video = videoRef.current;

      if (videoCanvas && imagesCanvas && video && pointerCanvas) {
        const videoCtx = videoCanvas.getContext("2d");
        const imagesCtx = imagesCanvas.getContext("2d");
        pointerCtx = pointerCanvas.getContext("2d");

        let sum = 0;
        const bigSide = window.innerHeight;
        videoCanvas.width = bigSide * 1.8;
        videoCanvas.height = bigSide;
        imagesCanvas.width = videoCanvas.width;
        imagesCanvas.height = videoCanvas.height;
        pointerCanvas.width = videoCanvas.width;
        pointerCanvas.height = videoCanvas.height;
        side = videoCanvas.height * A;
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
          const videoX = videoCanvas.width * B;
          const videoY = videoCanvas.height * C;
          newRad = r;
          nb1 = [
            (b1[0] * imagesCanvas.width) / l,
            (b1[1] * imagesCanvas.height) / b,
          ];
          nb2 = [
            (b2[0] * imagesCanvas.width) / l,
            (b2[1] * imagesCanvas.height) / b,
          ];
          nb3 = [
            (b3[0] * imagesCanvas.width) / l,
            (b3[1] * imagesCanvas.height) / b,
          ];
          nb4 = [
            (b4[0] * imagesCanvas.width) / l,
            (b4[1] * imagesCanvas.height) / b,
          ];
          //   imagesCtx.fillStyle = "black";
          //   pointerCtx?.beginPath();
          //   pointerCtx?.arc(nb1[0], nb1[1], newRad, 0, Math.PI * 2, true);
          //   pointerCtx.fill();
          //   pointerCtx?.beginPath();
          //   pointerCtx?.arc(nb2[0], nb2[1], newRad, 0, Math.PI * 2, true);
          //   pointerCtx.fill();
          //   pointerCtx?.beginPath();
          //   pointerCtx?.arc(nb3[0], nb3[1], newRad, 0, Math.PI * 2, true);
          //   pointerCtx.fill();
          //   pointerCtx?.beginPath();
          //   pointerCtx?.arc(nb4[0], nb4[1], newRad, 0, Math.PI * 2, true);
          //   pointerCtx.fill();

          // Play the video inside the gba screen (draw the video frame by frame)
          const drawVideo = () => {
            if (videoCtx && !allAssetsLoaded) {
              videoCtx.fillStyle = "#A8C281";
              videoCtx.fillRect(
                videoX,
                videoY,
                videoCanvas.width * D,
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

        const pokemons = await fetchPokemonData();
        console.log("Pokemon are", pokemons);
        await Promise.all(
          pokemons.map(async (pokemon) => {
            if (pokemon) {
              // Ensure Pokémon height is within bounds
              pokemon.PokiHeight = Math.max(
                10,
                Math.min(pokemon.PokiHeight, 20),
              );

              const img = new Image();
              img.src = pokemon.PokiSprite;

              // Wait for the image to load
              await new Promise((resolve, reject) => {
                img.onload = () => resolve(null);
                img.onerror = () =>
                  reject(`Failed to load image: ${pokemon.PokiSprite}`);
              });

              pokemonData.push({ ...pokemon, img });
              sum += pokemon.PokiHeight;
            }
          }),
        );

        // Once all Pokémon images have loaded, prepare to draw them
        const estimatedSide = Math.sqrt(sum / E);
        pokemonData.sort((a, b) => b.PokiHeight - a.PokiHeight);

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
          x += (pokemonData[i].PokiHeight * getRandomInt(7, 10)) / 10;

          if (x > estimatedSide * 2) {
            x = 0;
            y += max * 0.6;
            max = pokemonData[i].PokiHeight;
          }

          coords.push(temp);
        }
        scaleFactor = side / maxY;
        pushFactor =
          (F * imagesCanvas.width -
            (maxX * scaleFactor + B * imagesCanvas.width)) /
          2;
        // Draw Pokémon images on the images canvas
        const drawPokemonImages = () => {
          if (imagesCtx) {
            for (let i = 0; i < pokemonData.length; i++) {
              imagesCtx.drawImage(
                pokemonData[i].img,
                coords[i].xs * scaleFactor +
                  B * imagesCanvas.width +
                  pushFactor,
                coords[i].ys * scaleFactor + imagesCanvas.height * C,
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
  const runChecks = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const rect = pointerCanvas.getBoundingClientRect();

    // Adjust the click coordinates relative to the canvas scale
    const x = ((e.clientX - rect.left) / rect.width) * pointerCanvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * pointerCanvas.height;

    if (clicked(x, y, nb1, newRad)) {
      prevClick();
    } else if (clicked(x, y, nb2, newRad)) {
      nextClick();
    } else if (clicked(x, y, nb3, newRad)) {
      nextMode();
    } else if (clicked(x, y, nb4, newRad)) {
      prevMode();
    }
  };
  // Assuming you are using React's useEffect for side effects

  useEffect(() => {
    updateScene(pokeIndex);
  }, [pokeIndex]);

  function nextClick() {
    setPokeIndex((prevPokeIndex) => {
      const newIndex =
        prevPokeIndex !== pokemonData.length - 1 ? prevPokeIndex + 1 : 0;
      return newIndex;
    });
  }

  function prevClick() {
    setPokeIndex((prevPokeIndex) => {
      const newIndex =
        prevPokeIndex !== 0 ? prevPokeIndex - 1 : pokemonData.length - 1;
      return newIndex;
    });
  }

  // Other parts of the code remain the same

  function updateScene(mod: number) {
    if (mode === 0) standOut();
    else if (mode === 1) standOutpp();
    else normal();
  }
  function prevMode() {
    setMode((prevMode) => {
      const newMode = prevMode !== -1 ? prevMode - 1 : 1;
      changeMode(newMode);
      return newMode;
    });
  }

  function nextMode() {
    setMode((prevMode) => {
      const newMode = prevMode !== 1 ? prevMode + 1 : -1;
      changeMode(newMode);
      return newMode;
    });
  }

  function changeMode(mod: number) {
    console.log("The mode is ", mod);
    switch (mod) {
      case 0:
        standOut();
        break;
      case -1:
        normal();
        break;
      case 1:
        standOutpp();
    }
  }
  function standOutpp() {
    // Load the custom GBA font
    pointerCtx.font = "14px gba"; // Setting the custom font

    // Set a classic Pokémon color palette
    pointerCtx.fillStyle = "#A8C281"; // Background box color (greenish tone)
    pointerCtx.fillRect(
      B * pointerCanvas.width, // X-position
      pointerCanvas.height * C, // Y-position
      pointerCanvas.width * D, // Width of box
      pointerCanvas.height * A, // Height of box
    );

    // Set stroke and text colors for more contrast
    pointerCtx.strokeStyle = "black"; // Outline color
    pointerCtx.fillStyle = "#FFFFFF"; // Text color (white for high contrast)

    // Drawing text (center-aligned for better look)
    const textX = pointerCanvas.width * (B + 0.02); // X-position for text
    const textYStart = pointerCanvas.height * (C + 0.05); // Y-start for the name
    const lineSpacing = 20; // Spacing between lines of text

    // Display the name "Peter" and roll number in the center of the box
    pointerCtx.fillText(
      "Name: Peter", // Example name
      textX,
      textYStart,
    );
    pointerCtx.fillText(
      "Roll Number: Peter 123", // Example roll number
      textX,
      textYStart + lineSpacing,
    );

    // Drawing the Pokémon image (centered in the box)
    const pokeImageX =
      pointerCanvas.width * (B + 0.5) - pointerCanvas.width * D * 0.1; // Center X-position for image
    const pokeImageY = pointerCanvas.height * (C + 0.15); // Y-position for image
    const pokeImageWidth = pointerCanvas.width * D * 0.2; // Width of image
    const pokeImageHeight = pointerCanvas.height * A * 0.5; // Height of image

    pointerCtx.drawImage(
      pokemonData[pokeIndex].img,
      pokeImageX,
      pokeImageY,
      pokeImageWidth,
      pokeImageHeight,
    );

    // Adding more text for Pokémon's name, ID, and height (below the image)
    pointerCtx.fillStyle = "#F8E030"; // Use classic Pokémon yellow for name and details
    pointerCtx.fillText(
      "Pokémon: " + pokemonData[pokeIndex].Pokiname,
      textX,
      pokeImageY + pokeImageHeight + lineSpacing, // Below the image
    );
    // pointerCtx.fillText(
    //  "ID: " + pokemonData[pokeIndex], // Example PokeID
    //  textX,
    //  pokeImageY + pokeImageHeight + 2 * lineSpacing, // Next line below the name
    //);
    pointerCtx.fillText(
      "Height: " + pokemonData[pokeIndex].PokiHeight + "m", // Example height
      textX,
      pokeImageY + pokeImageHeight + 3 * lineSpacing, // Next line below the ID
    );
  }

  function normal() {
    pointerCtx.fillStyle = "#A8C281";
    pointerCtx.fillRect(
      B * pointerCanvas.width,
      pointerCanvas.height * C,
      pointerCanvas.width * D,
      pointerCanvas.height * A,
    );
    for (let i = 0; i < pokemonData.length; i++) {
      pointerCtx.drawImage(
        pokemonData[i].img,
        coords[i].xs * scaleFactor + B * pointerCanvas.width + pushFactor,
        coords[i].ys * scaleFactor + pointerCanvas.height * C,
        pokemonData[i].PokiHeight * scaleFactor,
        pokemonData[i].PokiHeight * scaleFactor,
      );
    }
  }
  function clicked(
    x: number,
    y: number,
    buttonCoords: number[],
    rad: number,
  ): boolean {
    const distance = (x - buttonCoords[0]) ** 2 + (y - buttonCoords[1]) ** 2;
    if (distance <= rad ** 2) return true;
    return false;
  }
  function standOut() {
    console.log("Here");
    pointerCtx.fillStyle = "#A8C281";
    pointerCtx.fillRect(
      B * pointerCanvas.width,
      pointerCanvas.height * C,
      pointerCanvas.width * D,
      pointerCanvas.height * A,
    );
    pointerCtx.globalAlpha = 0.5;
    for (let i = 0; i < pokemonData.length; i++) {
      if (i != pokeIndex)
        pointerCtx.drawImage(
          pokemonData[i].img,
          coords[i].xs * scaleFactor + B * pointerCanvas.width + pushFactor,
          coords[i].ys * scaleFactor + pointerCanvas.height * C,
          pokemonData[i].PokiHeight * scaleFactor,
          pokemonData[i].PokiHeight * scaleFactor,
        );
    }
    pointerCtx.globalAlpha = 1;
    if (pokeIndex > pokemonData.length / 2) {
      pointerCtx.drawImage(
        pokemonData[pokeIndex].img,
        coords[pokeIndex].xs * scaleFactor +
          B * pointerCanvas.width +
          pushFactor,
        coords[pokeIndex].ys * scaleFactor +
          pointerCanvas.height * C -
          pokemonData[pokeIndex].PokiHeight * scaleFactor,
        pokemonData[pokeIndex].PokiHeight * scaleFactor * 2,
        pokemonData[pokeIndex].PokiHeight * scaleFactor * 2,
      );
    } else
      pointerCtx.drawImage(
        pokemonData[pokeIndex].img,
        coords[pokeIndex].xs * scaleFactor +
          B * pointerCanvas.width +
          pushFactor,
        coords[pokeIndex].ys * scaleFactor + pointerCanvas.height * C,
        pokemonData[pokeIndex].PokiHeight * scaleFactor * 1.5,
        pokemonData[pokeIndex].PokiHeight * scaleFactor * 1.5,
      );
  }
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
      <canvas
        ref={pointerCanvasRef}
        onClick={runChecks}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 5, // This keeps the image canvas at the back
        }}
      ></canvas>
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
          src="https://www.kapwing.com/videos/66e6c86940753aff5b18b834"
          style={{ display: "none" }}
          preload="auto"
          muted
        />
      )}
    </div>
  );
};

export default Canvas;
