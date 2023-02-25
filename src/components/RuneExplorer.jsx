import React, { Component } from "react";
import Select from "react-select";

import config from "../data/config.json";
import runes from "../data/runes.json";
import Rune from "./Rune";
import ScrollButton from "./ScrollButton";

/*
const url = 'https://api-gateway.skymavis.com/origin/v2/community/runes';
const options = {
  method: 'GET',
  headers: {accept: 'application/json', 'X-API-Key': 'S7SNDcxjzIZr9hUZ42l2PtRASr3yMx5H'}
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
*/

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
  { value: "Mystic", label: "Mystic" },
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
    runelist: [],
    selectedBody: allitems,
    selectedRarity: allitems,
    selectedSeason: currentSeasonItem,
  };

  handleChangeBody = (selectedBody) => {
    const { selectedRarity, selectedSeason } = this.state;
    this.setState({ selectedBody });
    this.filter(selectedBody, selectedRarity, selectedSeason);
  };

  handleChangeRarity = (selectedRarity) => {
    const { selectedBody, selectedSeason } = this.state;
    this.setState({ selectedRarity });
    this.filter(selectedBody, selectedRarity, selectedSeason);
  };

  handleChangeSeason = (selectedSeason) => {
    const { selectedBody, selectedRarity } = this.state;
    this.setState({ selectedSeason });
    this.filter(selectedBody, selectedRarity, selectedSeason);
  };

  startingRunes = (season) => {
    return runes._items
      .filter(
        (rune) =>
          rune.craftable &&
          rune.season?.name === season
      )
      .sort((a, b) => (a.item.displayOrder > b.item.displayOrder ? 1 : -1));
  };

  reset = () => {
    this.setState({
      runelist: this.startingRunes(config.currentSeason),
      selectedBody: allitems,
      selectedRarity: allitems,
      selectedSeason: currentSeasonItem,
    });
  };

  filter = (selectedBody, selectedRarity, selectedSeason) => {
    let filteredList = this.startingRunes(selectedSeason.value);

    if (selectedBody.value !== "all") {
      filteredList = filteredList.filter((rune) =>
        rune.class.includes(selectedBody.value)
      );
    }

    if (selectedRarity.value !== "all") {
      filteredList = filteredList.filter((rune) =>
        rune.item.rarity.includes(selectedRarity.value)
      );
    }

    this.setState({ runelist: filteredList });
  };

  componentDidMount() {
    this.reset();
  }

  render() {
    const { runelist, selectedBody, selectedRarity, selectedSeason } =
      this.state;

    return (
      <div className="rune-explorer">
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
          {runelist.map(({ rune, class: type, item }) => (
            <Rune
              key={rune}
              image={item.imageUrl}
              type={type}
              name={item.name}
              rarity={item.rarity}
              description={item.description}
            />
          ))}
        </div>
        <ScrollButton />
      </div>
    );
  }
}
