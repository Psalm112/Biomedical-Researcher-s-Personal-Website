import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { db } from "../../../firebase";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import deleteDocument from "../Gallery/firebase/deleteDocument";

export default function ArticleDescription({
  toDesc,
  documentName,
  toAuthor,
  toTitle,
  prevDoc,
  comments,
  toKeywords,
  setEdit,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [desc, setDesc] = React.useState(toDesc);
  const [author, setAuthor] = React.useState(toAuthor);
  const [title, setTitle] = React.useState(toTitle);
  const [keywords, setKeywords] = React.useState(toKeywords);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setTitle(toTitle);
    setAuthor(toAuthor);
    setDesc(toDesc);
    setKeywords(toKeywords);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  // const [collectionName, setCollectionName] = React.useState("");
  const handleDesc = async () => {
    // if (desc) {
    const descRef = doc(
      db,
      "articles",
      title.split(" ").join("").toLowerCase()
    );

    if (title !== toTitle) {
      try {
        await setDoc(
          doc(db, "articles", title.split(" ").join("").toLowerCase()),
          prevDoc
        );
        comments.map(async (comment) => {
          await setDoc(
            doc(
              db,
              "articles",
              title.split(" ").join("").toLowerCase(),
              "comments",
              comment.id
            ),
            comment.data
          );
          // setCollectionName(`articles, ${toTitle}, comments`);
          // await deleteDocument(collectionName, comment.id);
        });
        setEdit(false);
        await deleteDocument(
          "articles",
          toTitle.split(" ").join("").toLowerCase()
        );
      } catch (err) {
        toast.error("error while updating article title", {
          autoClose: 2000,
        });
      }
    }
    try {
      await updateDoc(descRef, {
        articleDescription: desc,
        author: author,
        title: title,
        articleKeywords: keywords,
      });

      toast.success("Updated Successfully", {
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err);
      setTitle(toTitle);
      toast.error("error while updating article info", {
        autoClose: 2000,
      });
    }
    setAnchorEl(null);
    // } else {
    //   toast.error("Empty Description", {
    //     autoClose: 2000,
    //   });
    // }
  };
  const psx = {
    alignSelf: "flex-start",
    marginBlock: 0,
    margineInline: 0,
  };

  return (
    <div className="setArtiDesc">
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        sx={{
          backgroundColor: "#755566",
          color: "white",
        }}
      >
        Edit Info
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div
          style={{
            width: "350px",
            padding: " 30px 20px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#bab4c2",
          }}
        >
          <p style={psx}>
            <i>Description</i>
          </p>
          <textarea
            style={{
              width: "100%",
              height: "150px",
              marginBottom: "10px",
              borderColor: "hsl(210, 10%, 75%)",
              padding: "5px",
              fontSize: "18px",
              lineHeight: "25px",
            }}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <p style={psx}>
            <i>
              Article keywords, separate each keyword with a comma and a space
            </i>
          </p>
          <input
            style={{
              padding: "15px",
              marginBottom: "10px",
              width: "100%",
              borderColor: "hsl(210, 10%, 75%)",
              fontSize: "18px",
              lineHeight: "25px",
            }}
            placeholder="eg: you, me, us, they"
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
          <p style={psx}>
            <i>Title</i>
          </p>
          <input
            style={{
              padding: "15px",
              marginBottom: "10px",
              width: "100%",
              borderColor: "hsl(210, 10%, 75%)",
              fontSize: "18px",
              lineHeight: "25px",
            }}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <p style={psx}>
            <i>Author(s)</i>
          </p>
          <input
            style={{
              padding: "15px",
              width: "100%",
              borderColor: "hsl(210, 10%, 75%)",
              fontSize: "18px",
              lineHeight: "25px",
            }}
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button
            style={{
              padding: "0 20px",
              height: "40px",
              border: "none",
              color: "white",
              marginTop: "10px",
              backgroundColor: "hsl(210, 12%, 15%)",
            }}
            onClick={handleDesc}
          >
            Update
          </button>
        </div>
      </Popover>
    </div>
  );
}
