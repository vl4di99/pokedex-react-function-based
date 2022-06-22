import React from "react";
import "./PokeImages.css";
import no_image from "../assets/no_image.png";

function PokeImages(props) {
  return (
    <div>
      <figure>
        <img
          src={props.imageurl == null ? no_image : props.imageurl}
          alt=""
          width="100px"
          height="100px"
        />
        <figcaption>{props.imagename}</figcaption>
      </figure>
    </div>
  );
}

export default PokeImages;
