import React, { Component } from "react";
import { replaceEffect } from "./Effect";

import cards from "../data/origincards.json";

export const getCardImage = (cardId) => {
  const version = '20220928';
  return 'https://cdn.axieinfinity.com/game/origin-cards/base/origin-cards-' + version + '/' + cardId +'.png';
}

export const partsCards = (part) => {
  return cards.filter((card) => card.part.includes(part));
};

export const findCard = (cardId) => {
  return cards.find((card) => card.cardId.includes(cardId));
};

export default class Card extends Component {
  render() {
    const { cardId, name, description } = this.props;

    const htmlDescription = replaceEffect(cardId, description, "{", "}");

    return (
      <div className="Card-div" key={name}>
        <img src={getCardImage(cardId)} alt={name} className="card" />

        <div className="card-title">{name}</div>

        {htmlDescription}
      </div>
    );
  }
}
