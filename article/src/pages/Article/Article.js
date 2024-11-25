import React, { useEffect, useState } from "react";
import "../../styles/generalStyles/article/article.css";
import ArticleNav from "./articleNav";
import { LoadingButton } from "@mui/lab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ArticleFooter from "./articleFooter";
import {
  collection,
  query,
  where,
  doc,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";
import { format } from "date-fns";
import { Input, InputAdornment } from "@mui/material";
import { FindInPage } from "@mui/icons-material";
import { Helmet } from "react-helmet-async";
// import { auth } from "../../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";

const Article = () => {
  // const [user, load, error] = useAuthState(auth);
  const body = document.body;
  const [cat, setCat] = useState("All");
  const catSel = (e) => {
    const sel = Array.from(document.querySelectorAll(".aCategories p"));
    sel.map((p) => p.classList.remove("selectedCat"));
    e.target.classList.add("selectedCat");
    setCat(e.target.innerHTML);
  };
  const [end, setEnd] = useState(10);
  const [allEnd, setAllEnd] = useState(10);
  const [featuredEnd, setFeaturedEnd] = useState(10);
  const [loading, setLoading] = React.useState(false);

  const [articles, setArticles] = useState([]);
  const [allArti, setAllArti] = useState([]);
  const [featuredArti, setFeaturedArti] = useState([]);
  const [arti, setArti] = useState([]);
  const docRef = doc(db, "articles", "articleAbout");

  function loadMore() {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
    if (articles.length > end) {
      setEnd(end + 8);
      if (cat === "All") {
        setAllEnd(end + 8);
      } else if (cat === "Featured") {
        setFeaturedEnd(end + 8);
      }
    }
  }
  // console.log(end, articles.length);
  useEffect(() => {
    const q = query(
      collection(db, "articles"),
      where("posted", "==", true),
      orderBy("postedDate", "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      setAllArti(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
      setArticles(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    const f = query(
      collection(db, "articles"),
      where("posted", "==", true),
      where("featured", "==", true),
      orderBy("postedDate", "desc")
    );
    onSnapshot(f, (querySnapshot) => {
      setFeaturedArti(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    onSnapshot(docRef, (doc) => {
      setArti(doc.data());
    });
    // setArticles(() => [...allArti]);
  }, []);
  useEffect(() => {
    if (allArti) {
      if (cat === "All") {
        setEnd(allEnd);
        setArticles(() => [...allArti]);
      } else if (cat === "Featured") {
        setEnd(featuredEnd);
        setArticles(() => [...featuredArti]);
      }
    }
  }, [cat]);
  // console.log(articles);

  const [searchValue, setSearchValue] = useState("");

  const searchFunction = () => {
    const list = document.getElementsByClassName("artiFGrid");
    const item = document.getElementsByClassName("artiInfo");

    // Loop through all list items, and hide those who don't match the search query
    let i;
    for (i = 0; i < item.length; i++) {
      const a = item[i].getElementsByTagName("h2")[0];
      const txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(searchValue) > -1) {
        list[i].style.display = "";
      } else {
        list[i].style.display = "none";
      }
    }
  };

  return (
    <div
      className="articleCont"
      onLoad={() => {
        body.style.backgroundColor = "#f5f6fa";
      }}
    >
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
        <link rel="canonical" href="https://article.victoroyebanji.com/" />
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
        <title>Articles | Victor Oyebanji</title>
        <meta name="title" content="Articles | Victor Oyebanji" />
        <meta name="description" content={arti.pageDescription} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content="Articles | Victor Oyebanji" />
        <meta property="og:description" content={arti.pageDescription} />
        <meta
          property="og:image"
          content={`${window.location.href}img/articleMeta.png`}
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={window.location.href} />
        <meta property="twitter:title" content="Articles | Victor Oyebanji" />
        <meta property="twitter:description" content={arti.pageDescription} />
        <meta
          property="twitter:image"
          content={`${window.location.href}img/articleMeta.png`}
        />

        <meta property="og:site_name" content="Victor Oyebanji" />
        <meta name="twitter:image:alt" content="Articles" />
        <meta name="keywords" content={arti.pageKeywords} />
        <meta name="author" content="Victor Oyebanji" />
        <meta name="robots" content="index,follow,archive" />

        {/* inline style elements */}
        <style type="text/css">{`
        body {
            background-color: #f5f6fa;
        }
    `}</style>
      </Helmet>
      <div className="articles">
        <ArticleNav />
        <div className="artiHeadStrip">
          <h1>ARTICLE</h1>
          <div className="aCategories">
            <p
              onClick={catSel}
              className="selectedCat"
              style={{ cursor: "pointer" }}
            >
              All
            </p>
            <p onClick={catSel} style={{ cursor: "pointer" }}>
              Featured
            </p>
            {/* <p onClick={catSel}>Popular</p> */}
          </div>
        </div>
        <div className="searchInput">
          <Input
            onChange={(e) => setSearchValue(e.target.value.toUpperCase())}
            placeholder="article search"
            onKeyUp={searchFunction}
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <FindInPage />
              </InputAdornment>
            }
          />
        </div>
        <div className="artiShoCont">
          <div className="allArti">
            {articles.slice(0, end).map((article) => (
              <div className="artiFGrid">
                <div
                  className="artiImg"
                  style={{
                    backgroundImage: `url(${article?.data?.articleHeaderImg})`,
                  }}
                >
                  {/* <p className="popular">category</p> */}
                  {article?.data?.featured && (
                    <p className="featured">Featured</p>
                  )}
                </div>
                <div className="artiInfo">
                  <h2>{article?.data?.title}</h2>
                  <p>{article?.data?.articleDescription}</p>
                  <p>
                    {format(
                      new Date(article?.data?.postedDate.toDate()),
                      "MMM dd yyyy"
                    )}
                  </p>
                  <p>
                    {/* <a href={`/posts/${article?.id}`}> */}
                    <a href={`/posts/${article?.id}`}>
                      Read Article
                      <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div>
            {articles.length > end && (
              <LoadingButton
                className="loadMore"
                size="small"
                onClick={loadMore}
                loading={loading}
                loadingIndicator="Loading"
                variant="contained"
              >
                Load more
              </LoadingButton>
            )}
          </div>
        </div>
        <ArticleFooter />
      </div>
    </div>
  );
};

export default Article;
