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
          {/* Aquí podrías agregar detalles sobre evoluciones e información adicional */}
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
    setShowPokemonList(false); // Ocultar la lista al cambiar de tipo
  };

  const handleBackClick = () => {
    setSelectedType(""); // Reiniciar la selección del tipo
    setPokemonList([]); // Limpiar la lista de Pokémon
    setShowPokemonList(false); // Ocultar la lista al volver atrás
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

export default TypePoke;
