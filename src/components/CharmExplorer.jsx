import React, { Component } from "react";
import Select from "react-select";

import charms from "../data/charms.json";
import Charm from "./Charm";

const allitems = { value: "all", label: "(all)" };

const bodyOptions = [
  allitems,
  { value: "Neutral", label: "Neutral" },
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

const rarityOptions = [
  allitems,
  { value: "Common", label: "Common" },  
  { value: "Rare", label: "Rare" },
  { value: "Epic", label: "Epic" },
  { value: "Mystic", label: "Mystic" }
];

export default class RuneExplorer extends Component {
  state = {
    charmlist: [],
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
      charmlist: charms,
      selectedBody: allitems,
      selectedRarity: allitems
    });
  };

  filter = (
    selectedBody, selectedRarity
  ) => {
    let filteredList = charms;

    if (selectedBody.value !== "all") {
      filteredList = filteredList.filter((charm) =>
      charm.type.includes(selectedBody.value)
      );
    }

    if (selectedRarity.value !== "all") {
      filteredList = filteredList.filter((charm) =>
        charm.rarity.includes(selectedRarity.value)
      );
    }
  
    this.setState({ charmlist: filteredList });
  };

  componentDidMount() {
    this.reset();
  }

  render() {
    const {
      charmlist,
      selectedBody,
      selectedRarity,
    } = this.state;

    return (
      <div>
        <h1> Charm Explorer </h1>
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
          {charmlist.map(({ id, image, type,  name, effect, rarity, potentialCost }) => (
            <Charm
              key={id}
              image={image}
              type={type}
              name={name}
              rarity={rarity}
              description={effect}
              potentialCost = {potentialCost}
            />       
          ))}
        </div>
      </div>
    );
  }
}