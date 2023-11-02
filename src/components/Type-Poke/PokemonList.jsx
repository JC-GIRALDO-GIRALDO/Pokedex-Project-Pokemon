// PokemonList.jsx
import React, { useState, useEffect } from "react";

const PokemonList = ({ selectedType, pokemonList, onBackClick }) => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (selectedPokemon) {
        try {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          const data = await response.json();
          setPokemonDetails(data);
        } catch (error) {
          console.error("There was a problem with the fetch operation:", error);
        }
      }
    };

    fetchPokemonDetails();
  }, [selectedPokemon]);

  const handlePokemonClick = (pokemonName) => {
    setSelectedPokemon(pokemonName);
  };

  const handleBackClick = () => {
    setSelectedPokemon(null);
    setPokemonDetails(null);
  };

  const showPokemonDetails = () => {
    if (pokemonDetails) {
      return (
        <div>
          <button onClick={handleBackClick}>Volver</button>
          <h2>Detalles de {pokemonDetails.name}</h2>
          <p>Altura: {pokemonDetails.height}</p>
          <p>Peso: {pokemonDetails.weight}</p>
          <h3>Habilidades:</h3>
          <ul>
            {pokemonDetails.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ul>
          <h3>Tipo:</h3>
          <ul>
            {pokemonDetails.types.map((type, index) => (
              <li key={index}>{type.type.name}</li>
            ))}
          </ul>
          <h3>Imagen:</h3>
          <img
            src={pokemonDetails.sprites.front_default}
            alt={pokemonDetails.name}
          />
          {/* Detalles sobre evoluciones y otra información */}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {selectedPokemon ? (
        showPokemonDetails()
      ) : (
        <div>
          <button onClick={onBackClick}>Volver</button>
          <h2>Pokémon de tipo {selectedType}:</h2>
          <div className="pokemon-list">
            {pokemonList.map((pokemon, index) => (
              <div
                key={index}
                onClick={() => handlePokemonClick(pokemon.pokemon.name)}
              >
                <p>{pokemon.pokemon.name}</p>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    pokemon.pokemon.url.split("/")[6]
                  }.png`}
                  alt={pokemon.pokemon.name}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
