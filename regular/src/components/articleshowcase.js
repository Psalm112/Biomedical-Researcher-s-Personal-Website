import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
// import { useNavigate } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "../styles/componentStyles/articleShowcase.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

const ArticleShowcase = () => {
  const [showcaseArti, setShowcaseArti] = useState([]);
  const [arti, setArti] = useState([]);
  // const docRef = doc(db, "articles", "articleAbout");
  useEffect(() => {
    const f = query(
      collection(db, "articles"),
      where("posted", "==", true),
      orderBy("postedDate", "desc")
    );
    onSnapshot(f, (querySnapshot) => {
      setShowcaseArti(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  useEffect(() => {
    if (showcaseArti) {
      showcaseArti.map((article) => {
        if (arti.length !== 10) {
          setArti((arr) => [...arr, article]);
        }
      });
    }
  }, [showcaseArti]);

  // const navigate = useNavigate();
  // const navigateToBlog = () => {
  //   navigate("articles/blog");
  // };
  return (
    <>
      {arti.length !== 0 && (
        <div className="artSwiperContainer">
          <h2>Recent Articles</h2>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
          >
            {arti.map((article) => (
              <SwiperSlide>
                <div className="recent">
                  <div className="recentImg">
                    {article?.data?.featured && (
                      <p className="featured">Featured</p>
                    )}
                    <img
                      src={article?.data?.articleHeaderImg}
                      alt={article?.data?.title}
                    />
                  </div>
                  <div className="recentText">
                    <h3>{article?.data?.title}</h3>
                    <p>
                      {article?.data?.articleDescription.slice(0, 60)}
                      {article?.data?.articleDescription.length > 60 && (
                        <>...</>
                      )}
                    </p>
                    <Button
                      size="small"
                      href={`https://article.victoroyebanji.com/posts/${article?.id}`}
                      sx={{
                        float: "right",
                        marginTop: "15px",
                        bottom: 0,
                        color: "#4e5e72",
                      }}
                    >
                      Read More
                      <FontAwesomeIcon icon={faArrowRight} />
                    </Button>
                  </div>

                  {/* <ImageListItem className="recentList" key={article.headerbg}>
                <img
                  src={`img/${article.headerbg}?w=248&fit=crop&auto=format`}
                  srcSet={`img/${article.headerbg}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={article.title}
                  loading="lazy"
                />
                <ImageListItemBar
                  className="recentListText"
                  sx={{ overflow: "visible" }}
                  title={article.title}
                  // subtitle={<p>{article.brief}</p>}
                  position="below"
                />
              </ImageListItem>
              <p>{article.brief}</p> */}
                </div>
              </SwiperSlide>
            ))}
            <a
              href="https://article.victoroyebanji.com/"
              className="toArticlePage"
            >
              see more
              <FontAwesomeIcon icon={faAnglesRight} />
            </a>
          </Swiper>
        </div>
      )}
    </>
  );
};

export default ArticleShowcase;
