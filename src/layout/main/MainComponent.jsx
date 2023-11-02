import React from "react";
import TypePoke from "../../components/Type-Poke/TypePoke"; // Cambia la importación
import { HomeComponent } from "../home/HomeComponent";

export const MainComponent = () => {
  return (
    <div>
      <TypePoke />
      <HomeComponent />
    </div>
  );
};
