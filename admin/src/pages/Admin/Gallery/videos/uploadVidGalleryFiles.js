import { useState, useEffect } from "react";
import { doc, collection, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { CheckCircleOutline } from "@mui/icons-material";
import { Box, ImageListItem } from "@mui/material";
import React from "react";
import CircularProgressBar from "../famGallery/progressList/CircularProgress";
// import { v4 as uuidv4 } from "uuid";
import uploadFileProgress from "../firebase/UploadFileProgress";
import { toast } from "react-toastify";

function VidFileUpload({
  Text,
  accept,
  completed,
  setCompleted,
  docId,
  dir,
  ImgURL,
  collectionName,
  ImgName,
}) {
  // const fileRef = useRef();
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFiles] = useState();
  // const handleClick = () => {
  //   fileRef.current.click();
  // };
  const handleChange = (e) => {
    setFiles(e.target.files[0]);
    // fileRef.current.value = null;
    if (e.target.files.length !== 0) {
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };
  const documentName = docId.split(" ").join("").toLowerCase();
  //   const collect = "about";
  //   const [fileName, setFileName] = useState(null);

  const [progress, setProgress] = useState(100);
  useEffect(() => {
    const uploadFile = async () => {
      //   const imageName = uuidv4() + "." + file.name.split(".").pop();
      //   setFileName(file.name);
      if (file) {
        try {
          const url = await uploadFileProgress(
            file,
            dir,
            file.name,
            setProgress
          );
          const galleryDoc = {
            [ImgURL]: url,
            [ImgName]: file.name,
          };

          // const docRef = db.collection("about").doc("about");
          // addDocument("videogallery", galleryDoc, documentName);
          const docRef = doc(collection(db, collectionName), documentName);
          await updateDoc(docRef, galleryDoc);
          setImageUrl(null);
          setCompleted(true);
          toast.success("file upload completed", {
            autoClose: 2000,
          });
        } catch (error) {
          toast.error("error while uploading file, try again", {
            autoClose: 2000,
          });
        }
      }
    };
    // setImageUrl(URL.createObjectURL(fileName));
    uploadFile();
  }, [file]);
  /* function to update document in firestore */

  return (
    <>
      {!completed && (
        <>
          <label>{Text}</label>
          {/* <label htmlFor="contained-button-file"> */}
          <input
            id="contained-button-file"
            type="file"
            style={{ padding: 0 }}
            accept={accept}
            onChange={handleChange}
          />
        </>
      )}
      {imageUrl && (
        <ImageListItem cols={1} rows={1}>
          <img src={imageUrl} alt="gallery" loading="lazy" />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.5)",
            }}
          >
            {progress < 100 ? (
              <CircularProgressBar value={progress} />
            ) : (
              <CheckCircleOutline
                sx={{ width: 60, height: 60, color: "lightgreen" }}
              />
            )}
          </Box>
        </ImageListItem>
      )}
    </>
  );
}

export default VidFileUpload;
