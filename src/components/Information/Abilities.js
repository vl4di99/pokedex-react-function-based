import React from "react";
import "./Abilities.css";

function Abilities(props) {
  return (
    <div className="Abilities">
      <div>Ability name: {props.name}</div>
      <div>Ability type: {props.hidden === true ? "Hidden" : "Visible"}</div>
      <div>Slot: {props.slot}</div>
    </div>
  );
}

export default Abilities;
