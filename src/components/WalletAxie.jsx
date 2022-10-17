import React, { Component } from "react";

import eyesLogo from '../img/parts/part_eyes.png';
import earsLogo from '../img/parts/part_ears.png';
import backLogo from '../img/parts/part_back.png';
import mouthLogo from '../img/parts/part_mouth.png';
import hornLogo from '../img/parts/part_horn.png';
import tailLogo from '../img/parts/part_tail.png';
import { getPotentialMap } from "./Axie";

import wethLogo from '../img/tokens/weth.png';

export default class WalletAxie extends Component {
  render() {
    const { id , name, type, breedCount, auction, parts } = this.props;

    const marketUrl = 'https://app.axieinfinity.com/marketplace/axies/';
    const imgUrl = 'https://axiecdn.axieinfinity.com/axies/' + id + '/axie/axie-full-transparent.png'
    
    let potential = [type.toLowerCase()];
    let marketSearch = marketUrl + '?auctionTypes=Sale&class=' + type;
    
    parts.forEach(element => {
      marketSearch += '&part=' + element.id;
      potential.push(element['class'].toLowerCase());
    });

    const potentialMap = getPotentialMap(potential);

    return (
      <div className="wallet-axie">
        
        <img src={require('../img/icons/' + type + '.png')} alt={type} className="axieIcon" />
        <span className="axieid">#{id}</span>
        <img src={imgUrl} alt={id} className="axieImage" />
        <span className="axieName">{name}</span>
       
        <div className="potential-block">
          {[...potentialMap.keys()].map((key) => {
            return (
              <span className="potential-points" key={key}>
                <img
                  src={require("../img/icons/" +
                  key.charAt(0).toUpperCase() +
                  key.substring(1) +
                  ".png")}
                  alt={key}
                  className="axie-class-icon"
                  />
                {potentialMap.get(key) + " "}
              </span>
            );
          })}
        </div>

        <ul className="axieParts">
          <li><img src={eyesLogo} alt="eyes" className={parts[0]['class']}/> {parts[0]['name']}</li>
          <li><img src={earsLogo} alt="ears" className={parts[1]['class']}/> {parts[1]['name']}</li>
          <li><img src={backLogo} alt="back" className={parts[2]['class']}/> {parts[2]['name']}</li>
          <li><img src={mouthLogo} alt="mouth" className={parts[3]['class']}/> {parts[3]['name']}</li>
          <li><img src={hornLogo} alt="horn" className={parts[4]['class']}/> {parts[4]['name']}</li>
          <li><img src={tailLogo} alt="tail" className={parts[5]['class']}/> {parts[5]['name']}</li>
        </ul>

        <div className="axieBreed">
          Breads: {breedCount}
        </div>

        <div className="axiePrice">
          {auction && 
            (<span>Price: {(parseFloat(auction.currentPrice) / Math.pow(10, 18))} </span>)
          }
        </div>

        <a className="axieLink" href={marketUrl + id} target="_blank" rel="noreferrer">Marketplace</a>
        <a className="axieLink fondolupa" href={marketSearch} target="_blank" rel="noreferrer">Search</a>
      </div>
    );
  }
}
