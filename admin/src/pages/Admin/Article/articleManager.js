import "../../../styles/adminStyles/about/aExpManager.css";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import {
  doc,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../firebase.js";
// import { format } from "date-fns";
import AdArticle from "./article";
import AddArticle from "./addArticle";
import ArticleDelete from "./deleteArticle";
import AdAboutImg from "../About/aboutimage";
// import { Article } from "@mui/icons-material";
import { Divider } from "@mui/material";
import ArticleAboutTxt from "./articleAboutTxt";
import Meta from "../meta";

function ArticleManager() {
  const [articles, setArticles] = useState([]);

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const q = query(collection(db, "articles"), orderBy("timestamp", "desc"));
    onSnapshot(q, (querySnapshot) => {
      setArticles(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  const [clear, setClear] = useState(false);
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const [title, setTitle] = useState("");
  const container = useRef(null);
  useEffect(() => {
    if (edit) {
      container.current.classList.add("editArticle");
      container.current.classList.remove("grid-main");
    } else {
      container.current.classList.add("grid-main");
      container.current.classList.remove("editArticle");
    }
  }, [edit]);

  return (
    <div className="docs-main">
      {!edit && (
        <>
          <Meta collectionName="articles" docName="articleAbout" />
          <div className="textManagementCont">
            <ArticleAbout />
            <ArticleAboutTxt
              text="About Text"
              collectionName="articles"
              docName="articleAbout"
              field="articleAbout"
            />
          </div>
          <Divider sx={{ borderBottomWidth: "3px" }} />
          <h2>Articles</h2>
          <button className="add-docs" onClick={handleOpen}>
            Create an Article
          </button>
          <AddArticle
            setClear={setClear}
            clear={clear}
            open={open}
            onClose={handleClose}
          />
        </>
      )}
      <div>
        <div ref={container} className="editArticle">
          {articles.map((article) => (
            <>
              {!edit ? (
                <div className="grid-child">
                  <ArticleDelete
                    setTitle={setTitle}
                    title={article?.data?.title}
                    docId={article?.data?.title
                      .split(" ")
                      .join("")
                      .toLowerCase()}
                    dir={`articlefiles/${article?.data?.title
                      .split(" ")
                      .join("")
                      .toLowerCase()}`}
                    collectionName="articles"
                    fileId={article?.data?.articleHeaderImgName}
                    setEdit={setEdit}
                  />
                  {article?.data?.posted && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "8.5%",
                        left: "7.5%",
                        backgroundColor: "#008A62",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                      }}
                    ></div>
                  )}
                  <img
                    loading="lazy"
                    src={article?.data?.articleHeaderImg}
                    alt=""
                  />

                  <div className="articleDocInfo">
                    <h3>{article?.data?.title}</h3>
                    <p>{article?.data?.articleDescription}</p>
                  </div>
                </div>
              ) : (
                <div>
                  {title === article?.data?.title && (
                    <AdArticle
                      Title={article?.data?.title}
                      setEdit={setEdit}
                      prevDoc={article?.data}
                      keywords={article?.data?.articleKeywords}
                      // prevComment={article?.id}
                      author={article?.data?.author}
                      // edit={edit}
                      description={article?.data?.articleDescription}
                      checked={article?.data?.posted}
                      // setChecked={setChecked}
                    />
                  )}
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

const ArticleAbout = () => {
  const [about, setAbout] = useState({});
  const docRef = doc(db, "articles", "articleAbout");

  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      setAbout(doc.data());
    });
  }, []);
  const fileName = about.artiAboutName;
  const completed = about.articleAboutUploadStatus;
  return (
    <>
      <AdAboutImg
        collectionName="articles"
        fileURL={about.artiAboutURL}
        Text="Article About Me Section"
        accept="image/*"
        alt=""
        docName="articleAbout"
        dir="articlefiles"
        completed={completed}
        subDir={fileName}
        ImgURL="artiAboutURL"
        ImgName="artiAboutName"
        uploadCompleteStatus="articleAboutUploadStatus"
      />
    </>
  );
};

export default ArticleManager;
