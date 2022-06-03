import React, { Component } from "react";
import Select from "react-select";

import charms from "../data/charms.json";
import Charm from "./Charm";
import ScrollButton from "./ScrollButton";

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

const potentialOptions = [
  allitems,
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" }
];

export default class RuneExplorer extends Component {
  state = {
    charmlist: [],
    selectedBody: allitems,
    selectedRarity: allitems,
    selectedPotential: allitems
  };

  handleChangeBody = (selectedBody) => {
    const {selectedRarity, selectedPotential} = this.state;
    this.setState({ selectedBody });
    this.filter(
      selectedBody,
      selectedRarity,
      selectedPotential
    );
  };

  handleChangeRarity = (selectedRarity) => {
    const {selectedBody, selectedPotential} = this.state;
    this.setState({ selectedRarity });
    this.filter(
      selectedBody,
      selectedRarity,
      selectedPotential
    );
  };

  handleChangePotential = (selectedPotential) => {
    const {selectedBody, selectedRarity} = this.state;
    this.setState({ selectedPotential });
    this.filter(
      selectedBody,
      selectedRarity,
      selectedPotential
    );
  };

  reset = () => {
    this.setState({
      charmlist: charms,
      selectedBody: allitems,
      selectedRarity: allitems,
      selectedPotential: allitems
    });
  };

  filter = (
    selectedBody, selectedRarity, selectedPotential
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

    if (selectedPotential.value !== "all") {
      filteredList = filteredList.filter((charm) =>
      Number(charm.potentialCost) === Number(selectedPotential.value)
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
      selectedPotential
    } = this.state;

    return (
      <div className="charm-explorer">
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
          <div className="filterItem">
            <label htmlFor="potential">Cost</label>
            <Select
              id="potential"
              className="select"
              value={selectedPotential}
              onChange={this.handleChangePotential}
              options={potentialOptions}
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
        <ScrollButton />
      </div>
    );
  }
}