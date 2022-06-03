import React, { Component } from "react";
import { replaceEffect } from "./Effect";

import cards from "../data/origincards.json";

export const partsCards = (part) => {
  return cards.filter((card) => card.part.includes(part));
};

export const findCard = (cardId) => {
  return cards.find((card) => card.cardId.includes(cardId));
};

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
