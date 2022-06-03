import React, { Component, Fragment } from "react";
import Select from "react-select";
import Tooltip from "react-tooltip-lite";
import { findCard } from "./Card";
import { findCharm } from "./Charm";

import charms from "../data/charms.json";

export default class AxiePart extends Component {
  getCharmImg = (name) => {
    return name ? charms.find((charm) => charm.name.includes(name)).image : "";
  };

  render() {
    const {
      part,
      options,
      selected,
      handleCard,
      charmSelected,
      handleCharm,
      bonus,
    } = this.props;

    const card = selected ? findCard(selected.value) : null;
    const charm = charmSelected ? findCharm(charmSelected.label) : null;

    const totalAttack =
      card && card.defaultAttack
        ? card.defaultAttack + bonus[0] + (charm ? charm.attackBonus : 0)
        : 0;
    const totalDefense =
      card && card.defaultDefense
        ? card.defaultDefense + bonus[1] + (charm ? charm.defenseBonus : 0)
        : 0;
    const totalHealing =
      card && card.healing
        ? card.healing + bonus[2] + (charm ? charm.healingBonus : 0)
        : 0;

    const charmOptions = card
      ? charms
          .filter(
            (charm) =>
              charm.type.includes(card.type) || charm.type.includes("Neutral")
          )
          .map(
            (filteredCharm) =>
              new Option(
                filteredCharm.name,
                filteredCharm.id + "-" + part + "-" + filteredCharm.name
              )
          )
      : "";

    return (
      <Fragment>
        <tr>
          <th>{part}:</th>
          <td>
            <Select
              id={part}
              onChange={handleCard}
              className="select"
              value={selected}
              options={options}
            />
          </td>
          <td>
            {totalAttack > 0 ? (
              <span className="attack-value">{totalAttack}</span>
            ) : (
              ""
            )}
            {totalDefense > 0 ? (
              <span className="defense-value">{totalDefense}</span>
            ) : (
              ""
            )}
            {totalHealing > 0 ? (
              <span className="healing-value">{totalHealing}</span>
            ) : (
              ""
            )}
          </td>
        </tr>
        <tr>
          <th>&nbsp;</th>
          <td>
            <Select
              id={"charm" + part}
              onChange={handleCharm}
              className="select"
              value={charmSelected}
              options={charmOptions}
              isDisabled={!card}
            />
          </td>
          <td>
            {charm ? (
              <Tooltip
                key={part + charmSelected.value}
                className="tooltip"
                content={charm.effect}
              >
                <img
                  src={require("../img/charms/" +
                    this.getCharmImg(charmSelected.label))}
                  alt={charmSelected.label}
                  className="axie-class-icon"
                />
              </Tooltip>
            ) : (
              ""
            )}
          </td>
        </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
      </Fragment>
    );
  }
}
