import React, { Component } from "react";

import runeCard from "../img/runes/rune.png";

export default class Rune extends Component {
  render() {
    const { id, name, description } = this.props;

    return (
      <div className="rune-div">
        <img src={runeCard} alt="" className="runeCard" />
        <img src={require('../img/runes/' + id + '.png')} alt={name} className="rune" />
        <div className="rune-title">{name}</div>
        <div className="rune-description">{description}</div>        
      </div>
    );
  }
}
