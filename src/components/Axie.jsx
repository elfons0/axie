import React, { Component } from "react";
import Select from "react-select";
import Tooltip from "react-tooltip-lite";

import runes from "../data/runes.json";
import AxiePart from "./AxiePart";
import { partsCards } from "./Card";
import { findCharm } from "./Charm";

const axieBaseHP = 320;

const classOptions = [
  { value: "Aquatic", label: "Aqua" },
  { value: "Beast", label: "Beast" },
  { value: "Bird", label: "Bird" },
  { value: "Bug", label: "Bug" },
  { value: "Dawn", label: "Dawn" },
  { value: "Dusk", label: "Dusk" },
  { value: "Mech", label: "Mech" },
  { value: "Plant", label: "Plant" },
  { value: "Peptile", label: "Reptile" },
];

export default class Axie extends Component {
  state = {
    hp: 0,
    hpbonus: [0,0,0,0,0,0],
    type: "",
    rune: "",
    runedescr: "",
    runelist: [],
    cards: [],
    charms: [],
    potential: []
  };

  getRuneDesc = (name) => {
    return name ? runes.find((rune) => rune.name.includes(name)).effect : "";
  };

  getRuneImg = (name) => {
    return name ? runes.find((rune) => rune.name.includes(name)).image : "";
  };

  handleChangeType = (type) => {
    this.setState({ type, rune: "", runedescr: "" });
    this.filterRune(type);
    this.handleChangeRune("");
  };

  handleChangeRune = (rune) => {
    const { position, handleUpdateHp, teamrunes, handleUpdateRunes } =
      this.props;
    const runedescr = this.getRuneDesc(rune.label);

    this.setState({ rune, runedescr });
    handleUpdateRunes(position, Number(rune.value));

    // Heart of the Ocean rune
    if (teamrunes.includes(22)) {
      handleUpdateHp(axieBaseHP + 50);
    } else {
      handleUpdateHp(axieBaseHP);
    }

    // Aqua hp runes
    if (Number(rune.value) === 19 || Number(rune.value) === 20) {
      this.setState({ hp: 30 });
    } else {
      this.setState({ hp: 0 });
    }
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

  handleCard = (selectedCard) => {
    let { cards } = this.state;

    const index = this.part(selectedCard.value);
    cards[index] = selectedCard;
    this.setState({ cards });
  };

  handleCharm = (charmSelected) => {
    let { charms, hpbonus } = this.state;

    const index = this.part(charmSelected.value);
    charms[index] = charmSelected;
    
    const charm = findCharm(charmSelected.label);
    hpbonus[index]= charm.healthBonus;
    
    this.setState({ charms, hpbonus });
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

  render() {
    const { position, hpbase } = this.props;

    const { hp, hpbonus, type, rune, runedescr, runelist, cards, charms } = this.state;

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

    return (
      <div className="axie" key={position}>
        <table className="axie-status">
          <tbody>
            <tr>
              <th>Health:</th>
              <td><span className="axie-hp">{hpbase + hp + hpbonus.reduce((partialSum, i) => partialSum + i, 0)} </span></td>
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
            />
            <AxiePart
              part="eyes"
              options={eyescards}
              handleCard={this.handleCard}
              selected={cards[1]}
              handleCharm={this.handleCharm}
              charmSelected={charms[1]}
            />
            <AxiePart
              part="ears"
              options={earscards}
              handleCard={this.handleCard}
              selected={cards[2]}
              handleCharm={this.handleCharm}
              charmSelected={charms[2]}
            />
            <AxiePart
              part="mouth"
              options={mouthcards}
              handleCard={this.handleCard}
              selected={cards[3]}
              handleCharm={this.handleCharm}
              charmSelected={charms[3]}
            />
            <AxiePart
              part="back"
              options={backcards}
              handleCard={this.handleCard}
              selected={cards[4]}
              handleCharm={this.handleCharm}
              charmSelected={charms[4]}
            />
            <AxiePart
              part="tail"
              options={tailcards}
              handleCard={this.handleCard}
              selected={cards[5]}
              handleCharm={this.handleCharm}
              charmSelected={charms[5]}
            />
          </tbody>
        </table>
      </div>
    );
  }
}
