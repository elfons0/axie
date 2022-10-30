import React, { Component } from "react";
import Select from "react-select";
import Tooltip from "react-tooltip-lite";

import runes from "../data/runes.json";
import AxiePart from "./AxiePart";
import { findCard, findCardByPart, partsCards } from "./Card";
import { findCharm } from "./Charm";

import axios from 'axios'

const AXIE_HP = 320;
const GAIA_EMBRACE = 24;

const classOptions = [
  { value: "Aquatic", label: "Aquatic" },
  { value: "Beast", label: "Beast" },
  { value: "Bird", label: "Bird" },
  { value: "Bug", label: "Bug" },
  { value: "Dawn", label: "Dawn" },
  { value: "Dusk", label: "Dusk" },
  { value: "Mech", label: "Mech" },
  { value: "Plant", label: "Plant" },
  { value: "Reptile", label: "Reptile" },
];

const potentialBonus = [0, 0, 0, 1, 2, 4, 6, 8];

export const getPotentialMap = (potential) => {
  let potentialMap = new Map();

  potential.map((type) => {
    return potentialMap.has(type)
      ? potentialMap.set(type, potentialMap.get(type) + 1)
      : potentialMap.set(type, 1);
  });

  potentialMap.forEach((value, key) => {
    return potentialMap.set(key, value + potentialBonus[value]);
  });

  return potentialMap;
};

export default class Axie extends Component {
  state = {
    axieId: "",
    hp: 0,
    hpbonus: [0, 0, 0, 0, 0, 0],
    type: "",
    rune: "",
    runedescr: "",
    runelist: [],
    cards: [],
    charms: [],
    potential: [],
    potentialUsed: new Map(),
  };

  getRune = (name) => {
    return runes.find((rune) => rune.name.includes(name));
  };

  getRuneImg = (name) => {
    return name ? runes.find((rune) => rune.name.includes(name)).image : "";
  };

  handleChangeType = (type) => {
    let { potential } = this.state;

    this.setState({ type, rune: "", runedescr: "" });
    this.filterRune(type);
    this.handleChangeRune("");

    potential[6] = type.value.toLowerCase();

    this.setState({ potential });
  };

  handleChangeRune = (rune) => {
    const { position, handleUpdateHp, teamrunes, handleUpdateRunes } =
      this.props;

    const runePicked = this.getRune(rune.label);

    // Gaia's Embrace rune
    if (teamrunes.includes(GAIA_EMBRACE)) {
      handleUpdateHp(AXIE_HP + 50);
    } else {
      handleUpdateHp(AXIE_HP);
    }

    this.setState({
      hp: runePicked ? runePicked.healthBonus : 0,
      rune,
      runedescr: runePicked ? runePicked.effect : "",
    });

    handleUpdateRunes(position, Number(rune.value));
  };

  part = (value) => {
    const dash = value.indexOf("-");
    const part = value.substring(dash + 1, value.indexOf("-", dash + 1));

    switch (part) {
      case "horn":
        return 0;
      case "eyes":
        return 1;
      case "ears":
        return 2;
      case "mouth":
        return 3;
      case "back":
        return 4;
      case "tail":
        return 5;
      default:
        return -1;
    }
  };

  potentialPart = (value) => {
    const dash = value.indexOf("-");
    return value.substring(0, dash);
  };

  handleCard = (selectedCard) => {
    let { cards, potential } = this.state;

    const index = this.part(selectedCard.value);
    const potentialPart = this.potentialPart(selectedCard.value);

    cards[index] = selectedCard;
    potential[index] = potentialPart;

    this.setState({ cards, potential });
  };

  handleCharm = (charmSelected) => {
    let { cards, charms, hpbonus, potentialUsed } = this.state;

    const index = this.part(charmSelected.value);
    const previousCharmSelected = charms[index];
    charms[index] = charmSelected;

    const charm = findCharm(charmSelected.label);
    const previousCharm = previousCharmSelected
      && findCharm(previousCharmSelected.label);
    
    
    hpbonus[index] = charm ? charm.healthBonus : 0;

    const cardOption = cards[index];
    const card = findCard(cardOption.value);

    potentialUsed.has(card.type.toLowerCase())
      ? potentialUsed.set(
          card.type.toLowerCase(),
          potentialUsed.get(card.type.toLowerCase()) +
            (charm ? charm.potentialCost : 0) -
            (previousCharm ? previousCharm.potentialCost : 0)
        )
      : potentialUsed.set(card.type.toLowerCase(), charm.potentialCost);

    this.setState({ charms, hpbonus, potentialUsed });
  };

  filterRune = (type) => {
    const { teamrunes } = this.props;
    const filteredList = runes
      .filter(
        (rune) =>
          rune.type.includes(type.value) || rune.type.includes("Neutral")
      )
      .filter(
        (solorune) =>
          solorune.rarity !== "Mystic" ||
          (solorune.rarity === "Mystic" && !teamrunes.includes(solorune.id))
      )
      .map((filteredRune) => new Option(filteredRune.name, filteredRune.id));

    this.setState({ runelist: filteredList });
  };

  potentialTaken = (total, used) => {
    return used > total ? <b>{used}</b> : used;
  };

  handleChangeId = (event) => {
    const axieId = event.target.value;
    this.setState({ axieId });
  };

  axieSearch = () => {
    const { axieId } = this.state;
    axios('https://ronin.rest/ronin/axie/' + axieId)
      .then((response) => {
        this.loadAxie(response.data);        
      });
  }

  loadAxie = (axieData) =>{

    let classType = axieData.genes.cls;
    classType = classType.charAt(0).toUpperCase() +  classType.substring(1);

    const classOption = new Option(classType, classType);
    this.handleChangeType(classOption);

    this.loadAxiePart(axieData, 'horn');
    this.loadAxiePart(axieData, 'eyes');
    this.loadAxiePart(axieData, 'ears');
    this.loadAxiePart(axieData, 'mouth');
    this.loadAxiePart(axieData, 'back');
    this.loadAxiePart(axieData, 'tail');
  }

  loadAxiePart = (axieData, part) => {
    const partCard  = findCardByPart(axieData.genes[part].d.partId);
    const partOption = new Option(partCard.name, partCard.cardId);
    this.handleCard(partOption);
  }

  axieSave = (slotName) => {
    const { type, rune, cards, charms } = this.state;
    const axieData = {type, rune, cards, charms};

    localStorage.setItem(slotName, axieData);
  }

  axieLoad = (slotName) => {
    const axieData = localStorage.getItem(slotName);

    this.setState({ 
      type: axieData.type, 
      rune: axieData.rune, 
      cards: axieData.cards, 
      charms: axieData.charms,
    });

    // handleChangeType(type);
    // handleChangeRune(rune);
  }

  render() {
    const { position, hpbase } = this.props;

    const {
      axieId,
      hp,
      hpbonus,
      type,
      rune,
      runedescr,
      runelist,
      cards,
      charms,
      potential,
      potentialUsed,
    } = this.state;

    const horncards = partsCards("horn").map(
      (card) => new Option(card.name, card.cardId)
    );

    const eyescards = partsCards("eyes").map(
      (card) => new Option(card.name, card.cardId)
    );

    const earscards = partsCards("ears").map(
      (card) => new Option(card.name, card.cardId)
    );

    const mouthcards = partsCards("mouth").map(
      (card) => new Option(card.name, card.cardId)
    );

    const backcards = partsCards("back").map(
      (card) => new Option(card.name, card.cardId)
    );

    const tailcards = partsCards("tail").map(
      (card) => new Option(card.name, card.cardId)
    );

    const potentialMap = getPotentialMap(potential);

    return (
      <div className="axie" key={position}>
        <h1>
          {
            {
              0: "Front-line",
              1: "Mid-line",
              2: "Back-line",
            }[position]
          }
        </h1>
        <div>
          <table className="axie-status">
            <tbody>
              <tr>
                <th>Health:</th>
                <td>
                  <span className="axie-hp">
                    {hpbase +
                      hp +
                      hpbonus.reduce((partialSum, i) => partialSum + i, 0)}{" "}
                  </span>
                </td>
              </tr>
              <tr>
                <th>Class:</th>
                <td>
                  <Select
                    id="body"
                    className="select"
                    value={type}
                    onChange={this.handleChangeType}
                    options={classOptions}
                  />
                </td>
                <td>
                  {type ? (
                    <img
                      src={require("../img/icons/" + type.value + ".png")}
                      alt={type.label}
                      className="axie-class-icon"
                    />
                  ) : (
                    ""
                  )}
                </td>
              </tr>
              <tr>
                <th>Rune:</th>
                <td>
                  <Select
                    id="rune"
                    onChange={this.handleChangeRune}
                    className="select"
                    value={rune}
                    options={runelist}
                  />
                </td>
                <td>
                  {rune ? (
                    <Tooltip
                      key={position + rune.label}
                      className="tooltip"
                      content={runedescr}
                    >
                      <img
                        src={require("../img/runes/" +
                          this.getRuneImg(rune.label))}
                        alt={rune.label}
                        className="axie-class-icon"
                      />
                    </Tooltip>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
              <tr>
                <th colSpan={3}>
                  <hr />
                </th>
              </tr>
              <AxiePart
                part="horn"
                options={horncards}
                handleCard={this.handleCard}
                selected={cards[0]}
                handleCharm={this.handleCharm}
                charmSelected={charms[0]}
                type={type}
                runeSelected={rune}
                potentialMap={potentialMap}
              />
              <AxiePart
                part="eyes"
                options={eyescards}
                handleCard={this.handleCard}
                selected={cards[1]}
                handleCharm={this.handleCharm}
                charmSelected={charms[1]}
                type={type}
                runeSelected={rune}
                potentialMap={potentialMap}
              />
              <AxiePart
                part="ears"
                options={earscards}
                handleCard={this.handleCard}
                selected={cards[2]}
                handleCharm={this.handleCharm}
                charmSelected={charms[2]}
                type={type}
                runeSelected={rune}
                potentialMap={potentialMap}
              />
              <AxiePart
                part="mouth"
                options={mouthcards}
                handleCard={this.handleCard}
                selected={cards[3]}
                handleCharm={this.handleCharm}
                charmSelected={charms[3]}
                type={type}
                runeSelected={rune}
                potentialMap={potentialMap}
              />
              <AxiePart
                part="back"
                options={backcards}
                handleCard={this.handleCard}
                selected={cards[4]}
                handleCharm={this.handleCharm}
                charmSelected={charms[4]}
                type={type}
                runeSelected={rune}
                potentialMap={potentialMap}
              />
              <AxiePart
                part="tail"
                options={tailcards}
                handleCard={this.handleCard}
                selected={cards[5]}
                handleCharm={this.handleCharm}
                charmSelected={charms[5]}
                type={type}
                runeSelected={rune}
                potentialMap={potentialMap}
              />
              <tr>
                <th colSpan={3}>
                  <hr />
                </th>
              </tr>
              <tr>
                <th>Potential:</th>
                <td colSpan={2} className="potential-cell">
                  {[...potentialMap.keys()].map((key) => {
                    return (
                      <span className="potential-points">
                        <img
                          src={require("../img/icons/" +
                            key.charAt(0).toUpperCase() +
                            key.substring(1) +
                            ".png")}
                          alt={key}
                          className="axie-class-icon"
                        />
                        {potentialMap.get(key) + " "}(
                        {potentialUsed.get(key)
                          ? this.potentialTaken(
                              potentialMap.get(key),
                              potentialUsed.get(key)
                            )
                          : 0}
                        )
                      </span>
                    );
                  })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="axie-control">
          <input className="textfield"
            type="text"
            value={axieId}
            placeholder="Axie ID"
            onChange={this.handleChangeId}
            />
          <button className="reset-button" 
            onClick={this.axieSearch}>
            Load Cards
          </button>

        </div>
      </div>
    );
  }
}
