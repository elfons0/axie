import React, { Component } from "react";
import axios from 'axios'
import Wallet from "./Wallet";
import WalletAxie from "./WalletAxie";

//import graphql from "../data/graphql.json";


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
    this.roninWalletInfo(ronin);
    this.tokenInfo();
  }

  axieSearch = () => {
    const { ronin } = this.state;
    localStorage.setItem('ronin', ronin);
    this.axiesInfo(ronin);
  }

  componentDidMount() {    
    const storedWallet = localStorage.getItem('wallet');
    const storedPrices = localStorage.getItem('prices');
    const storedAxies = localStorage.getItem('axies');

    this.setState({ 
      wallet: JSON.parse(storedWallet),
      prices: JSON.parse(storedPrices),
      axies: JSON.parse(storedAxies)
     });
  }

  roninWalletInfo = (ronin) => {
    axios('https://ronin.rest/ronin/wallet/' + ronin)
      .then((response) => {
        this.setState({ wallet: response.data });
        localStorage.setItem('wallet', JSON.stringify(response.data));
      });  
  }

  tokenInfo = () => {
    axios('https://ronin.rest/misc/prices')
      .then((response) => {
        this.setState({ prices: response.data });
        localStorage.setItem('prices', JSON.stringify(response.data));
      });    
  }

  axiesInfo = (ronin) => {    
    axios('https://ronin.rest/origin/game/listUserFighterOwned/' + ronin)
      .then((response) => {
        this.setState({ axies: response.data });        
        localStorage.setItem('axies', JSON.stringify(response.data));
      });
      
    /* 
    const params ={
      "operationName": "GetAxieBriefList",
      "variables": {
        "owner": ronin.replace('ronin:', '0x'),
        "sort": "IdAsc"
      },
      "query": graphql.GetAxieBriefList
    };

    axios.post('https://serveless-cors.vercel.app/api/cors?url=https://graphql-gateway.axieinfinity.com/graphql', params)
      .then((response) => {
        this.setState({ axies: response.data });
      });
    */
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
            Update Wallet info
          </button>
          <button className="reset-button" 
            onClick={this.axieSearch}>
            Update Axie info
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
        
        {axies && (
          <div className="flex-div">
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
        )}
      </div>
    );
  }
}
