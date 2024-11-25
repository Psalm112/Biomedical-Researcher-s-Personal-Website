import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { ImageListItemBar } from "@mui/material";
import useFirestore from "../useFirestore";
import FsLightbox from "fslightbox-react";
import { useState, useEffect } from "react";
import "../../../../styles/generalStyles/GalleryList.css";
import { PlayCircleOutline } from "@mui/icons-material";

export default function VidGallery({ view }) {
  const { documents } = useFirestore("videogallery");
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
  const [customAtt, setCustomAtt] = useState([]);
  useEffect(() => {
    if (documents) {
      documents.map((item) => {
        setGallery((arr) => [...arr, item?.data?.videoURL]);
        setCustomAtt((arr) => [...arr, { controlslist: "nodownload" }]);
      });
    }
  }, [documents]);
  const [col, setCol] = useState();
  useEffect(() => {
    if (view <= 540) {
      setCol(1);
    } else if (view <= 900) {
      setCol(2);
    } else {
      setCol(3);
    }
  }, []);
  return (
    <>
      <ImageList cols={col} style={{ overflowY: "visible" }}>
        {documents.map((item, index) => (
          <ImageListItem
            className="vidList"
            key={item?.id}
            onClick={() => openLightboxOnSlide(index + 1)}
            sx={{
              opacity: ".7",
              transition: "opacity .3s linear",
              cursor: "pointer",
              "&:hover": { opacity: 1 },
            }}
          >
            <PlayCircleOutline
              className="play-icon"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -30%)",
                opacity: 0,
                fontSize: "150px",
                transition: "transform 1s, opacity 0.5s",
              }}
            />
            <img
              src={`${item?.data?.thumbnailURL}?w=248&fit=crop&auto=format`}
              srcSet={`${item?.data?.thumbnailURL}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item?.data?.title}
              loading="lazy"
            />
            <ImageListItemBar title={item?.data?.title} />
          </ImageListItem>
        ))}
        <FsLightbox
          toggler={lightboxController.toggler}
          sources={gallery}
          type="video"
          customAttributes={customAtt}
          slide={lightboxController.slide}
        />
      </ImageList>
    </>
  );
}
