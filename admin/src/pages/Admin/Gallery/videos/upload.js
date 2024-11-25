import React, { useState } from "react";
import VidFileUpload from "./uploadVidGalleryFiles";
import { Button } from "@mui/material";
import { Popover } from "@mui/material";
import { Input } from "@mui/material";
import addDocument from "../firebase/addDocument";
import { toast } from "react-toastify";

const GalleryUpload = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const popClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(anchorEl);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [title, setTitle] = useState(null);
  const [next, setNext] = useState(false);
  const VideoUpload = () => {
    const [completed, setCompleted] = useState(false);

    return (
      <>
        <VidFileUpload
          setCompleted={setCompleted}
          Text="Upload video"
          accept="video/*"
          docId={title}
          collectionName="videogallery"
          dir="videogallery"
          completed={completed}
          ImgURL="videoURL"
          ImgName="videoFileName"
        />
      </>
    );
  };

  const ThumbUpload = () => {
    const [completed, setCompleted] = useState(false);

    return (
      <>
        <VidFileUpload
          setCompleted={setCompleted}
          Text="Upload video thumbnail"
          accept="image/*"
          docId={title}
          collectionName="videogallery"
          dir="thumbnailGallery"
          completed={completed}
          ImgURL="thumbnailURL"
          ImgName="thumbFileName"
        />
      </>
    );
  };
  const handleNext = () => {
    if (title) {
      const galleryDoc = {
        thumbFileName: null,
        thumbnailURL: null,
        videoURL: null,
        videoFileName: null,
        title: title,
      };
      const documentName = title.split(" ").join("").toLowerCase();
      addDocument("videogallery", galleryDoc, documentName);
      setNext(true);
      toast.success(
        "video storage successfully initialized, continue to upload file and thumbnail",
        {
          autoClose: 2000,
        }
      );
    }
  };
  const handleSubmit = (e) => {
    setAnchorEl(null);
    setNext(false);
    setTitle(null);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={popClick}
        sx={{
          backgroundColor: "#755566",
          "&:hover": { backgroundColor: "#bab4c2" },
        }}
      >
        Upload Video
      </Button>
      <Popover
        className="popover"
        id={id}
        open={open}
        anchorEl={anchorEl}
        // onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div style={{ padding: "10px" }}>
          {!next ? (
            <>
              <Input
                style={{ padding: "15px" }}
                type="text"
                autoFocus
                required
                value={title}
                placeholder="Enter video title"
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
              <VideoUpload />
              <div
                style={{
                  marginTop: "10px",
                }}
              >
                <ThumbUpload />
              </div>
              <button
                style={{
                  marginTop: "10px",
                  backgroundColor: "#755566",
                  padding: "5px 10px",
                  fontSize: "16px",
                  border: "none",
                  borderRadius: "4px",
                  color: "white",
                }}
                onClick={handleSubmit}
                className="button"
              >
                Done
              </button>
            </>
          )}
        </div>
      </Popover>
    </form>
  );
};

export default GalleryUpload;
