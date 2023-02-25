import React, { Component } from "react";
import Select from "react-select";

import config from "../data/config.json";
import charms from "../data/charms.json";
import Charm from "./Charm";
import ScrollButton from "./ScrollButton";

const allitems = { value: "all", label: "(all)" };

const bodyOptions = [
  allitems,
  { value: "Neutral", label: "Neutral" },
  { value: "Aquatic", label: "Aquatic" },
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

const seasonOptions = [
  { value: "Season 2", label: "Season 2" },
  { value: "Season 1", label: "Season 1" },
  { value: "Season 0", label: "Season 0" },
  { value: "Season Alpha", label: "Season Alpha" },
];

const currentSeasonItem = { value: config.currentSeason, label: config.currentSeason };

export default class RuneExplorer extends Component {
  state = {
    charmlist: [],
    selectedBody: allitems,
    selectedRarity: allitems,
    selectedPotential: allitems,
    selectedSeason: currentSeasonItem,
  };

  handleChangeBody = (selectedBody) => {
    const {selectedRarity, selectedPotential, selectedSeason} = this.state;
    this.setState({ selectedBody });
    this.filter(
      selectedBody,
      selectedRarity,
      selectedPotential, 
      selectedSeason
    );
  };

  handleChangeRarity = (selectedRarity) => {
    const {selectedBody, selectedPotential, selectedSeason} = this.state;
    this.setState({ selectedRarity });
    this.filter(
      selectedBody,
      selectedRarity,
      selectedPotential, 
      selectedSeason
    );
  };

  handleChangePotential = (selectedPotential) => {
    const {selectedBody, selectedRarity, selectedSeason} = this.state;
    this.setState({ selectedPotential });
    this.filter(
      selectedBody,
      selectedRarity,
      selectedPotential, 
      selectedSeason
    );
  };

  handleChangeSeason = (selectedSeason) => {
    const {selectedBody, selectedRarity, selectedPotential} = this.state;
    this.setState({ selectedSeason });
    this.filter(
      selectedBody,
      selectedRarity,
      selectedPotential, 
      selectedSeason
    );
  };

  startingCharms = (season) => {
    return charms._items    
      .filter(
        (charm) =>
          charm.craftable &&
          charm.season?.name === season
      )
      .sort((a, b) => (a.item.displayOrder > b.item.displayOrder ? 1 : -1));
  };

  reset = () => {
    this.setState({
      charmlist: this.startingCharms(config.currentSeason),
      selectedBody: allitems,
      selectedRarity: allitems,
      selectedPotential: allitems
    });
  };

  filter = (
    selectedBody, selectedRarity, selectedPotential, selectedSeason
  ) => {
    let filteredList = this.startingCharms(selectedSeason.value);

    if (selectedBody.value !== "all") {
      filteredList = filteredList.filter((charm) =>
      charm.class.includes(selectedBody.value)
      );
    }

    if (selectedRarity.value !== "all") {
      filteredList = filteredList.filter((charm) =>
        charm.item.rarity.includes(selectedRarity.value)
      );
    }

    if (selectedPotential.value !== "all") {
      filteredList = filteredList.filter((charm) =>
      Number(charm.potentialPoint) === Number(selectedPotential.value)
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
      selectedPotential,
      selectedSeason
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
          <div className="filterItem">
            <label htmlFor="season">Season</label>
            <Select
              id="season"
              className="select"
              value={selectedSeason}
              onChange={this.handleChangeSeason}
              options={seasonOptions}
              isSearchable={false}
            />
          </div>
          <button className="reset-button" onClick={this.reset}>
            Reset
          </button>
        </div>
        <div className="flex-div">
          {charmlist.map(({code, potentialPoint, class: type, item }) => (
            <Charm
              key={code}
              image={item.imageUrl}
              type={type}
              name={item.name}
              rarity={item.rarity}
              effect={item.description}
              potentialCost={potentialPoint}
            />       
          ))}
        </div>
        <ScrollButton />
      </div>
    );
  }
}