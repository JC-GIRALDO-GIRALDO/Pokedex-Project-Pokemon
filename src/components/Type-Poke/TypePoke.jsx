import React, { useEffect, useState } from "react";

// Componente para mostrar tipos de Pokémon
const TypeImages = ({ types, onTypeClick }) => {
  return (
    <div className="type-images">
      {types.map((type, index) => (
        <div key={index} onClick={() => onTypeClick(type.name)}>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/${type.name}.png`}
            alt={type.name}
          />
        </div>
      ))}
    </div>
  );
};

// Componente para mostrar la lista de Pokémon
const PokemonList = ({ selectedType, pokemonList, onBackClick }) => {
  return (
    <div>
      <button onClick={onBackClick}>Volver</button>
      <h2>Pokémon de tipo {selectedType}:</h2>
      <div className="pokemon-list">
        {pokemonList.map((pokemon, index) => (
          <div key={index}>
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
  );
};

export const TypePoke = () => {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [pokemonList, setPokemonList] = useState([]);
  const [showPokemonList, setShowPokemonList] = useState(false);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/type/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((data) => {
        const typesData = data.results;
        setTypes(typesData);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedType) {
      fetch(`https://pokeapi.co/api/v2/type/${selectedType}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          return response.json();
        })
        .then((data) => {
          const pokemonData = data.pokemon;
          setPokemonList(pokemonData);
          setShowPokemonList(true);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
  }, [selectedType]);

  const handleTypeClick = (typeName) => {
    setSelectedType(typeName);
  };

  const handleBackClick = () => {
    setSelectedType("");
    setShowPokemonList(false);
  };

  return (
    <div>
      {showPokemonList ? (
        <PokemonList
          selectedType={selectedType}
          pokemonList={pokemonList}
          onBackClick={handleBackClick}
        />
      ) : (
        <div>
          <h1>Selecciona un tipo de Pokémon:</h1>
          <TypeImages types={types} onTypeClick={handleTypeClick} />
        </div>
      )}
    </div>
  );
};
