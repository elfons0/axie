import React, { Component } from "react";
import { replaceEffect } from "./Effect";

import config from "../data/config.json";
import cards from "../data/origincards.json";

export const getCardImage = (cardId) => {
  return 'https://cdn.axieinfinity.com/game/origin-cards/base/origin-cards-' + config.cardVersion + '/' + cardId +'.png';
}

export const partsCards = (part) => {
  return cards.filter((card) => card.part.includes(part));
};

export const findCard = (cardId) => {
  return cards.find((card) => card.cardId.includes(cardId));
};

export const findCardByPart = (partId) => {
  return cards.find((card) => card.partId.includes(partId));
};

export default class Card extends Component {
  render() {
    const {partClass, partType, partValue, name, description} = this.props;

    const paddedPartValuue = partValue.toString().padStart(2,0);
    const cardId = `${partClass}-${partType}-${paddedPartValuue}-00`.toLocaleLowerCase();

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
