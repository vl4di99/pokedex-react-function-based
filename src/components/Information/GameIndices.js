import React from "react";
import "./GameIndices.css";

function GameIndices(props) {
  return (
    <div className="GameIndices">
      <div>Index: {props.game_index}</div>
      <div>Version: {props.version}</div>
    </div>
  );
}

export default GameIndices;
