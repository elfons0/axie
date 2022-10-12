import React, { Component } from "react";

export default class WalletAxie extends Component {
  render() {
    const { id , name } = this.props;

    const imgUrl = 'https://axiecdn.axieinfinity.com/axies/' + id + '/axie/axie-full-transparent.png'

    return (
      <div className="wallet-axie">
        <img src={imgUrl} alt={id} className="axieImage" />
        <span>{name}</span>
      </div>
    );
  }
}
