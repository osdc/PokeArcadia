import background from "../../../public/background.jpg";
import howtocontribute from "../../../public/howtocontribute.png";
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
      className="min-h-screen bg-cover bg-center flex justify-center items-center relative overflow-hidden"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Images scattered around */}
      <div className="flex flex-col items-center justify-center absolute inset-0 pointer-events-none">
        <div className="">
          <h1 className="text-white text-4xl font-earlyGameboy mb-4 gba">
            OSDC PRESENTS
          </h1>
          <h1 className="text-white text-6xl font-flippsRegular mb-4 gba">
            PokeArcadia
          </h1>
        </div>
        {pokemonImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Pokemon ${index + 1}`}
            className="w-24 h-24 m-2 opacity-75 transition-transform animate-pokemon"
            style={{
              position: "absolute",
              left: `${Math.random() * 90}vw`,
              top: `${Math.random() * 90}vh`,
              zIndex: 1,
            }}
          />
        ))}
      </div>
      {/* Centered text and image */}
      <div className="">
        <img className="mt-4" src={howtocontribute} alt="How to Contribute" />
      </div>
    </div>
  );
};

export default Home;
