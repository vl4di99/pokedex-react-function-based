import React from "react";
import "./BaseExperience.css";

function BaseExperience(props) {
  return (
    <div className="BaseExperience">
      <div>{props.xp}</div>
    </div>
  );
}

export default BaseExperience;
