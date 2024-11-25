import React from "react";
import { Container } from "@mui/material";
import VideoList from "./videoList";
import GalleryUpload from "./upload";

const AdminVideoGallery = ({ view }) => {
  return (
    <Container maxWidth="lg" sx={{ textAlign: "center", mt: "3em" }}>
      <GalleryUpload />
      <VideoList view={view} />
    </Container>
  );
};

export default AdminVideoGallery;
