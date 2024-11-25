import React, { useEffect } from "react";
import FamGallery from "./Gallerylist/famGallery";
import WorkGallery from "./Gallerylist/workGallery";
import "../../../styles/generalStyles/GalleryList.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Header from "../../../components/header";
import VidGallery from "./Gallerylist/vidGallery";
import Helmet from "react-helmet";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Gallery() {
  const [value, setValue] = React.useState(0);
  const [gallery, setGallery] = React.useState({});
  const docRef = doc(db, "gallery", "info");
  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      setGallery(doc.data());
    });
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const view = window.innerWidth;
  useEffect(() => {
    const body = document.body;
    body.style.backgroundColor = "#f5f6fa";
  }, []);
  return (
    <div className="galleryCont">
      <Header Text="Gallery" />
      <Helmet>
        <title>Victor Oyebanji | Gallery</title>
        <meta property="og:title" content="Victor Oyebanji | Gallery" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={gallery?.pageDescription} />
        <meta
          property="og:image"
          content={`${window.location.href}img/articleMeta.png`}
        />
        <meta property="og:url" content={window?.location.href} />
        <meta property="og:site_name" content="Victor Oyebanji" />
        <meta name="twitter:image:alt" content="Gallery" />
        <meta name="description" content={gallery?.pageDescription} />
        <meta name="keywords" content={gallery?.pageKeywords} />
        <meta name="author" content="Victor Oyebanji" />
        <meta name="robots" content="index,follow,archive" />
      </Helmet>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            //   aria-label="basic tabs example"
            centered
            style={{ position: "sticky" }}
          >
            <Tab
              label={
                view <= 480 ? (
                  <>
                    Family
                    <br />
                    and Friends
                  </>
                ) : (
                  <>Family and Friends</>
                )
              }
              {...a11yProps(0)}
              wrapped
              // style={{ width: "100%" }}
            />
            <Tab
              label={
                view <= 480 ? (
                  <>
                    Word
                    <br />
                    and Research
                  </>
                ) : (
                  <>Work and Research</>
                )
              }
              {...a11yProps(1)}
              wrapped
            />
            <Tab label="Videos" {...a11yProps(2)} wrapped />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <FamGallery view={view} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <WorkGallery view={view} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <VidGallery view={view} />
        </TabPanel>
      </Box>
    </div>
  );
}
