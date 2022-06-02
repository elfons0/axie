import React, { Component } from "react";

import { replaceEffect } from "./Effect";


export default class Summon extends Component {
  render() {
    const { image, type, name, description } = this.props;

    let htmlDescription = replaceEffect(description, "{", "}");

    return (
      <div className="summon-div">
        <img src={require('../img/summons/' + image)} alt={name} className="summon" />
        <div className={type}>{name}</div>
        {htmlDescription}
      </div>
    );
  }
}
