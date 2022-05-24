import React, { Component } from "react";
import { Link } from "react-router-dom";

import logo from "../Axielogo.png";
import card_img from "../img/icons/feature_collection.png"
import rune_img from "../img/icons/feature_rune.png"
import charm_img from "../img/icons/feature_charm.png"
import curse_img from "../img/icons/feature_chat.png"
import tools_img from "../img/icons/feature_crafting.png"
import effects_img from "../img/icons/feature_mission.png"


export default class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <p>
          <img src={logo} className="App-logo" alt="logo" />
          <span className="title">Database</span>
        </p>
        <nav className="navigator">
          <Link to="/axiedatabase/cards">CARDS <img src={card_img} className="menu-img" alt="" /></Link>
          <Link to="/axiedatabase/runes">RUNES <img src={rune_img} className="menu-img" alt="" /></Link>
          <Link to="/axiedatabase/charms">CHARMS <img src={charm_img} className="menu-img" alt="" /></Link>
          <Link to="/axiedatabase/curses">CURSES <img src={curse_img} className="menu-img" alt="" /></Link>
          <Link to="/axiedatabase/tools">TOOLS <img src={tools_img} className="menu-img" alt="" /></Link>
          <Link to="/axiedatabase/effects">EFFECTS <img src={effects_img} className="menu-img" alt="" /></Link>
        </nav>
      </header>
    );
  }
}
