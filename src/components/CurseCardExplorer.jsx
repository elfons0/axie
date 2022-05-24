import React, { Component } from "react";
import Card from "./Card";

import cards from "../data/curses.json";

export default class CardExplorer extends Component {

  render() {

    return (
      <div>
        <h1> Curse Card Explorer </h1>
        <div>
          {cards.map(({ id, name, description, cardImage }) => (
            <Card
              key={id}
              name={name}
              description={description}
              cardImage={cardImage}
            />
          ))}
        </div>
      </div>
    );
  }
}
