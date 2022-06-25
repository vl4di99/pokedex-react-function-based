import React from "react";
import "./Moves.css";

function Moves(props) {
  return <div className="Moves">{props.move.name}</div>;
}

export default Moves;
