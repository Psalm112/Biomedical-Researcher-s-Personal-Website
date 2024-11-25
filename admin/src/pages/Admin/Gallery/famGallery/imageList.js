import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Option from "./option";
import useFirestore from "../firebase/useFirestore";
import { useEffect, useState } from "react";
import { ImageListItemBar } from "@mui/material";
import FsLightbox from "fslightbox-react";
import "../../../../styles/generalStyles/GalleryList.css";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}
export default function FamImagesList({ view }) {
  const { documents } = useFirestore("famgallery");
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
  const [pattern, setPattern] = useState([]);
  const [hei, setHei] = useState();
  const [col, setCol] = useState();
  useEffect(() => {
    if (view <= 540) {
      setPattern((arr) => [...arr, ...patternMini]);
      setHei(100);
      setCol(2);
    } else {
      setPattern((arr) => [...arr, ...patternMax]);
      setHei(200);
      setCol(4);
    }
  }, []);

  return (
    <>
      <ImageList
        variant="quilted"
        cols={col}
        rowHeight={hei}
        gap={5}
        style={{ position: "relative", overflowY: "visible" }}
      >
        {documents.map((item, index) => (
          <ImageListItem
            key={item?.id}
            cols={
              pattern[
                index - Math.floor(index / pattern.length) * pattern.length
              ].cols
            }
            rows={
              pattern[
                index - Math.floor(index / pattern.length) * pattern.length
              ].rows
            }
            sx={{
              opacity: ".7",
              transition: "opacity .3s linear",
              cursor: "pointer",
              "&:hover": { opacity: 1 },
            }}
          >
            <Option imageId={item?.id} />

            <img
              {...srcset(
                item?.data?.imageURL,
                hei,
                pattern[
                  index - Math.floor(index / pattern.length) * pattern.length
                ].rows,
                pattern[
                  index - Math.floor(index / pattern.length) * pattern.length
                ].cols
              )}
              alt={item?.data?.title}
              loading="lazy"
              onClick={() => openLightboxOnSlide(index + 1)}
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
}

const patternMini = [
  {
    rows: 3,
    cols: 2,
  },
  {
    rows: 2,
    cols: 1,
  },
  {
    rows: 2,
    cols: 1,
  },
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 3,
    cols: 2,
  },
  {
    rows: 2,
    cols: 1,
  },
  {
    rows: 2,
    cols: 1,
  },
  {
    rows: 2,
    cols: 2,
  },
];

const patternMax = [
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 2,
  },
  {
    rows: 1,
    cols: 2,
  },
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
];
