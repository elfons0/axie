import React, { Component } from "react";


export default class Summon extends Component {
  render() {
    const { image, type, name, description } = this.props;

    return (
      <div className="summon-div">
        <img src={require('../img/summons/' + image)} alt={name} className="summon" />
        <div className={type}>{name}</div>
        <div className="summon-description">{description}</div>
      </div>
    );
  }
}
