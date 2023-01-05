import React from "react";
import "./card.css";
function Card(props) {
  return (
    <div className="card_main">
      <img className="card_img" src={props.data.imageUrl} />
      <div className="card_details">
        <div className="card_left">
          <p>Name</p>
          <p>Industry</p>
          <p>Funding </p>
          <p>Turnover</p>
        </div>
        <div className="card_right">
          <p>: {props.data.name}</p>
          <p>: {props.data.industry}</p>
          <p>: {props.data.funding}</p>
          <p>: {props.data.turnover}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
