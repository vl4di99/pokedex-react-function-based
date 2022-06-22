import React from "react";
import "./HeldItems.css";

function HeldItems(props) {
  return (
    <div className="HeldItems">
      <div>Item Name: {props.item.name}</div>
      {props.version?.map((v, index) => (
        <div className="HeldItems__Items">
          <div>Version name: {v.version.name}</div>
          <div>Rarity: {v.rarity}</div>
        </div>
      ))}
    </div>
  );
}

export default HeldItems;
