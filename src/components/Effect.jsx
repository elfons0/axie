import React, { Component } from "react";


export default class Effect extends Component {
  render() {
    const { image, type, name, description } = this.props;

    const runeType = "effect-title effect-" + type;

    return (
      <div className="effect-div">
        <img src={require('../img/icons/' + image)} alt={name} className="effect" />
        <div className={runeType}>{name}</div>
        <div className="effect-description">{description}</div>
      </div>
    );
  }
}
