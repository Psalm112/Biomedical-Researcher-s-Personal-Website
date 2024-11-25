import React, { Suspense } from "react";
import "../../styles/generalStyles/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagramSquare,
  faTwitterSquare,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Footer from "../../components/Footer";
import NavBar from "../../components/Navbar";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { Button } from "@mui/material";
import { SecurityUpdate } from "@mui/icons-material";
import Helmet from "react-helmet";
import Skeleton from "@mui/material/Skeleton";
const Testimony = React.lazy(() => import("../../components/Testimonies"));
const ArticleShowcase = React.lazy(() =>
  import("../../components/articleshowcase")
);
const Contact = React.lazy(() => import("../../components/contact"));

const Home = () => {
  const [home, setHome] = useState({});
  const [quality, setQuality] = useState({});
  const [about, setAbout] = useState({});
  const [contact, setContact] = useState({});
  const docRef = doc(db, "home", "info");
  const quaRef = doc(db, "home", "qualities");
  const resRef = doc(db, "about", "about");
  const sciRef = doc(db, "contact", "contactInfo");

  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      setHome(doc.data());
    });
    onSnapshot(quaRef, (doc) => {
      setQuality(doc.data());
    });
    onSnapshot(resRef, (doc) => {
      setAbout(doc.data());
    });
    onSnapshot(sciRef, (doc) => {
      setContact(doc.data());
    });
  }, []);

  const [faceVal, setFaceVal] = useState("");
  const [face1Trans, setFace1Trans] = useState(false);
  // const cardTransform = (e) => {
  //   const faces1 = Array.from(
  //     document.querySelectorAll(".about .container .card .face.face1")
  //   );
  //   // const faces2 = Array.from(
  //   //   document.querySelectorAll(".about .container .card .face.face2")
  //   // );

  //   if (face1Trans) {
  //     faces1[faceVal].style.transform = "translateY(0)";
  //   }
  // };
  const faces1 = Array.from(
    document.querySelectorAll(".about .container .card .face.face1")
  );
  useEffect(() => {
    if (faceVal === "") {
      if (faces1[0]) {
        if (face1Trans) {
          faces1[faceVal].classList.add("face1Trans");
        } else {
          faces1[faceVal].classList.remove("face1Trans");
        }
      }
    }
  }, [face1Trans, faceVal]);
  // console.log(face1Trans);
  return (
    <div className="home">
      <Helmet>
        <title>Victor Oyebanji |</title>
        <meta property="og:title" content="Victor Oyebanji |" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={home?.pageDescription} />
        <meta
          property="og:image"
          content={`${window.location.href}img/articleMeta.png`}
        />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:site_name" content="Victor Oyebanji" />
        <meta name="twitter:image:alt" content="Home" />
        <meta name="description" content={home?.pageDescription} />
        <meta name="keywords" content={home?.pageKeywords} />
        <meta name="author" content="Victor Oyebanji" />
        <meta name="robots" content="index,follow,archive" />
      </Helmet>
      <div className="homeHeader" id="back-to-top-anchor">
        <div className="homeSub">
          <ul className="socials">
            <li>
              <a href={contact.facebook} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faFacebookSquare} />
              </a>
            </li>
            <li>
              <a href={contact.instagram} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faInstagramSquare} />
              </a>
            </li>
            <li>
              <a href={contact.twitter} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faTwitterSquare} />
              </a>
            </li>
            <li>
              <a href={contact.linkedin} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </li>
          </ul>
          <div className="textArea">
            <span>{home.headerIntro}</span>
            <h1>{home.name}</h1>
            {/* <h2>A Vetenary Doctor</h2>
              <h2>A Postdoctoral Research Personel</h2>
              <p>in pure CSS.</p>
  </div> */}
            <h2>{home.occupation}</h2>
            <p>{home.headerBrief}</p>
            <div className="text-box">
              <a
                href="#contact"
                className="btn btn-white btn-animate"
                // onClick={toContact}
              >
                Let's Talk
              </a>
            </div>
            {/* <Button variant="contained">Let's Talk</Button> */}
          </div>
          <div className="headerImg">
            <img
              src={home.headerImgURL}
              loading="lazy"
              alt="victor Oyebanji | Vetenary Doctor"
            />
          </div>
        </div>
      </div>

      {/* nav */}
      <NavBar />

      {/* About me(mini) */}
      <div className="about">
        <div className="aboutContainer">
          <div className="imageSec">
            <h2>About me</h2>
            <div>
              <img
                src={home.aboutMeImgURL}
                loading="lazy"
                alt="Victor Oyebanji"
              />
            </div>
          </div>
          <div className="aboutText">
            <h3>{home.aboutMeIntro}</h3>
            <p>
              {home.aboutMe}...<a href="/about">see more</a>
            </p>
            <Button
              sx={{
                backgroundColor: "#4e5e72",
                "&:hover": { backgroundColor: "  #5A5B5F" },
              }}
              variant="contained"
              endIcon={<SecurityUpdate />}
            >
              <a
                target="_blank"
                rel="noreferrer"
                href={about.resumeURL}
                download={about.resumeFileName}
                style={{ color: "inherit" }}
              >
                Resume
              </a>
            </Button>
          </div>
        </div>
        <div className="container">
          <div className="card">
            <div className="face face1">
              <div className="content">
                <img
                  src={quality.quality1Img}
                  loading="lazy"
                  alt={`Victor Oyebanji ${quality.quality1} quality`}
                />
                <h3>{quality.quality1}</h3>
              </div>
            </div>
            <div
              className="face face2"
              onMouseEnter={() => {
                setFaceVal(0);
                setFace1Trans(true);
                // cardTransform();
              }}
              onMouseLeave={() => setFace1Trans(false)}
            >
              <div className="content">
                <p>{quality.quality1desc}</p>
                <a href="/about">Read More</a>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="face face1">
              <div className="content">
                <img
                  src={quality.quality2Img}
                  loading="lazy"
                  alt={`Victor Oyebanji ${quality.quality2} quality`}
                />
                <h3>{quality.quality2}</h3>
              </div>
            </div>
            <div
              className="face face2"
              onMouseEnter={() => {
                setFaceVal(1);
                setFace1Trans(true);
                // cardTransform(e);
              }}
              onMouseLeave={() => setFace1Trans(false)}
            >
              <div className="content">
                <p>{quality.quality2desc}</p>
                <a href="/about">Read More</a>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="face face1">
              <div className="content">
                <img
                  src={quality.quality3Img}
                  loading="lazy"
                  alt={`Victor Oyebanji ${quality.quality3} quality`}
                />
                <h3>{quality.quality3}</h3>
              </div>
            </div>
            <div
              className="face face2"
              onMouseEnter={() => {
                setFaceVal(2);
                setFace1Trans(true);
                // cardTransform(e);
              }}
              onMouseLeave={() => setFace1Trans(false)}
            >
              <div className="content">
                <p>{quality.quality3desc}</p>
                <a href="/about">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Suspense
        fallback={
          <Skeleton
            animation="wave"
            variant="rectangle"
            width={210}
            height={118}
          />
        }
      >
        <Testimony />
      </Suspense>
      <Suspense
        fallback={
          <Skeleton
            sx={{ height: 350, width: "95vw" }}
            animation="wave"
            variant="rectangular"
          />
        }
      >
        <ArticleShowcase />
      </Suspense>
      {/* contact me */}
      <Suspense
        fallback={
          <Skeleton
            sx={{ height: 430, width: "95vw" }}
            animation="wave"
            variant="rectangular"
          />
        }
      >
        <Contact />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Home;
