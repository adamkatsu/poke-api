import { useState } from 'react'
import { useEffect } from 'react';


export default function App() {
  const [apiData, setApiData] = useState([])
  const [count, setCount] = useState(3);
  const [selectedPokemon, setSelectedPokemon] = useState({
    name: apiData,
  })
  
  
  useEffect(() => {
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${count}`)
    .then(res => res.json())
    .then(json => {
      setApiData(json)
      console.log(apiData)
    })  
    
  }, [count])
  
  // console.log(selectedPokemon)

  let pokeName, pokeImage, pokeAbility, pokeType;
  
  function handleClick(){
    setCount(Math.floor(Math.random() * 500) + 1)

    // console.log(apiData.species.name)
    pokeName = apiData.name;
    pokeImage = apiData.sprites.front_default;
    pokeAbility = apiData.abilities[0].ability.name;
    pokeType = apiData.types[0].type.name

    setSelectedPokemon({
      name: pokeName,
      image: pokeImage,
      ability: pokeAbility,
      type: pokeType,
    })
 
  }

  const showPoke = (
    <div className="flex-vertical">
      <span>Pokemon: {selectedPokemon.name}</span>
      <img src={selectedPokemon.image} alt="" style={{height: '120px', width: '120px' }}/>
      <span>Ability: {selectedPokemon.ability}</span>
      <span>Type: {selectedPokemon.type}</span>
    </div>
  )

  return (
    <div className="flex-vertical">
      {selectedPokemon !== '' && showPoke}
      <button onClick={handleClick}>Random Pokemon</button>
    </div>
  )
}

