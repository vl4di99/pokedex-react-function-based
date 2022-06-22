import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./CardInfoModal.css";
import PokeImages from "./PokeImages";
import no_image from "../assets/no_image.png";

import Abilities from "./Information/Abilities";
import BaseExperience from "./Information/BaseExperience";
import Forms from "./Information/Forms";
import GameIndices from "./Information/GameIndices";
import Height from "./Information/Height";
import HeldItems from "./Information/HeldItems";

function CardInfoModal(props) {
  const [pokeImagesMale, setPokeImagesMale] = useState([
    { name: "", url: "" },
    { name: "", url: "" },
    { name: "", url: "" },
    { name: "", url: "" },
    { name: "", url: "" },
    { name: "", url: "" },
  ]);

  const [pokeImagesFemale, setPokeImagesFemale] = useState([
    { name: "", url: "" },
    { name: "", url: "" },
    { name: "", url: "" },
    { name: "", url: "" },
    { name: "", url: "" },
    { name: "", url: "" },
  ]);
  const [pokeImageMaleDefault, setPokeImageMaleDefault] = useState("");
  const [pokeImageFemaleDefault, setPokeImageFemaleDefault] = useState("");

  const [name, setName] = useState("");
  const [information] = useState(props.pokeInfo);

  const getInfo = useCallback(() => {
    axios
      .get(props.url)
      .then((response) => {
        //console.log(response.data.sprites);
        setPokeImageMaleDefault(
          response.data.sprites?.other?.dream_world?.front_default
        );
        setPokeImageFemaleDefault(
          response.data.sprites?.other?.dream_world?.front_female
        );
        setPokeImagesMale([
          { name: "Back Shiny", url: response.data?.sprites?.back_default },
          { name: "Front", url: response.data?.sprites?.back_shiny },
          { name: "Front Shiny", url: response.data?.sprites?.front_default },
          {
            name: "Dream World Back",
            url: response.data?.sprites?.front_shiny,
          },
          {
            name: "Home Front",
            url: response.data?.sprites?.other?.home?.front_default,
          },
          {
            name: "Home Front Shiny",
            url: response.data?.sprites?.other?.home?.front_shiny,
          },
        ]);

        setPokeImagesFemale([
          { name: "Back", url: response.data?.sprites?.back_female },
          {
            name: "Back Shiny",
            url: response.data?.sprites?.back_shiny_female,
          },
          { name: "Front", url: response.data?.sprites?.front_female },
          {
            name: "Front Shiny",
            url: response.data?.sprites?.front_shiny_female,
          },
          {
            name: "Home Front",
            url: response.data?.sprites?.other?.home?.front_female,
          },
          {
            name: "Home Front Shiny",
            url: response.data?.sprites?.other?.home?.front_shiny_female,
          },
        ]);

        setName(response.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.url]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getInfo();
    console.log(information);
  }, [getInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="cardInfoModal">
      <div onClick={props.modalClose} className="cardInfoModal__Button">
        Close
      </div>
      <h1>{name}</h1>
      <div className="cardInfoModal__sprites">
        <figure className="cardInfoModal__sprites__figure">
          <img
            src={
              pokeImageMaleDefault == null
                ? pokeImageFemaleDefault
                : pokeImageMaleDefault
            }
            alt=""
            width="200px"
            height="200px"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = no_image;
              currentTarget.style = "width: 200px; height: 200px";
            }}
          />
          <figcaption align="center">
            <b>Dream World</b>
          </figcaption>
        </figure>

        <div className="cardInfoModal__sprites__male">
          <h2>Male:</h2>
          {pokeImagesMale.map((item, index) => (
            <PokeImages imageurl={item.url} name={item.name} key={index} />
          ))}
        </div>

        <div className="cardInfoModal__sprites__female">
          <h2>Female:</h2>
          {pokeImagesFemale.map((item, index) => (
            <PokeImages imageurl={item.url} imagename={item.name} key={index} />
          ))}
        </div>
      </div>
      <h2>Information about {name}</h2>
      <div className="cardInfoModal__Information">
        <div className="cardInfoModal__Information__Element">
          <h3>Abilities</h3>
          {information.abilities.map((item, index) => (
            <Abilities
              name={item.ability.name}
              hidden={item.is_hidden}
              slot={item.slot}
              key={index}
            />
          ))}
        </div>
        <div className="cardInfoModal__Information__Element">
          <h3>Base Experience</h3>
          <BaseExperience xp={information.base_experience} />
        </div>
        <div className="cardInfoModal__Information__Element">
          <h3>Forms</h3>
          {information.forms.map((item, index) => (
            <Forms name={item.name} url={item.url} key={index} />
          ))}
        </div>
        <div className="cardInfoModal__Information__ManyElements">
          <h3>Game Indices</h3>
          {information.game_indices.map((item, index) => (
            <GameIndices
              game_index={item.game_index}
              version={item.version.name}
              url={item.version.url}
              key={index}
            />
          ))}
        </div>
        <div className="cardInfoModal__Information__Element">
          <h3>Height</h3>
          <Height height={information.height} />
        </div>
        <div className="cardInfoModal__Information__ManyElements">
          <h3>Held Items</h3>
          {information.held_items.map((item, index) => (
            <HeldItems
              item={item.item}
              version={item.version_details}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardInfoModal;
