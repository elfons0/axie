import React, { Component } from "react";
import { Link } from "react-router-dom";

import logo from "../Axielogo.png";
import card_img from "../img/feature_collection.png"
import rune_img from "../img/feature_rune.png"
import charm_img from "../img/feature_charm.png"


export default class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <p>
          <img src={logo} className="App-logo" alt="logo" />
          <span className="title">Database</span>
        </p>
        <nav className="navigator">
          <Link to="/">CARDS <img src={card_img} className="menu-img" alt="" /></Link>
          <Link to="/runes">RUNES <img src={rune_img} className="menu-img" alt="" /></Link>
          <Link to="/charms">CHARMS <img src={charm_img} className="menu-img" alt="" /></Link>
        </nav>
      </header>
    );
  }
}
