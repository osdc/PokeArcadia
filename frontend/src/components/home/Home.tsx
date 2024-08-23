import { Link } from "react-router-dom";
import Canvas from "./Canvas";
const Home = () => {
  return (
    <div className="min-h-screen bg-cover bg-center bg-[url('https://i.pinimg.com/originals/2a/77/4d/2a774d34ddacf4a4b049721da7e1fe7f.gif')]">
        <h1 className="text-black font-bold text-3xl flex justify-center items-center">Welcome to Open Sorcerer Developers Community</h1>
      <button className="m-10 p-2 bg-blue-500 text-white rounded-lg">
        <Link to='/test'>Test</Link>
      </button>
    </div>
  );
}

export default Home;
