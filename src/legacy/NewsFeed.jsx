import React, { Component } from "react";

import news from "../data/news.json";
import Post from "../components/Post";

export default class NewsFeed extends Component {
  render() {
    return (
      <div>
        {news.map(({ date, title, description, image }) => (
          <Post
            key={date}
            title={title}
            description={description}
            image={image}
          />
        ))}
      </div>
    );
  }
}
