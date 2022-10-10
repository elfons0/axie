import React, { Component } from "react";
import Card from "./Card";

import cards from "../data/curses.json";

export default class CardExplorer extends Component {

  render() {

    return (
      <div className="curse-explorer">
        <h1> Curse Card Explorer </h1>
        <div>
          {cards.map(({ id, name, description }) => (
            <Card
              key={id}
              cardId={id}
              name={name}
              description={description}
            />
          ))}
        </div>
      </div>
    );
  }
}
