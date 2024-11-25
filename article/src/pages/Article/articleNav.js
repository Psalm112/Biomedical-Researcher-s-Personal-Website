import React from "react";
import "../../styles/generalStyles/article/articleNav.css";

const ArticleNav = () => {
  return (
    <div className="articleNav">
      <div className="aNavIcon">
        <div
          className="small logoSection"
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <div style={{ width: "25px", marginRight: "3px" }}>
            <a href="/">
              <img src={`/img/logo.png`} width="100%" alt="logo" />
            </a>
          </div>
          <div style={{ width: "150px" }}>
            <a href="/">
              <img src={`/img/logoText.png`} width="100%" alt="logoText" />
            </a>
          </div>
        </div>
      </div>
      <div className="aNavLiCont">
        <ul>
          <li>
            <a href="https://victoroyebanji.com">Home</a>
          </li>
          <li>
            <a style={{ color: "rgb(84, 87, 182)" }} href="/">
              Article
            </a>
          </li>
          <li>
            <a href="https://victoroyebanji.com/contact">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ArticleNav;
