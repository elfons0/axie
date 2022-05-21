import React, { Component } from "react";

export default class Card extends Component {
  render() {
    const { name, description, cardImage } = this.props;

    return (
      <div className="Card-div">
        <img src={cardImage} alt={name} className="card" />

        <div className="card-title">{name}</div>

        <div className="card-description">{description}</div>
      </div>
    );
  }
}
