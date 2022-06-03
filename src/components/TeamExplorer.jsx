import React, { Component } from "react";
import Axie from "./Axie";

export default class TeamExplorer extends Component {
  state = {
    hpbase: 320,
    solorunes: [],
  };

  handleUpdateHp = (hpbase) => {
    this.setState({ hpbase });
  };

  render() {
    const { hpbase, solorunes } = this.state;

    return (
      <div className="team-explorer">
        <Axie
          position="front"
          hpbase={hpbase}
          handleUpdateHp={this.handleUpdateHp}
          solorunes={solorunes}
        />
        <Axie
          position="mid"
          hpbase={hpbase}
          handleUpdateHp={this.handleUpdateHp}
          solorunes={solorunes}
        />
        <Axie
          position="back"
          hpbase={hpbase}
          handleUpdateHp={this.handleUpdateHp}
          solorunes={solorunes}
        />
      </div>
    );
  }
}
