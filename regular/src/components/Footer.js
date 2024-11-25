import * as React from "react";
import { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagramSquare,
  faTwitterSquare,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import "../styles/componentStyles/footer.css";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const Copyright = () => {
  return (
    <div>
      <Typography variant="body2" color="text.secondary">
        {"Copyright © "}
        <Link color="inherit" href="https://wa.me/2347012765766">
          Aplus Designs
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
};

const Footer = () => {
  const [contact, setContact] = useState({});
  const sciRef = doc(db, "contact", "contactInfo");

  useEffect(() => {
    onSnapshot(sciRef, (doc) => {
      setContact(doc.data());
    });
  }, []);
  return (
    <div className="footer">
      <Box
        sx={{
          margin: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CssBaseline />
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm" className="footerContainer">
            <Typography className="footerEle footerLinks" variant="body1">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </Typography>
            <Typography className="footerSocials footerEle" variant="body1">
              <li>
                <a href={contact.facebook} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faFacebookSquare} />
                </a>
              </li>
              <li>
                <a href={contact.instagram} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faInstagramSquare} />
                </a>
              </li>
              <li>
                <a href={contact.twitter} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faTwitterSquare} />
                </a>
              </li>
              <li>
                <a href={contact.linkedin} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </li>
            </Typography>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </div>
  );
};

export default Footer;
