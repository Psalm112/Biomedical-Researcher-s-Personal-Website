import React, { useState, useEffect } from "react";
import "../../../styles/generalStyles/article/articlePost.css";
import { Divider } from "@mui/material";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { format } from "date-fns";

const Featured = ({ path }) => {
  const [featuredArti, setFeaturedArti] = useState([]);
  const [arti, setArti] = useState([]);
  // const docRef = doc(db, "articles", "articleAbout");
  useEffect(() => {
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
  }, []);
  useEffect(() => {
    if (featuredArti) {
      featuredArti.map((article) => {
        if (arti.length !== 4) {
          if (path !== article?.data?.title.split(" ").join("").toLowerCase()) {
            setArti((arr) => [...arr, article]);
          }
        }
      });
    }
  }, [featuredArti]);
  return (
    <>
      {arti.length !== 0 && (
        <div className="featuredPostCont">
          <h3>FEATURED</h3>
          <div className="featuredPosts">
            {arti.map((article) => (
              <div style={{ width: "100%" }}>
                <p className="featuredBrief">
                  {article?.data?.articleDescription.slice(0, 60)}
                  {article?.data?.articleDescription.length > 60 && <>...</>}
                </p>
                <p className="featuredSub">
                  <span>
                    {format(
                      new Date(article?.data?.postedDate.toDate()),
                      "MMM dd yyyy"
                    )}
                  </span>
                  <span>
                    <a href={`/posts/${article?.id}`}>Read Article</a>
                  </span>
                </p>
                <Divider />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Featured;
