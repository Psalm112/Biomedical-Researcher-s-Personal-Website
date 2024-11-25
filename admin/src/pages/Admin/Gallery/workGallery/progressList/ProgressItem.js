import { CheckCircleOutline } from "@mui/icons-material";
import { Box, ImageListItem } from "@mui/material";
import React, { useEffect } from "react";
import CircularProgressBar from "./CircularProgress";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import uploadFileProgress from "../../firebase/UploadFileProgress";
import addDocument from "../../firebase/addDocument";
import { toast } from "react-toastify";

const ProgressItem = ({ file }) => {
  const [progress, setProgress] = useState(100);
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    const uploadImage = async () => {
      const imageName = uuidv4() + "." + file.name.split(".").pop();
      const fileTitle = file.name.split(".")[0];
      try {
        const url = await uploadFileProgress(
          file,
          `workgallery`,
          imageName,
          setProgress
        );
        const galleryDoc = {
          imageURL: url,
          title: fileTitle,
        };
        await addDocument("workgallery", galleryDoc, imageName);
        setImageUrl(null);
        toast.success("image upload successful", {
          autoClose: 2000,
        });
      } catch (error) {
        toast.error("image upload unsuccessful, try again", {
          autoClose: 2000,
        });
      }
    };
    setImageUrl(URL.createObjectURL(file));
    uploadImage();
  }, [file]);
  //   console.log(imageUrl);
  return (
    imageUrl && (
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
    )
  );
};

export default ProgressItem;
