import React, { useEffect, useState } from "react";
import "./Pokedex.css";
import axios from "axios";
import Pokecard from "./Pokecard";

const offset_api = 0;
const limit_api = 2000;
const Pokemons_API = `${process.env.REACT_APP_POKE_API}pokemon?offset${offset_api}&limit=${limit_api}`;

function Pokedex() {
  const [Pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const getPokemonData = async () => {
      await axios.get(Pokemons_API).then((response) => {
        //console.log(response.data.results);
        setPokemons(response.data.results);
      });
    };
    getPokemonData();
  }, []);

  return (
    <div className="Pokedex">
      <div className="Pokedex__title">
        <h1 className="Pokedex__title__h1">Welcome to the new Pokedex!</h1>
      </div>
      <div className="Pokedex__cards">
        {Pokemons.map((poke, index) => (
          <Pokecard
            name={poke.name}
            url={poke.url}
            number={index + 1}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Pokedex;
