import React from "react";
import Mod from "../Modal.js";
import { useState } from "react";
import "../../../styles/adminStyles/about/addExp.css";
import { Input } from "@mui/material";
import addDocument from "../Gallery/firebase/addDocument.js";
import VidFileUpload from "../Gallery/videos/uploadVidGalleryFiles.js";

function AddArticle({ onClose, open, clear, setClear }) {
  const [title, setTitle] = useState(null);
  const [next, setNext] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [documentName, setDocumentName] = useState(null);
  // console.log(documentName);
  const handleNext = async () => {
    if (title) {
      setDocumentName(title.split(" ").join("").toLowerCase());
      const articleDoc = {
        articleDescription: null,
        articleKeywords: null,
        content: null,
        articleHeaderImgName: null,
        articleHeaderImg: null,
        author: "Victor Oyebanji",
        posted: false,
        postedDate: null,
        featured: false,
        MediaList: [],
        title: title,
      };
      const docId = title.split(" ").join("").toLowerCase();
      await addDocument("articles", articleDoc, docId);
      setNext(true);
    }
  };

  if (next) {
    if (!open) {
      setCompleted(true);
    }
  }
  if (completed) {
    onClose();
    setNext(false);
    setCompleted(false);
    setTitle(null);
    setClear(false);
  }

  return (
    <Mod modalLable="Add Article" onClose={onClose} open={open}>
      <form className="addTask" name="addTask">
        <div>
          {!next ? (
            <>
              <Input
                style={{ padding: "15px" }}
                type="text"
                autoFocus
                required
                value={title}
                placeholder="Add a title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <button
                style={{
                  backgroundColor: "#755566",
                  padding: "5px 10px",
                  fontSize: "16px",
                  border: "none",
                  borderRadius: "4px",
                  color: "white",
                }}
                onClick={handleNext}
                className="button"
              >
                Next
              </button>
            </>
          ) : (
            <>
              <VidFileUpload
                setCompleted={setCompleted}
                Text="Upload article header image"
                accept="image/*"
                docId={title}
                collectionName="articles"
                dir={`articlefiles/${documentName}`}
                completed={completed}
                ImgURL="articleHeaderImg"
                ImgName="articleHeaderImgName"
              />
            </>
          )}
        </div>
      </form>
    </Mod>
  );
}

export default AddArticle;
