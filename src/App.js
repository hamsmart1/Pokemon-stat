import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // สร้าง state สำหรับเก็บข้อมูล Pokémon
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState(null);

  // ดึงข้อมูล Pokémon ทั้งหมด 151 ตัวจาก PokeAPI
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151')
      .then(response => response.json())
      .then(data => setPokemonList(data.results));
  }, []);

  // ฟังก์ชันสำหรับดึงข้อมูลรายละเอียดของ Pokémon
  const fetchPokemonDetails = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(data => setPokemonDetails(data));
  };

  return (
    <div className="App">
      <h1>API Pokemon</h1>
      <button onClick={() => setPokemonDetails(null)}>Get pokemon dex</button>

      <div className="pokemon-list">
        {pokemonList.map((pokemon, index) => (
          <div key={index} className="pokemon-item" onClick={() => fetchPokemonDetails(pokemon.url)}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
          </div>
        ))}
      </div>

      {pokemonDetails && (
        <div className="pokemon-details">
          <h2>Name: {pokemonDetails.name.toUpperCase()}</h2>
          <p>Type 1: {pokemonDetails.types[0].type.name}</p>
          <p>Type 2: {pokemonDetails.types[1] ? pokemonDetails.types[1].type.name : 'N/A'}</p>
          <h3>Base stats:</h3>
          <ul>
            <li>HP: {pokemonDetails.stats[0].base_stat}</li>
            <li>Attack: {pokemonDetails.stats[1].base_stat}</li>
            <li>Defense: {pokemonDetails.stats[2].base_stat}</li>
            <li>Special Attack: {pokemonDetails.stats[3].base_stat}</li>
            <li>Special Defense: {pokemonDetails.stats[4].base_stat}</li>
            <li>Speed: {pokemonDetails.stats[5].base_stat}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;