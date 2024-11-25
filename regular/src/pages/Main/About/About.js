import React from "react";
import "../../../styles/generalStyles/about/About.css";
import Experience from "./Experience";
import Header from "../../../components/header";
import ArticleShowcase from "../../../components/articleshowcase";
import Contact from "../../../components/contact";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase.js";
import Helmet from "react-helmet";

const About = () => {
  const [about, setAbout] = useState({});
  const docRef = doc(db, "about", "about");

  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      setAbout(doc.data());
    });
  }, []);
  return (
    <div>
      <Helmet>
        <title>Victor Oyebanji | About</title>
        <meta property="og:title" content="Victor Oyebanji | About" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={about?.pageDescription} />
        <meta
          property="og:image"
          content={`${window.location.href}img/articleMeta.png`}
        />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:site_name" content="Victor Oyebanji" />
        <meta name="twitter:image:alt" content="About" />
        <meta name="description" content={about?.pageDescription} />
        <meta name="keywords" content={about?.pageKeywords} />
        <meta name="author" content="Victor Oyebanji" />
        <meta name="robots" content="index,follow,archive" />
      </Helmet>
      <div className="About">
        <Header Text="About ME" />
        <div className="about main" style={{ backgroundColor: "#f5f6fa" }}>
          <div className="aboutContainer">
            <div className="imageSec">
              <div>
                <img src={about.aboutImgURL} alt="about victor oyebanji" />
              </div>
            </div>
            <div className="aboutText">
              <h3>{about.intro}</h3>
              <p>{about.about}</p>
            </div>
          </div>
        </div>
      </div>
      <Experience />
      <ArticleShowcase />
      <Contact />
    </div>
  );
};

export default About;
