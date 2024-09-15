import background from "../../../public/background.jpg";
import p1 from "../../../public/p1.png";
import p2 from "../../../public/p2.png";
import p3 from "../../../public/p3.png";
import p4 from "../../../public/p4.png";
import p5 from "../../../public/p5.png";
import p6 from "../../../public/p6.png";
import p7 from "../../../public/p7.png";
import p8 from "../../../public/p8.png";

const pokemonImages = [p1, p2, p3, p4, p5, p6, p7, p8];

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center relative overflow-hidden"
      style={{ backgroundImage: `url(${background})` }}
    >
      <p className="text-white gba text-xl mt-5">OSDC Presents</p>
      <p className="text-white gba text-7xl m-2">PokeArcadia</p>
      <p className="text-white gba text-2xl mt-4">Press To Start</p>
      <a href="/HallOFame">
        <img src={p7} />
      </a>
      <a href="/Tutorial" className="text-white gba text-xl">
        How to contribute
      </a>
    </div>
  );
};

export default Home;
