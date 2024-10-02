import { useState, useEffect } from 'react';

export default function App() {
  const [count, setCount] = useState(3);
  const [selectedPokemon, setSelectedPokemon] = useState({});

  useEffect(() => {

    fetch(`https://pokeapi.co/api/v2/pokemon/${count}`)
      .then(res => res.json())
      .then(json => {

        // Once we have the API data, update the selectedPokemon state
        const pokeName = json.name;
        const pokeImage = json.sprites.front_default;
        const pokeAbility = json.abilities[0].ability.name;
        const pokeType = json.types[0].type.name;

        setSelectedPokemon({
          name: pokeName,
          image: pokeImage,
          ability: pokeAbility,
          type: pokeType,
        });
      })

      .catch(error => console.error('Error fetching Pokemon:', error));

  }, [count]); // Whenever "count" changes, fetch new Pokemon data

  function handleClick() {
    // Update the count, triggering useEffect to fetch new data
    setCount(Math.floor(Math.random() * 500) + 1); 
  }

  const showPoke = (
    <div className="flex-vertical">
      <span>Pokemon: {selectedPokemon.name}</span>
      <img src={selectedPokemon.image} alt="" style={{ height: '120px', width: '120px' }} />
      <span>Ability: {selectedPokemon.ability}</span>
      <span>Type: {selectedPokemon.type}</span>
    </div>
  );

  return (
    <div className="flex-vertical">
      {selectedPokemon.name && showPoke}
      <button onClick={handleClick}>Random Pokemon</button>
    </div>
  );
}
