import React, { Component } from "react";

export default class Post extends Component {
  render() {
    const { date, title, description, image } = this.props;

    return (
      <div className="news-div">
        <div className="news-title">{title}</div>
        <div className="news-description">{description}</div>
        <img src={require('../img/story/' + image)} alt={date} className="news-img" />
      </div>
    );
  }
}
