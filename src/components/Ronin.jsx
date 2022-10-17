import React, { Component } from "react";
import axios from 'axios'
import Wallet from "./Wallet";

import graphql from "../data/graphql.json";


export default class Ronin extends Component {
  state = {
    ronin: localStorage.getItem('ronin') || '',
    wallet: '' ,
    prices: '' ,
    axies: ''
  };

  handleChangeRonin = (event) => {
    const ronin = event.target.value;
    this.setState({ ronin });
  };

  roninSearch = () => {
    const { ronin } = this.state;
    localStorage.setItem('ronin', ronin);
    this.roninWalletInfo();
  }

  componentDidMount() {
    const { ronin } = this.state;
    if(ronin){
      this.roninWalletInfo();
    }
  }

  roninWalletInfo = () => {
    const { ronin } = this.state;

    axios('https://ronin.rest/ronin/wallet/' + ronin)
      .then((response) => {
        this.setState({ wallet: response.data });
      });
        
    axios('https://ronin.rest/misc/prices')
      .then((response) => {
        this.setState({ prices: response.data });
      });
    /*
    axios('https://ronin.rest/origin/game/listUserFighterOwned/' + ronin)
      .then((response) => {
        this.setState({ axies: response.data });
      });
      */
     
    const params ={
      "operationName": "GetAxieBriefList",
      "variables": {
        "owner": ronin.replace('ronin:', '0x'),
        "sort": "IdAsc"
      },
      "query": graphql.GetAxieBriefList
    };

    axios.post('https://graphql-gateway.axieinfinity.com/graphql', params)
      .then((response) => {
        this.setState({ axies: response.data });
      });
      
  }

  render() {
    const { ronin, wallet, prices, axies } = this.state;

    const slp = parseInt(wallet?.balances?.SLP?.balance);
    const axs = parseFloat(wallet?.balances?.AXS?.balance).toFixed(6);
    const ron = parseFloat(wallet?.balances?.RON?.balance).toFixed(6);
    const weth = parseFloat(wallet?.balances?.WETH?.balance).toFixed(6);

    return (
      <div className="ronin-explorer">
        <h1> Ronin Explorer </h1>
        <div className="filter">
          <div className="wideItem">
            <label htmlFor="ronin">Ronin address</label>
            <input className="textfield"
              type="text"
              value={ronin}
              placeholder="ronin:"
              onChange={this.handleChangeRonin}
              />
          </div>
          <button className="reset-button" 
            onClick={this.roninSearch}>
            Search
          </button>
        </div>
        {wallet && (
          <Wallet 
            slp={slp}
            axs={axs}
            ron={ron}
            weth={weth}
            prices={prices}
            axies={axies}
          />
        )}
      </div>
    );
  }
}
