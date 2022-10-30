import React, { Component } from "react";

import runeCard from "../img/runes/sample_rune.png";

import runes from "../data/runes.json";

export const findRune = (name) => {
  return runes.find((rune) => rune.name.includes(name));
};

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
