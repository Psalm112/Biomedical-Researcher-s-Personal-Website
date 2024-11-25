import React from "react";
import { Container } from "@mui/material";
import FamImagesList from "./imageList";
import GalleryUpload from "./upload";

const AdminFamGallery = ({ view }) => {
  return (
    <Container
      maxWidth="lg"
      sx={{ textAlign: "center", mt: "3em", padding: 0 }}
    >
      <GalleryUpload />
      <p>
        <i>
          save the image to be uploaded with what you would like to appear as
          its description
        </i>
      </p>
      <FamImagesList view={view} />
    </Container>
  );
};

export default AdminFamGallery;
