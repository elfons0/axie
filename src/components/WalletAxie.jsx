import React, { Component } from "react";
import { AxieMixer } from '@axieinfinity/mixer'
import { findCard } from "./Card";

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
 
    return (
      <div className="wallet-axie">
        
        <img src={require('../img/icons/' + type + '.png')} alt={type} className="axieIcon" />
        <span className="axieid">#{id}</span>
        <img src={imgUrl} alt={id} className="axieImage" />
        <span className="axieName">{name}</span>
        <ul className="axieParts">
          <li>{eyesCard.cardName}</li>
          <li>{earsCard.cardName}</li>
          <li>{mouthCard.cardName}</li>
          <li>{backCard.cardName}</li>
          <li>{hornCard.cardName}</li>
          <li>{tailCard.cardName}</li>
        </ul>
        <a className="axieLink" href={marketUrl + id} target="_blank" rel="noreferrer">Marketplace</a>
        <a className="axieLink fondolupa" href={marketSearch} target="_blank" rel="noreferrer">Search</a>
      </div>
    );
  }
}
