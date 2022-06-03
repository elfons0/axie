import React, { Component } from "react";

import Summon from "./Summon";
import summons from "../data/summons.json";


export default class SummonExplorer extends Component {

  render() {
    
    return (
      <div className="summon-explorer">
        <h1> Summon Explorer </h1>

        <div>
          {summons.map(({ id, image, type,  name, description }) => (
            <Summon
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