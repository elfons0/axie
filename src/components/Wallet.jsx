import React, { Component } from "react";
import WalletAxie from "./WalletAxie";

export default class Wallet extends Component {
  render() {
    const { ron, axs, slp, weth, prices, axies } = this.props;

    const ronPrice = parseFloat(prices['ronin'].usd);
    const wethPrice = parseFloat(prices['ethereum'].usd);
    const axsPrice = parseFloat(prices['axie-infinity'].usd);
    const slpPrice = parseFloat(prices['smooth-love-potion'].usd);
 

    return (
      <div>
        <div className="wallet-div">
          <label>SLP</label> <span>{slp} ({(slp * slpPrice).toFixed(2)} USD)</span>
          <label>AXS</label> <span>{axs} ({(axs * axsPrice).toFixed(2)} USD)</span>
          <label>RON</label> <span>{ron} ({(ron * ronPrice).toFixed(2)} USD)</span>
          <label>WETH</label> <span>{weth} ({(weth * wethPrice).toFixed(2)} USD)</span>
        </div>
        <div className="axies-div">
        {axies['_items'].map(({ id, name, class : type, genes }) => (
          <WalletAxie
            key={id}
            id={id}
            name={name}
            type={type}
            genes={genes}
          />       
          ))}
        </div>
    </div>
    );
  }
}
