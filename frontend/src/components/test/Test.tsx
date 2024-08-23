import axios from 'axios';
import { useState, useEffect } from 'react';

const Test = () => {
  const [userPokemons, setUserPokemons] = useState([]);

  useEffect(() => {
    console.log("Inside useEffect");
    axios.get('http://localhost:3000/') // Adjust the URL if needed
      .then(response => {
        const res = response.data; 
        console.log("res is: ", res.userPokemons);
        setUserPokemons(res.userPokemons);
      })
      .catch(error => {
        console.error('There was an error fetching the response:', error);
      });
  }, []);

  return (
    <>
      <div>
        <h1>Pokémon Images</h1>
        <div className="flex flex-wrap">
          {userPokemons.map((userPokemon: any, index: number) => (
            <div key={index} className="m-2 relative group">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${userPokemon.number}.png`}
                alt={`Pokémon ${userPokemon.number}`}
                className="w-36 h-36"
              />
              <div className="absolute bottom-0 left-0 bg-gray-700 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {userPokemon.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Test;
