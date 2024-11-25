import "../../../styles/adminStyles/about/aExp.css";
import ContactItem from "./contactItem";
import EditContact from "./editContact";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
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
import { db } from "../../../firebase.js";

function AdContact() {
  //   const [checked, setChecked] = useState(completed);
  const [contact, setContact] = useState({});
  const docRef = doc(db, "contact", "contactInfo");

  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      setContact(doc.data());
    });
  }, []);

  return (
    <div className="adminAbout" style={{ margin: "30px 0", padding: "0 10px" }}>
      <div className={`task`}>
        <div className="task__body">
          <h2 style={{ textAlign: "center" }}>Contact Info</h2>
          <div
            style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
          >
            <span style={{ alignSelf: "flex-end", marginRight: "10px" }}>
              <FontAwesomeIcon icon={faLocationDot} />
            </span>
            <p style={{ display: "inline-block" }}>
              <a href={contact.address}>{contact.address}</a>
            </p>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
          >
            <span style={{ alignSelf: "flex-end", marginRight: "10px" }}>
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <p style={{ display: "inline-block" }}>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
          >
            <span style={{ alignSelf: "flex-end", marginRight: "10px" }}>
              <FontAwesomeIcon icon={faSquarePhone} />
            </span>
            <p style={{ display: "inline-block" }}>
              <a href={`tel:${contact.phoneNumber}`}>{contact.phoneNumber}</a>
            </p>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
          >
            <span style={{ alignSelf: "flex-end", marginRight: "10px" }}>
              <FontAwesomeIcon icon={faFacebookSquare} />
            </span>
            <p style={{ display: "inline-block" }}>
              <a href={contact.facebook}>{contact.facebook}</a>
            </p>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
          >
            <span style={{ alignSelf: "flex-end", marginRight: "10px" }}>
              <FontAwesomeIcon icon={faInstagramSquare} />
            </span>
            <p style={{ display: "inline-block" }}>
              <a href={contact.instagram}>{contact.instagram}</a>
            </p>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
          >
            <span style={{ alignSelf: "flex-end", marginRight: "10px" }}>
              <FontAwesomeIcon icon={faTwitterSquare} />
            </span>
            <p style={{ display: "inline-block" }}>
              <a href={contact.twitter}>{contact.twitter}</a>
            </p>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
          >
            <span style={{ alignSelf: "flex-end", marginRight: "10px" }}>
              <FontAwesomeIcon icon={faLinkedin} />
            </span>
            <p style={{ display: "inline-block" }}>
              <a href={contact.linkedin}>{contact.linkedin}</a>
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              position: "relative",
              marginTop: "15px",
            }}
          >
            <span style={{ alignSelf: "flex-start", marginRight: "10px" }}>
              <FontAwesomeIcon icon={faLocationDot} />
            </span>
            <div
              className="mapcont"
              style={{
                maxWidth: "100%",
                height: "300px",
                flexGrow: 1,
              }}
              dangerouslySetInnerHTML={{ __html: contact.map }}
            ></div>
          </div>
          <div className="task__buttons">
            <div className="task__deleteNedit">
              <EditContact
                toEditEmail={contact.email}
                toEditAddress={contact.address}
                toEditTel={contact.phoneNumber}
                toEditFacebook={contact.facebook}
                toEditTwitter={contact.twitter}
                toEditInstagram={contact.instagram}
                toEditLinkedin={contact.linkedin}
                toEditMap={contact.map}
              />
            </div>
            <ContactItem
              address={contact.address}
              email={contact.email}
              phoneNumber={contact.phoneNumber}
              facebook={contact.facebook}
              instagram={contact.instagram}
              twitter={contact.twitter}
              linkedin={contact.linkedin}
              map={contact.map}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdContact;
