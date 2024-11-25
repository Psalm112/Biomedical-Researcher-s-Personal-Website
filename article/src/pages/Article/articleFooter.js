import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Link } from "@mui/material";
import "../../styles/generalStyles/article/articleFooter.css";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const ArticleFooter = () => {
  const [contact, setContact] = useState({});
  const docRef = doc(db, "contact", "contactInfo");

  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      setContact(doc.data());
    });
  }, []);

  const Copyright = () => {
    return (
      <div>
        <Typography variant="body2" color="text.secondary">
          {"Copyright © "}
          <Link color="inherit" href="https://wa.me/message/SRZOYIUCMQYVO1">
            Aplus Designs
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </div>
    );
  };
  return (
    <div className="aFooterCont">
      <div className="aFooter">
        <div
          className="logoSection"
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
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
        <ul>
          <li id="footContact">Contact</li>
          <li>
            <span style={{ display: "block" }}>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </span>
            <span style={{ display: "block" }}>{contact.phoneNumber}</span>
          </li>
        </ul>
      </div>
      <div className="lineSeparator"></div>
      <Copyright />
    </div>
  );
};

export default ArticleFooter;
