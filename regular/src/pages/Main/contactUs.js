import React, { useRef } from "react";
import "../../styles/generalStyles/ContactUs.css";
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
import Header from "../../components/header";
import ArticleShowcase from "../../components/articleshowcase";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import Helmet from "react-helmet";
// import { EmailJSResponseStatus } from "@emailjs/browser";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const ContactUs = () => {
  const form = useRef();
  const [loading, setLoading] = React.useState(false);
  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_jum2u9q",
        "template_1sfztpa",
        form.current,
        "4Gc4o1frdXiQQSTbs"
      )
      .then(
        (result) => {
          setLoading(false);
          toast.success("Message sent successfully.", {
            autoClose: 2000,
          });
          // console.log(result.text);
        },
        (error) => {
          setLoading(false);
          toast.error("Failed to send message, try again.", {
            autoClose: 2000,
          });
          // console.log(error.text);
        }
      );
  };
  const [contact, setContact] = useState({});
  const docRef = doc(db, "contact", "contactInfo");

  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      setContact(doc.data());
    });
  }, []);
  return (
    <div className="contactUsContainer">
      <Helmet>
        <title>Victor Oyebanji | Contact Me</title>
        <meta property="og:title" content="Victor Oyebanji | Contact Me" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={contact?.pageDescription} />
        <meta
          property="og:image"
          content={`${window.location.href}img/articleMeta.png`}
        />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:site_name" content="Victor Oyebanji" />
        <meta name="twitter:image:alt" content="Contact Me" />
        <meta name="description" content={contact?.pageDescription} />
        <meta name="keywords" content={contact?.pageKeywords} />
        <meta name="author" content="Victor Oyebanji" />
        <meta name="robots" content="index,follow,archive" />
      </Helmet>
      <Header Text="CONTACT ME" />
      <div className="contactUs">
        <div className="title">
          <h2>Get in Touch</h2>
        </div>
        <div className="box">
          <div className="contact form">
            <h3>Send a Message</h3>
            <form ref={form} onSubmit={sendEmail}>
              <div className="formBox">
                <div className="row50">
                  <div className="inputBox">
                    <span>First Name</span>
                    <input
                      required
                      type="text"
                      placeholder="John"
                      name="firstName"
                    />
                  </div>
                  <div className="inputBox">
                    <span>Last Name</span>
                    <input
                      required
                      type="text"
                      placeholder="Doe"
                      name="lastName"
                    />
                  </div>
                </div>

                <div className="row50">
                  <div className="inputBox">
                    <span>Email</span>
                    <input
                      required
                      type="email"
                      placeholder="johndoe@email.com"
                      name="user_email"
                    />
                  </div>
                  <div className="inputBox">
                    <span>Mobile </span>
                    <input
                      required
                      type="tel"
                      placeholder="+xxx 811 287 2331"
                      name="mobile"
                    />
                  </div>
                </div>

                <div className="row100">
                  <div className="inputBox">
                    <span>Message</span>
                    <textarea
                      required
                      placeholder="Write your message here..."
                      name="message"
                      // id=""
                      cols="30"
                      rows="10"
                    ></textarea>
                  </div>
                </div>

                <div className="row100">
                  <div className="inputBox">
                    <input type="submit" value="Send" />
                    {loading && (
                      <div
                        style={{ transition: "all 0.5" }}
                        class="loadingio-spinner-dual-ball-6f6i4htmxql"
                      >
                        <div class="ldio-35z73x4fita">
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="contact info">
            <h3>Contact Info</h3>
            <div className="infoBox">
              <div>
                <span>
                  <FontAwesomeIcon icon={faLocationDot} />
                </span>
                <p>{contact.address}</p>
              </div>
              <div>
                <span>
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </div>
              <div>
                <span>
                  <FontAwesomeIcon icon={faSquarePhone} />
                </span>
                <a href={`tel:${contact.phoneNumber}`}>{contact.phoneNumber}</a>
              </div>
              <ul className="sci">
                <li>
                  <a href={contact.facebook}>
                    <FontAwesomeIcon icon={faFacebookSquare} />
                  </a>
                </li>
                <li>
                  <a href={contact.twitter}>
                    <FontAwesomeIcon icon={faTwitterSquare} />
                  </a>
                </li>
                <li>
                  <a href={contact.linkedin}>
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </li>
                <li>
                  <a href={contact.instagram}>
                    <FontAwesomeIcon icon={faInstagramSquare} />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            className="contact map"
            dangerouslySetInnerHTML={{ __html: contact.map }}
          ></div>
        </div>
      </div>
      <ArticleShowcase />
    </div>
  );
};

export default ContactUs;
