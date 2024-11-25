import React from "react";
import "../styles/componentStyles/header.css";

const Header = (props) => {
  return (
    <div className="hdcont" id="back-to-top-anchor">
      <div>
        <h2>{props.Text}</h2>
      </div>
    </div>
  );
};

export default Header;
