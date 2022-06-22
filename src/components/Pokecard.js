import React, { useEffect, useState } from "react";
import axios from "axios";
import CardInfoModal from "./CardInfoModal";
import "./Pokecard.css";

const POKE_IMAGE = process.env.REACT_APP_POKE_API_IMAGE_COMPRESSED;

function Pokecard({ name, url, number }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [pokeInfo, setPokeInfo] = useState({});
  const [typeShown, setTypeShown] = useState("");
  const [typeHidden, setTypeHidden] = useState("");
  var imgSrc = `${POKE_IMAGE}${number}.png`;

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const getInfo = async () => {
      await axios.get(url).then((response) => {
        //console.log(response.data);
        setPokeInfo(response.data);
        setTypeShown(response.data.types[0].type.name.toUpperCase());
        setTypeHidden(response.data.types[1]?.type?.name.toUpperCase());
      });
    };
    getInfo();
  }, [url]);

  return (
    <div>
      <div className="Pokecard">
        <div className="Pokecard__front">
          <h1 className="Pokecard__front__title">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h1>
          <img src={imgSrc} alt={name} className="Pokecard__front__image" />
          <h2 className="Pokecard__front__number">#{number}</h2>
        </div>
        <div className="Pokecard__back">
          <div className="Pokecard__back_information">
            <p>
              Name: <b>{pokeInfo.name}</b>
            </p>
            <p>
              Height: <b>{pokeInfo.height}</b>
            </p>
            <p>
              Weigth: <b>{pokeInfo.weight}</b>
            </p>
            <p>
              Experience: <b>{pokeInfo.base_experience}</b>
            </p>
            <div className="Pokecard__back__information__type">
              <span className="Pokecard__back__information__type__left">
                {typeShown}
              </span>
              <span className="Pokecard__back__information__type__right">
                {typeHidden}
              </span>
            </div>
          </div>
          <div
            className="Pokecard__back__infobutton"
            onClick={() => {
              openModal();
            }}
          >
            More Info...
          </div>
        </div>
      </div>
      {modalOpen && (
        <CardInfoModal url={url} modalClose={closeModal} pokeInfo={pokeInfo} />
      )}
    </div>
  );
}

export default Pokecard;
