import axios from 'axios';
import { useState, useEffect } from 'react';

const Test = () => {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    console.log("Inside useEffect")
    axios.get('http://localhost:3000/') // Adjust the URL if needed
      .then(response => {
        setNumbers(response.data.numbers);
        console.log('response is: ', response.data.numbers);
      })
      .catch(error => {
        console.error('There was an error fetching the numbers:', error);
      });
  }, []);

  return (
    <div>
      <h1>Pokémon Images</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {numbers.map((number, index) => (
          <div key={index} style={{ margin: '10px' }}>
            <img 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`} 
              alt={`Pokémon ${number}`} 
              style={{ width: '150px', height: '150px' }}
            />
            <p>Pokémon {number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;
