import React, { Component } from "react";
import { replaceEffect } from "./Effect";

import runeCard from "../img/runes/sample_rune.png";

import charms from "../data/charms.json";


export const findCharm = (name) => {
  return charms.find((charm) => charm.name.includes(name));
};

export default class Charm extends Component {
  render() {
    const {id, image, type, name, effect, rarity, potentialCost } = this.props;

    const runeRarity = "rune-title rune-" + rarity;

    const htmlDescription = replaceEffect(id, effect, "{", "}");

    return (
      <div className="rune-div">
        <img src={runeCard} alt="" className="runeCard" />
        <img src={require('../img/icons/' + type + '.png')} alt={type} className="charmicon" />
        <img src={image} alt={name} className="charm" />
        <div className={runeRarity}>{name}</div>
        <div className="charm-description" >
          {htmlDescription}
        </div>        
        <div className="potentialCost">{potentialCost}</div>
      </div>
    );
  }
}
