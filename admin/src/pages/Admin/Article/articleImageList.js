import { Input, Modal } from "@mui/material";
import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Box } from "@mui/material";
import "../../../styles/adminStyles/about/aExp.css";
import { deleteField, setDoc, updateDoc } from "firebase/firestore";
import { doc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import AMediaUpload from "./articleImageListUpload";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import ImgListDelete from "./deleteImageList";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxHeight: "100vh",
  bgcolor: "#bab4c2",
  boxShadow: 24,
  overflowY: "scroll",
  maxWidth: "100%",
  p: 4,
};
const ArticeImageList = ({ open, onClose, title }) => {
  const [add, setAdd] = useState(false);
  const [audioChecked, setAudioChecked] = useState(false);
  const [imageChecked, setImageChecked] = useState(false);
  const [videoChecked, setVideoChecked] = useState(false);
  const [accept, setAccept] = useState("");
  const [type, setType] = useState("");
  const handleAudioChange = (event) => {
    setAudioChecked(event.target.checked);
    setVideoChecked(false);
    setImageChecked(false);
    setAccept("audio/*");
    setType("audio");
  };
  const handleImageChange = (event) => {
    setImageChecked(event.target.checked);
    setVideoChecked(false);
    setAudioChecked(false);
    setAccept("image/*");
    setType("image");
  };
  const handleVideoChange = (event) => {
    setVideoChecked(event.target.checked);
    setAudioChecked(false);
    setImageChecked(false);
    setAccept("video/*");
    setType("video");
  };
  const [fileUpload, setFileUpload] = useState(false);
  const [enableTextInput, setEnableTextInput] = useState(true);
  const [completed, setCompleted] = useState(false);
  const handleAdd = () => {
    setAdd(true);
    setCompleted(false);
    // setFileUpload(true);
  };

  const documentName = title.split(" ").join("").toLowerCase();
  const [mediaName, setMediaName] = useState(null);
  const [refMediaName, setRefMediaName] = useState("");
  const refMediaNameSave = `${refMediaName}Name`;
  const refMediaNameType = `${refMediaName}Type`;
  const refMediaFileName = `${refMediaName}FileName`;
  const [loadMediaList, setLoadMediaList] = useState(false);
  const [article, setArticle] = useState({});
  const [mediaDisplayType, setMediaDisplayType] = useState([]);
  const [mediaDisplayName, setMediaDisplayName] = useState([]);
  const [mediaFIleName, setMediaFileName] = useState([]);
  const [mm, setMM] = useState();
  const docRef = doc(db, "articles", documentName);
  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      setArticle(doc.data());
      setMM(doc.data().MediaList);
    });
  }, []);

  //   let mediaList = article.MediaList;
  const [mediaList, setMediaList] = useState([]);

  useEffect(() => {
    if (open) {
      //   if (mediaList[0] === undefined) {
      setMediaList(() => [...mm]);
      //   }
    } else {
      setMediaList([]);
      setMediaName(null);
      setAudioChecked(false);
      setVideoChecked(false);
      setImageChecked(false);
      setEnableTextInput(true);
    }
  }, [open, mm]);

  const handleSave = async () => {
    setMediaList((arr) => [...arr, refMediaName]);
    // mediaList.push(refMediaName);
    try {
      const docRef = doc(collection(db, "articles"), documentName);
      await updateDoc(docRef, { MediaList: [...mediaList, refMediaName] });
      await setDoc(
        docRef,
        {
          [refMediaName]: null,
          [refMediaNameSave]: mediaName,
          [refMediaNameType]: null,
          [refMediaFileName]: null,
        },
        { merge: true }
      );
      toast.success("continue to upload media", {
        autoClose: 2000,
      });
      setEnableTextInput(false);
    } catch (error) {
      toast.error("error in initializing media, please try again", {
        autoClose: 2000,
      });
    }
  };
  const handleTextInputState = async () => {
    const index = mediaList.length - 1;
    const mediaToRemove = mediaList[index];
    const mediaRef = doc(collection(db, "articles"), documentName);
    setMediaList((arr) => arr.filter((media) => media !== mediaToRemove));
    await updateDoc(mediaRef, {
      [refMediaName]: deleteField(),
      [refMediaNameSave]: deleteField(),
      [refMediaNameType]: deleteField(),
      [refMediaFileName]: deleteField(),
    });
    toast.success("Enter Media Name", {
      autoClose: 2000,
    });
    setEnableTextInput(true);
    setFileUpload(true);
  };

  useEffect(() => {
    if (completed) {
      setMediaName(null);
      setAudioChecked(false);
      setVideoChecked(false);
      setImageChecked(false);
      setEnableTextInput(true);
    } else {
      if (
        (audioChecked && !enableTextInput) ||
        (videoChecked && !enableTextInput) ||
        (imageChecked && !enableTextInput)
      ) {
        setFileUpload(true);
      } else {
        setFileUpload(false);
      }
    }
  });
  useEffect(() => {
    if (mm !== undefined) {
      //   mm.map((media) => {
      setMediaDisplayName([]);
      setMediaDisplayType([]);
      setMediaFileName([]);
      mm.map((media) => {
        setMediaDisplayName((arr) => [...arr, `${media}Name`]);
        setMediaDisplayType((arr) => [...arr, `${media}Type`]);
        setMediaFileName((arr) => [...arr, `${media}FileName`]);
      });
      setLoadMediaList(true);

      //   });
    }
  }, [mm]);
  const [copied, setCopied] = useState(false);
  // console.log(mediaList);
  return (
    <Modal open={open} onClose={onClose} className="modalContainer">
      <Box sx={style}>
        <div className="mediaListCont">
          <button className="add-docs" onClick={handleAdd}>
            Add an Article
          </button>
          <div
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              position: "absolute",
              top: "10px",
              right: "10px",
            }}
            onClick={onClose}
          >
            X
          </div>
          {!completed && (
            <>
              <div>
                <p>
                  <i>choose media type</i>
                </p>
                <div className="mediaType">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={audioChecked}
                          onChange={handleAudioChange}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label="Audio"
                      labelPlacement="end"
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={imageChecked}
                          onChange={handleImageChange}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label="Image"
                      labelPlacement="end"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={videoChecked}
                          onChange={handleVideoChange}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label="Video"
                      labelPlacement="end"
                    />
                  </FormGroup>
                </div>
                <p>
                  <i>
                    before uploading the file enter a media name which is unique
                    to all other media names in this post
                  </i>
                </p>
                <div className="mediaName">
                  {enableTextInput ? (
                    <>
                      <Input
                        style={{ padding: "15px" }}
                        type="text"
                        autoFocus
                        required
                        value={mediaName}
                        placeholder="Add a title"
                        onChange={(e) => {
                          setMediaName(e.target.value);
                          if (mediaName) {
                            setRefMediaName(
                              e.target.value.split(" ").join("").toLowerCase()
                            );
                          }
                        }}
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
                        onClick={handleSave}
                        className="button"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <button
                      style={{
                        backgroundColor: "#755566",
                        padding: "5px 10px",
                        fontSize: "16px",
                        border: "none",
                        borderRadius: "4px",
                        color: "white",
                      }}
                      onClick={handleTextInputState}
                      className="button"
                    >
                      Enable Text Input
                    </button>
                  )}
                </div>
                {fileUpload && (
                  <AMediaUpload
                    setCompleted={setCompleted}
                    accept={accept}
                    docId={title}
                    collectionName="articles"
                    dir={`articlefiles/${documentName}`}
                    completed={completed}
                    ImgURL={refMediaName}
                    FileTypeName={`${refMediaName}Type`}
                    FileType={type}
                    FileName={`${refMediaName}FileName`}
                  />
                )}
              </div>
            </>
          )}
          {loadMediaList && (
            <div className="loadMediaCont">
              {mm.map((media, index) => (
                <div className="loadMedia">
                  {article[mediaDisplayType[index]] === "audio" && (
                    <div>
                      <audio controls preload="none">
                        <source src={article[media]} />
                        Your browser does not support the audio tag.
                      </audio>
                    </div>
                  )}
                  {article[mediaDisplayType[index]] === "image" && (
                    <div>
                      <img
                        src={article[media]}
                        alt={article[mediaDisplayName[index]]}
                      />
                    </div>
                  )}
                  {article[mediaDisplayType[index]] === "video" && (
                    <div>
                      <video
                        width="320"
                        height="240"
                        controls
                        preload="none"
                        controlsList="nodownload"
                      >
                        <source src={article[media]} />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                  <ImgListDelete
                    index={index}
                    refMediaName={media}
                    refMediaNameSave={mediaDisplayName[index]}
                    refMediaNameType={mediaDisplayType[index]}
                    refMediaFileName={mediaFIleName[index]}
                    toEditMediaList={mm}
                    fileId={article[mediaFIleName[index]]}
                    docId={documentName}
                    collectionName="articles"
                    dir={`articlefiles/${documentName}`}
                    // completed={completed}
                  />
                  <p>
                    {article[mediaDisplayName[index]]}
                    <br />
                    <CopyToClipboard
                      text={article[media]}
                      onCopy={() => {
                        setCopied(true);
                        setTimeout(() => {
                          setCopied(false);
                        }, 1500);
                        toast.success(
                          "Link Copied, proceed to add to your text editor",
                          {
                            autoClose: 2000,
                          }
                        );
                      }}
                    >
                      <button
                        style={{
                          backgroundColor: "#755566",
                          padding: "5px 10px",
                          fontSize: "16px",
                          border: "none",
                          borderRadius: "4px",
                          color: "white",
                          marginTop: "10px",
                        }}
                      >
                        {copied ? "copied" : "copy media link"}
                      </button>
                    </CopyToClipboard>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default ArticeImageList;
