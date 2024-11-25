import { React, useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import useFirestore from "../useFirestore";
import { ImageListItemBar } from "@mui/material";
import FsLightbox from "fslightbox-react";

const WorkGallery = ({ view }) => {
  const { documents } = useFirestore("workgallery");
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });

  function openLightboxOnSlide(number) {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: number,
    });
  }
  const [gallery, setGallery] = useState([]);
  useEffect(() => {
    if (documents) {
      documents.map((item) =>
        setGallery((arr) => [...arr, item?.data?.imageURL])
      );
    }
  }, [documents]);
  const [col, setCol] = useState();
  useEffect(() => {
    if (view <= 420) {
      setCol(1);
    } else if (view <= 900) {
      setCol(2);
    } else {
      setCol(3);
    }
  }, []);

  return (
    <>
      <ImageList
        variant="masonry"
        cols={col}
        // gap={8}
        style={{ overflowY: "visible" }}
      >
        {documents.map((item, index) => (
          <ImageListItem
            key={item?.id}
            onClick={() => openLightboxOnSlide(index + 1)}
            sx={{
              opacity: ".7",
              transition: "opacity .3s linear",
              cursor: "pointer",
              "&:hover": { opacity: 1 },
            }}
          >
            <img
              src={`${item?.data?.imageURL}?w=248&fit=crop&auto=format`}
              srcSet={`${item?.data?.imageURL}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item?.data?.title}
              loading="lazy"
            />
            <ImageListItemBar
              // position="below"
              title={item?.data?.title}
              style={{ color: "#111101" }}
            />
          </ImageListItem>
        ))}
        <FsLightbox
          toggler={lightboxController.toggler}
          sources={gallery}
          type="image"
          slide={lightboxController.slide}
        />
      </ImageList>
    </>
  );
};

export default WorkGallery;
