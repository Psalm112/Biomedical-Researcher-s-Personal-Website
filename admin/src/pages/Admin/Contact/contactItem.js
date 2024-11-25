import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagramSquare,
  faTwitterSquare,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faLocationDot,
  faEnvelope,
  faSquarePhone,
} from "@fortawesome/free-solid-svg-icons";
import "../../../styles/adminStyles/about/expItem.css";
import Mod from "../Modal.js";
import { useState } from "react";

function ContactItem({
  address,
  email,
  phoneNumber,
  facebook,
  instagram,
  twitter,
  linkedin,
  map,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <button onClick={handleOpen}>View</button>
      <Mod modalLable="About" onClose={handleClose} open={open}>
        <div className="taskItem">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              <FontAwesomeIcon icon={faLocationDot} />
            </span>
            <p style={{ display: "inline-block" }}>
              <a href={address}>{address}</a>
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <p style={{ display: "inline-block" }}>
              <a href={`mailto:${email}`}>{email}</a>
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              <FontAwesomeIcon icon={faSquarePhone} />
            </span>
            <p style={{ display: "inline-block" }}>
              <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              <FontAwesomeIcon icon={faFacebookSquare} />
            </span>
            <p style={{ display: "inline-block" }}>
              <a href={facebook}>{facebook}</a>
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              <FontAwesomeIcon icon={faInstagramSquare} />
            </span>
            <p style={{ display: "inline-block" }}>
              <a href={instagram}>{instagram}</a>
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              <FontAwesomeIcon icon={faTwitterSquare} />
            </span>
            <p style={{ display: "inline-block" }}>
              <a href={twitter}>{twitter}</a>
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              <FontAwesomeIcon icon={faLinkedin} />
            </span>
            <p style={{ display: "inline-block" }}>
              <a href={linkedin}>{linkedin}</a>
            </p>
          </div>
          <div
            className="mapcont"
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              position: "relative",
              justifyContent: "center",
              maxWidth: "100%",
              height: "300px",
            }}
            dangerouslySetInnerHTML={{ __html: map }}
          ></div>
        </div>
      </Mod>
    </>
  );
}

export default ContactItem;
