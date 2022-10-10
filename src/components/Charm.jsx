import React, { Component } from "react";
import { replaceEffect } from "./Effect";

import runeCard from "../img/runes/sample_rune.png";

import charms from "../data/charms.json";


export const findCharm = (name) => {
  return charms.find((charm) => charm.name.includes(name));
};

export default class Charm extends Component {
  render() {
    const { id, image, type, name, apply, effect, rarity, potentialCost } = this.props;

    const runeRarity = "rune-title rune-" + rarity;

    const htmlDescription = replaceEffect(id, effect, "{", "}");

    return (
      <div className="rune-div">
        <img src={runeCard} alt="" className="runeCard" />
        <img src={require('../img/charms/' + image)} alt={name} className="rune" />
        <img src={require('../img/icons/' + type + '.png')} alt={type} className="runeicon" />
        <div className={runeRarity}>{name}</div>
        <div className="rune-description" >
          {apply}<br/>
          {htmlDescription}
        </div>        
        <div className="potentialCost">{potentialCost}</div>
      </div>
    );
  }
}
