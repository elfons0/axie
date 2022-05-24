import React, { Component } from "react";
import Select from "react-select";

import runes from "../data/runes.json";
import Rune from "./Rune";

const allitems = { value: "all", label: "(all)" };

const bodyOptions = [
  allitems,
  { value: "neutral", label: "Neutral" },
  { value: "aquatic", label: "Aqua" },
  { value: "beast", label: "Beast" },
  { value: "bird", label: "Bird" },
  { value: "bug", label: "Bug" },
  { value: "plant", label: "Plant" },
  { value: "reptile", label: "Reptile" },
];

const rarityOptions = [
  allitems,
  { value: "Common", label: "Common" },  
  { value: "Rare", label: "Rare" },
  { value: "Epic", label: "Epic" },
  { value: "Mystic", label: "Mystic" }
];

export default class RuneExplorer extends Component {
  state = {
    runelist: [],
    selectedBody: allitems,
    selectedRarity: allitems
  };

  handleChangeBody = (selectedBody) => {
    const {selectedRarity} = this.state;
    this.setState({ selectedBody });
    this.filter(
      selectedBody,
      selectedRarity
    );
  };

  handleChangeRarity = (selectedRarity) => {
    const {selectedBody} = this.state;
    this.setState({ selectedRarity });
    this.filter(
      selectedBody,
      selectedRarity
    );
  };

  reset = () => {
    this.setState({
      runelist: runes,
      selectedBody: allitems,
      selectedRarity: allitems
    });
  };

  filter = (
    selectedBody, selectedRarity
  ) => {
    let filteredList = runes;

    if (selectedBody.value !== "all") {
      filteredList = filteredList.filter((rune) =>
        rune.type.includes(selectedBody.value)
      );
    }

    if (selectedRarity.value !== "all") {
      filteredList = filteredList.filter((rune) =>
        rune.rarity.includes(selectedRarity.value)
      );
    }
  
    this.setState({ runelist: filteredList });
  };

  componentDidMount() {
    this.reset();
  }

  render() {
    const {
      runelist,
      selectedBody,
      selectedRarity,
    } = this.state;

    return (
      <div>
        <h1> Rune Explorer </h1>
        <div className="filter">
          <div className="filterItem">
            <label htmlFor="body">Class</label>
            <Select
              id="body"
              className="select"
              value={selectedBody}
              onChange={this.handleChangeBody}
              options={bodyOptions}
              isSearchable={false}
            />
          </div>
          <div className="filterItem">
            <label htmlFor="rarity">Rarity</label>
            <Select
              id="rarity"
              className="select"
              value={selectedRarity}
              onChange={this.handleChangeRarity}
              options={rarityOptions}
              isSearchable={false}
            />
          </div>
          <button className="reset-button" onClick={this.reset}>
            Reset
          </button>
        </div>
        <div>
          {runelist.map(({ id, image, type,  name, effect, rarity }) => (
            <Rune
              key={id}
              image={image}
              type={type}
              name={name}
              rarity={rarity}
              description={effect}
            />       
          ))}
        </div>
      </div>
    );
  }
}