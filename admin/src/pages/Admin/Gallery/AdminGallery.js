import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AdminFamGallery from "./famGallery/adminFamGallery";
import AdminWorkGallery from "./workGallery/adminWorkGallery";
import AdminVideoGallery from "./videos/adminVideoGallery";
import "../../../styles/generalStyles/GalleryList.css";
import Meta from "../meta";

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

export default function AdminGallery() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const view = window.innerWidth;
  return (
    <div className="adminGalleryCont">
      <Box sx={{ width: "100%" }}>
        <Meta collectionName="gallery" docName="info" />
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
          <AdminFamGallery view={view} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AdminWorkGallery view={view} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AdminVideoGallery view={view} />
        </TabPanel>
      </Box>
    </div>
  );
}
