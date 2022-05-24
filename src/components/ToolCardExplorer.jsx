import React, { Component } from "react";
import Select from "react-select";
import Card from "./Card";

import cards from "../data/tools.json";

const allitems = { value: "all", label: "(all)" };
const noSort = { value: "none", label: "(none)" };

const energyOptions = [
  allitems,
  { value: "0", label: "0" },
  { value: "1", label: "1" }
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
    selectedEnergy: allitems,
    selectedSort: noSort,
  };

  handleChangeEnergy = (selectedEnergy) => {
    const { selectedSort } =
      this.state;
    this.setState({ selectedEnergy });
    this.filter(
      selectedEnergy,
      selectedSort
    );
  };

  handleChangeSort = (selectedSort) => {
    const { selectedEnergy } =
      this.state;
    this.setState({ selectedSort });
    this.filter(
      selectedEnergy,
      selectedSort
    );
  };

  reset = () => {
    this.setState({
      cardlist: cards,
      selectedEnergy: allitems,
      selectedSort: noSort,
    });
  };

  filter = (
    selectedEnergy,
    selectedSort
  ) => {
    let filteredList = cards;

    if (selectedEnergy.value !== "all") {
      filteredList = filteredList.filter(
        (card) => Number(card.cardEnergy) === Number(selectedEnergy.value)
      );
    }

    switch (selectedSort.value) {
      case "attack":
        filteredList = filteredList.filter((card) =>
        card.cardDamage > 0).sort((a, b) =>
          a.cardDamage < b.cardDamage ? 1 : -1
        );
        break;
      case "defense":
        filteredList = filteredList.filter((card) =>
        card.cardShield > 0).sort((a, b) =>
          a.cardShield < b.cardShield ? 1 : -1
        );
        break;
      case "healing":
        filteredList = filteredList.filter((card) =>
        card.cardHeal > 0).sort((a, b) =>
          a.cardHeal < b.cardHeal ? 1 : -1
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
      selectedEnergy,
      selectedSort,
    } = this.state;

    return (
      <div>
        <h1> Tool Card Explorer </h1>
        <div className="filter">
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
          {cardlist.map(({ id, name, description, cardImage }) => (
            <Card
              key={id}
              name={name}
              description={description}
              cardImage={cardImage}
            />
          ))}
        </div>
      </div>
    );
  }
}
