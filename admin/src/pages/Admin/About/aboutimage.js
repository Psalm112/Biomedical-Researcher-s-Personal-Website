import "../../../styles/adminStyles/about/aExp.css";
import { useState, useEffect } from "react";
import { doc, collection, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase.js";
import ImgDelete from "./imgDelete";
import { CheckCircleOutline } from "@mui/icons-material";
import { Box, ImageListItem } from "@mui/material";
import React from "react";
import CircularProgressBar from "../Gallery/famGallery/progressList/CircularProgress";
// import { v4 as uuidv4 } from "uuid";
import uploadFileProgress from "../Gallery/firebase/UploadFileProgress";
import Iframe from "react-iframe";
import "../../../styles/adminStyles/adminImageStyle.css";
import { toast } from "react-toastify";
function AdAboutImg({
  collectionName,
  fileURL,
  Text,
  accept,
  alt,
  docName,
  dir,
  completed,
  subDir,
  ImgURL,
  ImgName,
  uploadCompleteStatus,
}) {
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFiles] = useState();
  const handleChange = (e) => {
    setFiles(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

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
            [uploadCompleteStatus]: true,
          };

          // const docRef = db.collection("about").doc("about");
          const docRef = doc(collection(db, collectionName), docName);
          await updateDoc(docRef, galleryDoc);
          setImageUrl(null);
          toast.success("File upload successful", {
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

  return (
    <div className="adminAbout" style={{ margin: "30px 0", padding: "0 10px" }}>
      <div className={`task`}>
        <div className="task__body adminImg">
          {/* <h2>About</h2> */}
          <h3 style={{ textAlign: "center" }}>{Text}</h3>
          {!completed ? (
            <input
              type="file"
              style={{ padding: 0 }}
              accept={accept}
              onChange={handleChange}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {accept === "image/*" ? (
                  <img
                    style={{
                      maxWidth: "350px",
                      maxHeight: "350px",
                    }}
                    src={fileURL}
                    alt={alt}
                  />
                ) : (
                  <Iframe
                    id="resume"
                    src={fileURL}
                    loading="lazy"
                    frameborder="0"
                    height="100%"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                )}
              </div>
              <ImgDelete
                ImgName={ImgName}
                ImgURL={ImgURL}
                docId={docName}
                dir={dir}
                collectionName={collectionName}
                fileId={subDir}
                uploadCompleteStatus={uploadCompleteStatus}
              />
            </div>
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
        </div>
      </div>
    </div>
  );
}

export default AdAboutImg;
