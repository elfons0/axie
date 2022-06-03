import React, { Component } from "react";
import { replaceEffect } from "./Effect";


export default class Card extends Component {
  

  render() {
    const { cardId, name, description, cardImage } = this.props;

    let htmlDescription = replaceEffect(cardId, description, "{", "}");

    return (
      <div className="Card-div" key={name}>
        <img src={cardImage} alt={name} className="card" />

        <div className="card-title">{name}</div>

        {htmlDescription}
      </div>
    );
  }
}
