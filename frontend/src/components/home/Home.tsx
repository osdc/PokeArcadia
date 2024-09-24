import background from "../../../public/background.jpg";
import p1 from "../../../public/p1.png";
import p4 from "../../../public/p4.png";
import p2 from "../../../public/p2.png";
import p8 from "../../../public/p8.png";
import p6 from "../../../public/p6.png";
import p3 from "../../../public/p3.png";
import p5 from "../../../public/p5.png";
import p7 from "../../../public/p7.png";
import p9 from "../../../public/p9.png";
import AudioControl from "../Audio/AudioPlayer";

//const pokemonImages: string[] = [p1, p2, p3, p4, p5, p6, p7, p8];

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center relative overflow-hidden"
      style={{ backgroundImage: `url(${background})` }}
    >
      <img src={p9} className="-z-0 absolute top-10 left-64" />
      <p className="text-white gba text-xl mt-5">OSDC Presents</p>
      <p className="z-10 text-white gba text-7xl m-2">PokeArcadia</p>
      <p className="text-white gba text-2xl mt-4">Press To Start</p>
      <div className="flex item-center relative right-2">
        <img src={p4} className="w-1/3" />
        <a href="/HallOFame">
          <img src={p7} />
        </a>
        <img src={p1} className="w-1/3 " />
      </div>
      <a
        href="/Tutorial"
        className="text-white gba text-xl animate-bounce relative "
      >
        How to contribute
      </a>
      <AudioControl />
      <img src={p2} className="sm:hidden absolute bottom-4 left-40" />
      <img src={p8} className="sm:hidden absolute bottom-8 right-40" />
      <img src={p6} className="absolute bottom-0.5 left-96" />
      <img src={p3} className="absolute bottom-0 right-96" />
      <img src={p5} className="z-1 absolute bottom-8" />
    </div>
  );
};

export default Home;
