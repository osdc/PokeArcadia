import { useState, useRef } from "react";
import playIcon from "../../../public/playAudio.png"; // Adjust the path as needed
import muteIcon from "../../../public/muteAudio.png"; // Adjust the path as needed
import audioFile from "../../../public/PokeArcadiaBg.mp3"; // Adjust the path as needed

const AudioControl = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-4 right-6">
      <button
        onClick={toggleAudio}
        className="bg-transparent border-none p-0 m-0 rounded-full mt-4"
      >
        <img
          src={isPlaying ? playIcon : muteIcon}
          alt={isPlaying ? "play" : "mute"}
          className="w-12 h-12"
        />
      </button>
      <audio ref={audioRef} src={audioFile} loop />
    </div>
  );
};

export default AudioControl;
