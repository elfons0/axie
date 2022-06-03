import React, { Component } from "react";
import Select from "react-select";
import Tooltip from "react-tooltip-lite";

import runes from "../data/runes.json";

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
    type: "",
    rune: "",
    runedescr: "",
    runelist: [],
    cards: [],
    charms: [],
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
    const { hpbase, handleUpdateHp } = this.props;

    const runedescr = this.getRuneDesc(rune.label);

    this.setState({ rune, runedescr });

    if (Number(rune.value) === 22) {
      // Heart of the Ocean rune
      handleUpdateHp(hpbase + 50);
    }

    if (Number(rune.value) === 19 || Number(rune.value) === 20) {
      this.setState({ hp: 30 });
    } else {
      this.setState({ hp: 0 });
    }
  };

  filterRune = (type) => {
    const filteredList = runes
      .filter(
        (rune) =>
          rune.type.includes(type.value) || rune.type.includes("Neutral")
      )
      .map((filteredRune) => new Option(filteredRune.name, filteredRune.id));

    this.setState({ runelist: filteredList });
  };

  render() {
    const { position, hpbase } = this.props;

    const { hp, type, rune, runedescr, runelist } = this.state;

    return (
      <div className="axie" key={position}>
        <table className="axie-status">
          <tbody>
            <tr>
              <th>Health:</th>
              <td>{hpbase + hp}</td>
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

                  <Tooltip key={position+rune.label} className="tooltip" content={runedescr}>
                  <img
                    src={require("../img/runes/" + this.getRuneImg(rune.label))}
                    alt={rune.label}
                    className="axie-class-icon"
                  />
                  </Tooltip>
                  
                ) : (
                  ""
                )}
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>
    );
  }
}
