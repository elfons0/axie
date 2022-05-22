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

export default class RuneExplorer extends Component {
  state = {
    runelist: [],
    selectedBody: allitems
  };

  handleChangeBody = (selectedBody) => {
    this.setState({ selectedBody });
    this.filter(
      selectedBody
    );
  };


  reset = () => {
    this.setState({
      runelist: runes,
      selectedBody: allitems
    });
  };

  filter = (
    selectedBody
  ) => {
    let filteredList = runes;

    if (selectedBody.value !== "all") {
      filteredList = filteredList.filter((rune) =>
        rune.type.includes(selectedBody.value)
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
      selectedBody
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
          <button className="reset-button" onClick={this.reset}>
            Reset
          </button>
        </div>
        <div>
          {runelist.map(({ id, type, name, description }) => (
            <Rune
              id={id}
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