// TypeImages.jsx
import React from "react";

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

export default TypeImages;
