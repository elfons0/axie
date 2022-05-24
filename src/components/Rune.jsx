import React, { Component } from "react";

import runeCard from "../img/runes/rune.png";

export default class Rune extends Component {
  render() {
    const { image, type, name, description, rarity } = this.props;

    const runeRarity = "rune-title rune-" + rarity;

    return (
      <div className="rune-div">
        <img src={runeCard} alt="" className="runeCard" />
        <img src={require('../img/runes/' + image)} alt={name} className="rune" />
        <img src={require('../img/icons/' + type + '.png')} alt={type} className="runeicon" />
        <div className={runeRarity}>{name}</div>
        <div className="rune-description">{description}</div>
      </div>
    );
  }
}
