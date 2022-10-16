import React, { Component } from "react";
import { AxieMixer } from '@axieinfinity/mixer'
import { findCard } from "./Card";

import eyesLogo from '../img/parts/part_eyes.png';
import earsLogo from '../img/parts/part_ears.png';
import backLogo from '../img/parts/part_back.png';
import mouthLogo from '../img/parts/part_mouth.png';
import hornLogo from '../img/parts/part_horn.png';
import tailLogo from '../img/parts/part_tail.png';
import { getPotentialMap } from "./Axie";

export default class WalletAxie extends Component {
  render() {
    const { id , name, type, genes } = this.props;

    const imgUrl = 'https://axiecdn.axieinfinity.com/axies/' + id + '/axie/axie-full-transparent.png'
    const marketUrl = 'https://app.axieinfinity.com/marketplace/axies/';
  
    const mixer = new AxieMixer(genes);
    const parts = mixer.getAssets().adultCombo;

    const ears = parts.get('ears').replace('-','-ears-');
    const eyes = parts.get('eyes').replace('-','-eyes-');
    const horn = parts.get('horn').replace('-','-horn-');
    const mouth = parts.get('mouth').replace('-','-mouth-');
    const back = parts.get('back').replace('-','-back-');
    const tail = parts.get('tail').replace('-','-tail-');

    const earsCard = findCard(ears);
    const eyesCard = findCard(eyes);
    const hornCard = findCard(horn);
    const mouthCard = findCard(mouth);
    const backCard = findCard(back);
    const tailCard = findCard(tail);

    const marketSearch = marketUrl +
      '?class=' + type +
      '&part=' + eyesCard.partId +
      '&part=' + earsCard.partId +
      '&part=' + hornCard.partId +
      '&part=' + mouthCard.partId +
      '&part=' + backCard.partId +
      '&part=' + tailCard.partId +
      '&auctionTypes=Sale';
 

    let potential = [];
    potential[0] = type.toLowerCase();
    potential[1] = ears.split('-')[0];
    potential[2] = eyes.split('-')[0];
    potential[3] = horn.split('-')[0];
    potential[4] = mouth.split('-')[0];
    potential[5] = back.split('-')[0];
    potential[6] = tail.split('-')[0];

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
          <li><img src={eyesLogo} alt="eyes" className={eyesCard.type}/> {eyesCard.cardName}</li>
          <li><img src={earsLogo} alt="eyes" className={earsCard.type}/> {earsCard.cardName}</li>
          <li><img src={mouthLogo} alt="eyes" className={mouthCard.type}/> {mouthCard.cardName}</li>
          <li><img src={backLogo} alt="eyes" className={backCard.type}/> {backCard.cardName}</li>
          <li><img src={hornLogo} alt="eyes" className={hornCard.type}/> {hornCard.cardName}</li>
          <li><img src={tailLogo} alt="eyes" className={tailCard.type}/> {tailCard.cardName}</li>
        </ul>

        <a className="axieLink" href={marketUrl + id} target="_blank" rel="noreferrer">Marketplace</a>
        <a className="axieLink fondolupa" href={marketSearch} target="_blank" rel="noreferrer">Search</a>
      </div>
    );
  }
}
