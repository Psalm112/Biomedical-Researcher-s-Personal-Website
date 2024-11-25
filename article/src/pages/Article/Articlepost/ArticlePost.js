import React from "react";
import ArticleNav from "../articleNav";
import Featured from "./featuredPosts";
import "../../../styles/generalStyles/article/articlePost.css";
import { Link } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { faAt, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import CommentForm from "./comentForm";
import CommentList from "./commentList";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { format } from "date-fns";
import SpeedDial from "@mui/material/SpeedDial";
// import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ShareIcon from "@mui/icons-material/Share";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArticleFooter from "../articleFooter";
import {
  faArrowUpShortWide,
  faArrowDownWideShort,
} from "@fortawesome/free-solid-svg-icons";
// import { makeStyles } from "@mui/styles";
import { Helmet } from "react-helmet-async";
import { Facebook, LinkedIn, Twitter, WhatsApp } from "@mui/icons-material";

// const useStyles = makeStyles({
//   fab: {
//     backgroundColor: "#4e5e72",
//   },
// } );

const Blog = () => {
  // const classes = useStyles();
  const [article, setArticle] = useState({});
  const [about, setAbout] = useState({});
  const [contact, setContact] = useState({});
  const postPath = window.location.pathname.split("/");
  const docRef = doc(db, "articles", postPath[2]);
  const aboutRef = doc(db, "articles", "articleAbout");
  const contactRef = doc(db, "contact", "contactInfo");

  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      setArticle(doc.data());
    });
    onSnapshot(aboutRef, (doc) => {
      setAbout(doc.data());
    });
    onSnapshot(contactRef, (doc) => {
      setContact(doc.data());
    });
  }, []);
  // useEffect(() => {
  //   document.title = article.title;
  // }, [article]);

  const navigator_info = window.navigator;
  const screen_info = window.screen;
  var uid = navigator_info.mimeTypes.length;
  uid += navigator_info.userAgent.replace(/\D+/g, "");
  uid += navigator_info.plugins.length;
  uid += screen_info.height || "";
  uid += screen_info.width || "";
  uid += screen_info.pixelDepth || "";
  // console.log(uid);
  // document.write(uid);
  const [isHover, setIsHover] = useState(false);
  const [comAscend, setComAscend] = useState(false);
  const [comHover, setComHover] = useState(true);
  const [repAscend, setRepAscend] = useState(true);
  const [repHover, setRepHover] = useState(false);
  const handleRep = () => {
    if (repHover) {
      setComHover(true);
      setRepHover(false);
      setRepAscend(true);
    } else if (repAscend) {
      setRepAscend(false);
    } else {
      setRepAscend(true);
    }
  };
  const handleCom = () => {
    if (comHover) {
      setComHover(false);
      setRepHover(true);
      setComAscend(true);
    } else if (comAscend) {
      setComAscend(false);
    } else {
      setComAscend(true);
    }
  };

  const actions = [
    {
      icon: (
        <Link
          rel="noopener"
          color="inherit"
          underline="none"
          target="_blank"
          href={`whatsapp://send?text=${article.articleDescription}%0A%0A${window.location.href}`}
        >
          <WhatsApp sx={{ margin: "auto", display: "block" }} />
        </Link>
      ),
      name: "WhatsApp",
    },
    {
      icon: (
        <Link
          rel="noopener"
          color="inherit"
          underline="none"
          target="_blank"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
        >
          <LinkedIn sx={{ margin: "auto", display: "block" }} />
        </Link>
      ),
      name: "LinkedIn",
    },
    {
      icon: (
        <Link
          rel="noopener"
          color="inherit"
          underline="none"
          target="_blank"
          href={`https://twitter.com/intent/tweet?text=${article.articleDescription}%0A%0A${window.location.href}`}
        >
          <Twitter sx={{ margin: "auto", display: "block" }} />
        </Link>
      ),
      name: "Twitter",
    },
    {
      icon: (
        <Link
          rel="noopener"
          color="inherit"
          underline="none"
          target="_blank"
          href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
        >
          <Facebook sx={{ margin: "auto", display: "block" }} />
        </Link>
      ),
      name: "Facebook",
    },
  ];

  return (
    <div className="articlePostCont">
      <Helmet
        prioritizeSeoTags
        encodeSpecialCharacters={true}
        // onChangeClientState={(newState, addedTags, removedTags) =>
        //   console.log(newState, addedTags, removedTags)
        // }
      >
        <html lang="en" />
        <body data-new-gr-c-s-check-loaded="14.1078.0" data-gr-ext-installed />

        <meta charset="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#4E5E72" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="canonical" href={window.location.href} />
        <link
          rel="preconnect"
          href="https://oyebanjivictor-f4d86.firebaseapp.com"
          crossorigin
        />
        <link
          rel="dns-prefetch"
          href="https://oyebanjivictor-f4d86.firebaseapp.com"
        />

        <link
          rel="preconnect"
          href="https://firebase.googleapis.com"
          crossorigin
        />
        <link rel="dns-prefetch" href="https://firebase.googleapis.com" />

        <link rel="preconnect" href="https://apis.google.com" crossorigin />
        <link rel="dns-prefetch" href="https://apis.google.com" />

        {/* Primary Meta Tags */}
        <title>{article.title}</title>
        <meta name="title" content={article.title} />
        <meta name="description" content={article.articleDescription} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.articleDescription} />
        <meta property="og:image" content={article.articleHeaderImg} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={window.location.href} />
        <meta property="twitter:title" content={article.title} />
        <meta
          property="twitter:description"
          content={article.articleDescription}
        />
        <meta property="twitter:image" content={article.articleHeaderImg} />

        <meta property="og:site_name" content="Victor Oyebanji" />
        <meta name="twitter:image:alt" content={article.title} />
        <meta name="keywords" content={article.articleKeywords} />
        <meta name="author" content={article.author} />
        <meta name="robots" content="index,follow,archive" />

        {/* inline style elements */}
        <style type="text/css">{`
        body {
            background-color: #f5f6fa;
        }
    `}</style>
      </Helmet>
      <div className="articlePost">
        <ArticleNav />
        <div className="articleBody">
          <div className="articleGrid">
            <div className="articleHead">
              <div className="aHead">
                <div
                  className="aHeadImg"
                  style={{
                    backgroundImage: `url(${article.articleHeaderImg})`,
                  }}
                >
                  {/* {article.featured && <p>Category</p>} */}
                </div>
                <div className="aHeadText">
                  <h1>{article.title}</h1>
                  <p>
                    {article.posted !== undefined && (
                      <span>
                        {format(
                          new Date(article?.postedDate.toDate()),
                          "MMM dd yyyy"
                        )}
                      </span>
                    )}
                    <span>{article.author}</span>
                  </p>
                </div>
              </div>
            </div>

            <Featured path={postPath[2]} />
            <div className="articleText">
              <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
              <div style={{ position: "sticky", bottom: "10px" }}>
                <SpeedDial
                  ariaLabel="SpeedDial basic example"
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                  }}
                  // classes={{ fab: classes.fab }}
                  className="speedDial"
                  icon={<ShareIcon />}
                >
                  {actions.map((action) => (
                    <SpeedDialAction
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                    />
                  ))}
                </SpeedDial>
              </div>
            </div>
          </div>
          <div>
            <div className="lineSeparator"></div>
            <div className="profile">
              <div className="aProfileCard">
                <div
                  onMouseEnter={() => setIsHover(true)}
                  onMouseLeave={() => setIsHover(false)}
                  className="autCard card0"
                  style={{
                    background: isHover
                      ? `url(${about.artiAboutURL}) left center no-repeat`
                      : `url(${about.artiAboutURL}) center center no-repeat`,
                    backgroundSize: isHover ? "600px" : "400px",
                    transition: "all 1.5s",
                  }}
                >
                  <div className="autBorder">
                    <h2>Victor Oyebanji</h2>
                    <div className="icons">
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={`mailto:${contact.email}`}
                      >
                        <FontAwesomeIcon className="fa" icon={faAt} />
                      </a>
                      <a
                        href={contact.linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FontAwesomeIcon className="fa" icon={faLinkedinIn} />
                      </a>
                      <a
                        href={contact.instagram}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FontAwesomeIcon className="fa" icon={faInstagram} />
                      </a>
                      <a
                        href={contact.twitter}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FontAwesomeIcon className="fa" icon={faTwitter} />
                      </a>
                      <a
                        href={contact.facebook}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FontAwesomeIcon className="fa" icon={faFacebookF} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="profileInfo">
                <FontAwesomeIcon className="pInfoIcon" icon={faUserDoctor} />
                <p>{about.articleAbout}</p>
              </div>
            </div>
            <div className="lineSeparator"></div>
          </div>
          <div>
            <CommentForm documentName={postPath[2]} uid={uid} />
            <div className="commentSort">
              <span style={{ flexGrow: 1 }}>comments & replies</span>
              <div>
                <span onClick={handleRep} style={{ cursor: "pointer" }}>
                  Reply
                  {repHover ? (
                    <FontAwesomeIcon
                      className="sortHover sortIcon repIcon"
                      icon={faArrowUpShortWide}
                    />
                  ) : repAscend ? (
                    <FontAwesomeIcon
                      className="sortIcon"
                      icon={faArrowUpShortWide}
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="sortIcon"
                      icon={faArrowDownWideShort}
                    />
                  )}
                </span>
                <span onClick={handleCom} style={{ cursor: "pointer" }}>
                  Comment
                  {comHover ? (
                    <FontAwesomeIcon
                      className="sortHover sortIcon comIcon"
                      icon={faArrowUpShortWide}
                    />
                  ) : comAscend ? (
                    <FontAwesomeIcon
                      className="sortIcon"
                      icon={faArrowUpShortWide}
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="sortIcon"
                      icon={faArrowDownWideShort}
                    />
                  )}
                </span>
                <span></span>
              </div>
            </div>
            <div
              style={{
                width: "85%",
                margin: "auto",
                backgroundColor: "#8B7486",
              }}
              className="lineSeparator"
            ></div>
            <CommentList
              repHover={repHover}
              repAscend={repAscend}
              comAscend={comAscend}
              documentName={postPath[2]}
              uid={uid}
            />
          </div>
        </div>
        <ArticleFooter />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Blog;
