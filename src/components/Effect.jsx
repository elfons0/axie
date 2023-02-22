import React, { Component } from "react";

import Tooltip from "react-tooltip-lite";

import effects from "../data/effects.json";


export const getEffect = (name) => {
  return effects.find((effect) => effect.name.includes(name)).description;
};

export const replaceEffect = (cardId, description, init, end) => {
  let plainText = [];
  let effectName = [];
  let tooltipText = [];

  let fulltext = description;
/*
  let index_ini = fulltext.indexOf(init);
  let index_fin, effect, effectText;
  while (index_ini >= 0) {
    index_fin = fulltext.indexOf(end);

    effect = fulltext.substring(index_ini + 1, index_fin);
    effectText = getEffect(effect);

    plainText.push(fulltext.substring(0, index_ini));
    effectName.push(effect);
    tooltipText.push(effectText);

    fulltext = fulltext.substring(index_fin + 1);
    index_ini = fulltext.indexOf(init);
  }
*/
  plainText.push(fulltext);

  let htmlOutput = [];

  for (let i = 0; i < tooltipText.length; i++) {
    htmlOutput.push(plainText[i]);
    htmlOutput.push(
      <Tooltip key={cardId+effectName[i]+i} className="tooltip" content={tooltipText[i]}>
        {effectName[i]}
      </Tooltip>
    );
  }

  htmlOutput.push(plainText[plainText.length - 1]);

  return <div className="card-description">{htmlOutput}</div>;
};


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
