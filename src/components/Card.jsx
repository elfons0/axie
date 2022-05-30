import React, { Component } from "react";

import Tooltip from "react-tooltip-lite";

import effects from "../data/effects.json";

export default class Card extends Component {
  getEffect = (name) => {
    return effects.find((effect) => effect.name.includes(name)).description;
  };

  replaceEffect = (description, init, end) => {
    let plainText = [];
    let effectName = [];
    let tooltipText = [];

    let fulltext = description;

    let index_ini = fulltext.indexOf(init);
    let index_fin, effect, effectText;
    while (index_ini >= 0) {
      index_fin = fulltext.indexOf(end);

      effect = fulltext.substring(index_ini + 1, index_fin);
      effectText = this.getEffect(effect);

      plainText.push(fulltext.substring(0, index_ini));
      effectName.push(effect);
      tooltipText.push(effectText);

      fulltext = fulltext.substring(index_fin + 1);
      index_ini = fulltext.indexOf(init);
    }

    plainText.push(fulltext);

    let htmlOutput = [];

    for (let i = 0; i < tooltipText.length; i++) {
      htmlOutput.push(plainText[i]);
      htmlOutput.push(
        <Tooltip className="tooltip" content={tooltipText[i]}>
          {effectName[i]}
        </Tooltip>
      );
    }

    htmlOutput.push(plainText[plainText.length - 1]);

    return <div className="card-description">{htmlOutput}</div>;
  };

  render() {
    const { name, description, cardImage } = this.props;

    let htmlDescription = this.replaceEffect(description, "{", "}");

    return (
      <div className="Card-div">
        <img src={cardImage} alt={name} className="card" />

        <div className="card-title">{name}</div>

        {htmlDescription}
      </div>
    );
  }
}
