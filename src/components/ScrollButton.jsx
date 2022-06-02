import React, { useState } from "react";

import top from "../img/top.png";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <span
      class="goTop"
      onClick={scrollToTop}
      style={{ display: visible ? "inline" : "none" }}
    >
      <img src={top} alt="top" />
    </span>
  );
};

export default ScrollButton;
