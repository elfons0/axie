import React, { Component } from "react";
import Select from "react-select";

import effects from "../data/effects.json";
import Effect from "./Effect";

const allitems = { value: "all", label: "(all)" };

const TypeOptions = [
  allitems,
  { value: "Buff", label: "Buff" },  
  { value: "Debuff", label: "Debuff" },
  { value: "Neutral", label: "Neutral" },
  { value: "Card Property", label: "Card Property" } 
];

export default class RuneExplorer extends Component {
  state = {
    effectlist: [],
    selectedType: allitems
  };

  handleChangeType = (selectedType) => {
    this.setState({ selectedType });
    this.filter(
      selectedType
    );
  };

  reset = () => {
    this.setState({
      effectlist: effects,
      selectedType: allitems
    });
  };

  filter = (selectedType) => {
    let filteredList = effects;

    if (selectedType.value !== "all") {
      filteredList = filteredList.filter((effect) =>
      effect.type.includes(selectedType.value)
      );
    }
  
    this.setState({ effectlist: filteredList });
  };

  componentDidMount() {
    this.reset();
  }

  render() {
    const {
      effectlist: runelist,
      selectedType,
    } = this.state;

    return (
      <div className="effect-explorer">
        <h1> Effect Explorer </h1>
        <div className="filter">
          <div className="filterItem">
            <label htmlFor="Type">Type</label>
            <Select
              id="Type"
              className="select"
              value={selectedType}
              onChange={this.handleChangeType}
              options={TypeOptions}
              isSearchable={false}
            />
          </div>
          <button className="reset-button" onClick={this.reset}>
            Reset
          </button>
        </div>
        <div className="flex-div">
          {runelist.map(({ id, image, type,  name, description }) => (
            <Effect
              key={id}
              image={image}
              type={type}
              name={name}
              description={description}
            />       
          ))}
        </div>
      </div>
    );
  }
}