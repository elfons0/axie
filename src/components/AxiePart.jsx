import React, { Component, Fragment } from "react";
import Select from "react-select";
import Tooltip from "react-tooltip-lite";
import { findCard } from "./Card";
import { findCharm } from "./Charm";
import { findRune } from "./Rune";

import charms from "../data/charms.json";

export default class AxiePart extends Component {
  state = {
    noCharmOption: "",
  };

  getCharmImg = (name) => {
    return name ? charms.find((charm) => charm.name.includes(name)).image : "";
  };

  handleCardChange = (selectedCard) => {
    // const { handleCard, handleCharm } = this.props;
    //const { noCharmOption } = this.state;

    const { handleCard } = this.props;

    handleCard(selectedCard);

    //handleCharm(noCharmOption);
  };

  componentDidMount() {
    const { part } = this.props;

    this.setState({
      noCharmOption: new Option("(no charm)", "no-" + part + "-charm"),
    });
  }

  calculateNumbers = (type, card, charm, rune) => {
    const result = [];
    
    let totalAttack = 0;
    let totalDefense = 0;
    let totalHealing = 0;
        
    if(card){
      
      totalAttack =  card.defaultAttack;
      totalDefense = card.defaultDefense;
      totalHealing = card.healing;
      
      if (rune) {
        const classRunes = [11,12,13].includes(rune.id);

        totalAttack = (totalAttack + rune.attackBonus) * (classRunes &&  card.type.includes(type.value) ? rune.attackMultiplier : 1);
        totalDefense = (totalDefense + rune.defenseBonus) * (classRunes &&  card.type.includes(type.value)  ? rune.defenseMultiplier: 1);
        totalHealing = (totalHealing + rune.healingBonus) * (classRunes &&  card.type.includes(type.value) ? rune.healingMultiplier: 1);
      }

      if(charm){
        totalAttack += charm.attackBonus;
        totalDefense += charm.defenseBonus;
        totalHealing += charm.healingBonus;
      }

      // rounding
  
      totalAttack = ~~totalAttack;
      totalDefense = ~~totalDefense;
      totalHealing = ~~totalHealing;

      // special card behaviour

      if (card.tags.includes("reflect")){
        totalAttack = ' (' + ~~(totalDefense * 0.4)+ ')';
      }

      if (card.hits > 1){
        totalAttack = totalAttack ? totalAttack + ' (' + (totalAttack * card.hits) +  ')' : '';
        totalDefense = totalDefense ? totalDefense + ' (' + (totalDefense * card.hits) +  ')' : '';
        totalHealing = totalHealing ? totalHealing + ' (' + (totalHealing * card.hits) +  ')' : '';
      }

      if (card.attackBonus > 0){
        totalAttack += ' (' + ~~(totalAttack + card.attackBonus*(rune ? rune.attackMultiplier : 1))+ ')';
      }

      if (card.attackMultiplier > 1){
        totalAttack += ' (' + ~~(totalAttack * card.attackMultiplier)+ ')';
      }

      if (card.progress){
        const progress = card.progress.split("*");
        let progressAttack = totalAttack;
        let index = 0;
        while(index < progress[1]){
          index++;
          progressAttack += ' > ' + (totalAttack + progress[0]*index);
        }

        totalAttack = 
              <Tooltip className="team-tooltip" content={progressAttack}>
                {totalAttack} 
                .. 
                {totalAttack + progress[0]*index } 
              </Tooltip>
      }

      if (card.name.includes("Ronin")){
        let progressAttack = totalAttack;
        let baseAttack = totalAttack / 2;

        progressAttack += ' > ' + Math.round(totalAttack + baseAttack);
        progressAttack += ' > [' + (totalAttack + baseAttack*2) + ']';
        progressAttack += ' > ' + Math.round(totalAttack + baseAttack*3) + ' > ' + (totalAttack + baseAttack*4);
       
        totalAttack = 
              <Tooltip className="team-tooltip" content={progressAttack}>
                {totalAttack} 
                ..
                [{totalAttack + baseAttack*2}]
              </Tooltip>
      }
    }

    result.push(totalAttack || '');
    result.push(totalDefense || '');
    result.push(totalHealing || '');

    return result;
  }

  render() {
    const { part, options, selected, handleCharm, charmSelected, type, runeSelected } =
      this.props;

    const { noCharmOption } = this.state;

    const card = selected && findCard(selected.value);
    const charm = charmSelected && findCharm(charmSelected.label);
    const rune = runeSelected && findRune(runeSelected.label);

    const numbers = this.calculateNumbers(type, card, charm, rune);
    const totalAttack = numbers[0];
    const totalDefense = numbers[1];
    const totalHealing = numbers[2];

    const charmOptions =
      card &&
      charms
        .filter(
          (charm) =>
            charm.type.includes(card.type) || charm.type.includes("Neutral")
        )
        .map(
          (filteredCharm) =>
            new Option(
              filteredCharm.name,
              filteredCharm.id + "-" + part + "-" + filteredCharm.name
            )
        );

    if (charmOptions) {
      charmOptions.unshift(noCharmOption);
    }

    return (
      <Fragment>
        <tr>
          <th>{part}:</th>
          <td>
            <Select
              id={part}
              onChange={this.handleCardChange}
              className="select"
              value={selected}
              options={options}
            />
          </td>
          <td>
            {totalDefense && (
              <span className="defense-value">{totalDefense}</span>
            )}
            &nbsp;
            {totalAttack && (
              <span className="attack-value">{totalAttack}</span>
            )}
            &nbsp;
            {totalHealing && (
              <span className="healing-value">{totalHealing}</span>
            )}
          </td>
        </tr>
        <tr>
          <th>&nbsp;</th>
          <td>
            <Select
              id={"charm" + part}
              onChange={handleCharm}
              className="select"
              value={charmSelected}
              options={charmOptions}
              isDisabled={!card}
            />
          </td>
          <td>
            {charm && (
              <Tooltip
                key={part + charmSelected.value}
                className="tooltip"
                content={charm.effect}
              >
                <img
                  src={require("../img/charms/" +
                    this.getCharmImg(charmSelected.label))}
                  alt={charmSelected.label}
                  className="axie-class-icon"
                />
              </Tooltip>
            )}
          </td>
        </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
      </Fragment>
    );
  }
}
