import React from "react";
import { Container } from "@mui/material";
import WorkImagesList from "./imageList";
import GalleryUpload from "./upload";

const AdminWorkGallery = ({ view }) => {
  return (
    <Container
      maxWidth="lg"
      sx={{ textAlign: "center", mt: "3em", padding: 0 }}
    >
      <GalleryUpload />
      <WorkImagesList view={view} />
    </Container>
  );
};

export default AdminWorkGallery;
