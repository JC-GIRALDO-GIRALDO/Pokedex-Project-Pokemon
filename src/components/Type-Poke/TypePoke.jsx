// TypePoke.jsx
import React, { useState, useEffect } from "react";
import TypeImages from "./TypeImages";
import PokemonList from "./PokemonList";

const TypePoke = () => {
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
