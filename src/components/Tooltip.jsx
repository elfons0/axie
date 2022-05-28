import React, { Component } from "react";
import ReactTooltip from "react-tooltip";

import effects from "../data/effects.json";

export default class Tooltip extends Component {
    
  isEffect = (text, effect) => {
    return effect.name === text;
  };

  getEffect = (text) => {
    return effects.find(({ name }) => name === text);
  };

  render() {
    const { id, text } = this.props;

    const effect = this.getEffect(text);

    return (
      <div>
        <span data-tip data-for={id} onMouseOut={console.log('hide')} >
          {text}
        </span>
        <ReactTooltip id={id}  effect="solid">
          <div className="effect-popup">
            <div className="effect-popup-title">{effect.name}</div>
            <div className="effect-popup-description">{effect.description}</div>
          </div>
        </ReactTooltip>
      </div>
    );
  }
}
