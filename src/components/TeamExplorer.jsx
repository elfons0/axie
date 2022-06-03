import React, { Component } from "react";
import Axie from "./Axie";

export default class TeamExplorer extends Component {
  state = {
    hpbase: 320,
    teamrunes: [],
  };

  handleUpdateHp = (hpbase) => {
    this.setState({ hpbase });
  };

  handleUpdateRunes = (position, rune) => {
    let { teamrunes } = this.state;
    teamrunes[position] = rune;
    this.setState({ teamrunes });
  };

  render() {
    const { hpbase, teamrunes } = this.state;

    return (
      <div className="team-explorer">
        <Axie
          position="0"
          hpbase={hpbase}
          handleUpdateHp={this.handleUpdateHp}
          teamrunes={teamrunes}
          handleUpdateRunes={this.handleUpdateRunes}
        />
        <Axie
          position="1"
          hpbase={hpbase}
          handleUpdateHp={this.handleUpdateHp}
          teamrunes={teamrunes}
          handleUpdateRunes={this.handleUpdateRunes}
        />
        <Axie
          position="2"
          hpbase={hpbase}
          handleUpdateHp={this.handleUpdateHp}
          teamrunes={teamrunes}
          handleUpdateRunes={this.handleUpdateRunes}
        />
      </div>
    );
  }
}
