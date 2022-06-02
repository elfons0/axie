import React, { Component } from "react";
import Select from "react-select";
import Card from "./Card";
import ScrollButton from "./ScrollButton";

import cards from "../data/origincards.json";

const allitems = { value: "all", label: "(all)" };
const noSort = { value: "none", label: "(none)" };

const bodyOptions = [
  allitems,
  { value: "aquatic", label: "Aqua" },
  { value: "beast", label: "Beast" },
  { value: "bird", label: "Bird" },
  { value: "bug", label: "Bug" },
  { value: "plant", label: "Plant" },
  { value: "reptile", label: "Reptile" },
];

const partsOptions = [
  allitems,
  { value: "back", label: "Back" },
  { value: "horn", label: "Horn" },
  { value: "mouth", label: "Mouth" },
  { value: "tail", label: "Tail" },
  { value: "ears", label: "Ears" },
  { value: "eyes", label: "Eyes" },
];

const energyOptions = [
  allitems,
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
];

const attackOptions = [
  allitems,
  { value: "AttackMelee", label: "Attack (Melee)" },
  { value: "AttackRanged", label: "Attack (Ranged)" },  
  { value: "Secret", label: "Secret" },
  { value: "Skill", label: "Skill" },
  { value: "Power" , label: "Power" }
];

const sortOptions = [
  noSort,
  { value: "attack", label: "By Attack" },
  { value: "defense", label: "By Defense" },
  { value: "healing", label: "By Healing" },
];

export default class CardExplorer extends Component {
  state = {
    cardlist: [],
    selectedBody: allitems,
    selectedEnergy: allitems,
    selectedPart: allitems,
    selectedAttack: allitems,
    selectedSort: noSort,
  };

  handleChangeBody = (selectedBody) => {
    const { selectedEnergy, selectedPart, selectedAttack, selectedSort } =
      this.state;
    this.setState({ selectedBody });
    this.filter(
      selectedBody,
      selectedEnergy,
      selectedPart,
      selectedAttack,
      selectedSort
    );
  };

  handleChangeEnergy = (selectedEnergy) => {
    const { selectedBody, selectedPart, selectedAttack, selectedSort } =
      this.state;
    this.setState({ selectedEnergy });
    this.filter(
      selectedBody,
      selectedEnergy,
      selectedPart,
      selectedAttack,
      selectedSort
    );
  };

  handleChangePart = (selectedPart) => {
    const { selectedBody, selectedEnergy, selectedAttack, selectedSort } =
      this.state;
    this.setState({ selectedPart });
    this.filter(
      selectedBody,
      selectedEnergy,
      selectedPart,
      selectedAttack,
      selectedSort
    );
  };

  handleChangeAttack = (selectedAttack) => {
    const { selectedBody, selectedEnergy, selectedPart, selectedSort } =
      this.state;
    this.setState({ selectedAttack });
    this.filter(
      selectedBody,
      selectedEnergy,
      selectedPart,
      selectedAttack,
      selectedSort
    );
  };

  handleChangeSort = (selectedSort) => {
    const { selectedBody, selectedEnergy, selectedPart, selectedAttack } =
      this.state;
    this.setState({ selectedSort });
    this.filter(
      selectedBody,
      selectedEnergy,
      selectedPart,
      selectedAttack,
      selectedSort
    );
  };

  reset = () => {
    this.setState({
      cardlist: cards,
      selectedBody: allitems,
      selectedEnergy: allitems,
      selectedPart: allitems,
      selectedAttack: allitems,
      selectedSort: noSort,
    });
  };

  filter = (
    selectedBody,
    selectedEnergy,
    selectedPart,
    selectedAttack,
    selectedSort
  ) => {
    let filteredList = cards;

    if (selectedBody.value !== "all") {
      filteredList = filteredList.filter((card) =>
        card.cardId.includes(selectedBody.value)
      );
    }
    if (selectedEnergy.value !== "all") {
      filteredList = filteredList.filter(
        (card) => Number(card.defaultEnergy) === Number(selectedEnergy.value)
      );
    }
    if (selectedPart.value !== "all") {
      filteredList = filteredList.filter(
        (card) => card.type === selectedPart.value
      );
    }
    if (selectedAttack.value !== "all") {
      filteredList = filteredList.filter((card) =>
        card.abilityType.includes(selectedAttack.value)
      );
    }

    switch (selectedSort.value) {
      case "attack":
        filteredList = filteredList.filter((card) =>
        card.defaultAttack > 0).sort((a, b) =>
          a.defaultAttack < b.defaultAttack ? 1 : -1
        );
        break;
      case "defense":
        filteredList = filteredList.filter((card) =>
        card.defaultDefense > 0).sort((a, b) =>
          a.defaultDefense < b.defaultDefense ? 1 : -1
        );
        break;
      case "healing":
        filteredList = filteredList.filter((card) =>
        card.healing > 0).sort((a, b) =>
          a.healing < b.healing ? 1 : -1
        );
        break;
      default:
        break;
    }

    this.setState({ cardlist: filteredList });
  };

  componentDidMount() {
    this.reset();
  }

  render() {
    const {
      cardlist,
      selectedBody,
      selectedEnergy,
      selectedPart,
      selectedAttack,
      selectedSort,
    } = this.state;

    return (
      <div>
        <h1> Card Explorer </h1>
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
            <label htmlFor="part">Part</label>
            <Select
              id="part"
              className="select"
              value={selectedPart}
              onChange={this.handleChangePart}
              options={partsOptions}
              isSearchable={false}
            />
          </div>

          <div className="filterItem">
            <label htmlFor="energy">Energy</label>
            <Select
              id="energy"
              className="select"
              value={selectedEnergy}
              onChange={this.handleChangeEnergy}
              options={energyOptions}
              isSearchable={false}
            />
          </div>
          <div className="filterItem">
            <label htmlFor="attack">Type</label>
            <Select
              id="attack"
              className="select"
              value={selectedAttack}
              onChange={this.handleChangeAttack}
              options={attackOptions}
              isSearchable={false}
            />
          </div>
          <div className="filterItem">
            <label htmlFor="sort">Sort</label>
            <Select
              id="sort"
              className="select"
              value={selectedSort}
              onChange={this.handleChangeSort}
              options={sortOptions}
              isSearchable={false}
            />
          </div>
          <button className="reset-button" onClick={this.reset}>
            Reset
          </button>
        </div>
        
        <div>
          {cardlist.map(({ cardId, name, description, cardImage }) => (
            <Card
              key={cardId}
              name={name}
              description={description}
              cardImage={cardImage}
            />
          ))}
        </div>
        <ScrollButton />
      </div>
    );
  }
}
