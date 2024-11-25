import React, { useRef, useState, useEffect } from "react";
import "../styles/componentStyles/Contact.css";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = React.useState(false);
  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_jum2u9q",
        "template_alkxax5",
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
  // const placeHolder = (e) => {
  //   e.target.placeholder = "";
  // };
  const [contact, setContact] = useState({});
  const docRef = doc(db, "contact", "contactInfo");

  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      setContact(doc.data());
    });
  }, []);

  const [messageInput, setMessageInput] = useState("");
  const [contactInput, setContactInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const clearForm = () => {
    setMessageInput("");
    setContactInput("");
    setNameInput("");
    setEmailInput("");
  };
  // console.log(loading);
  return (
    <div className="contactMiniCont">
      <form
        ref={form}
        onSubmit={sendEmail}
        id="contact"
        className="contactmini screen"
      >
        {loading && (
          <div
            style={{
              marginTop: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div class="loadingio-spinner-disk-rp08ymjc79">
              <div class="ldio-ylfsz5dvqrt">
                <div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          className="screen-body"
          style={
            loading && window.innerWidth <= 500
              ? { paddingTop: "10px", transition: "all 0.5s" }
              : {
                  transition: "all 0.5s",
                }
          }
        >
          <div
            className="screen-body-item left"
            style={
              loading
                ? { paddingTop: "10px", transition: "all 0.5s" }
                : {
                    transition: "all 0.5s",
                  }
            }
          >
            <div className="app-title">
              <span>CONTACT</span>
              <span>ME</span>
            </div>
            <div className="app-contact">
              CONTACT INFO : {contact.phoneNumber}
            </div>
          </div>
          <div
            className="screen-body-item"
            style={
              loading && window.innerWidth > 500
                ? { paddingTop: "10px", transition: "all 0.5s" }
                : {
                    transition: "all 0.5s",
                  }
            }
          >
            <div className="app-form">
              <div className="app-form-group">
                <input
                  className="app-form-control"
                  placeholder="NAME"
                  name="user_name"
                  required
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  // onClick={placeHolder}
                />
              </div>
              <div className="app-form-group">
                <input
                  className="app-form-control"
                  placeholder="EMAIL"
                  name="user_email"
                  required
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  // onClick={placeHolder}
                />
              </div>
              <div className="app-form-group">
                <input
                  className="app-form-control"
                  placeholder="MOBILE NO."
                  name="contact"
                  required
                  type="tel"
                  value={contactInput}
                  onChange={(e) => setContactInput(e.target.value)}
                  // onClick={placeHolder}
                />
              </div>
              <div className="app-form-group message">
                <textarea
                  className="app-form-control"
                  placeholder="MESSAGE"
                  name="message"
                  required
                  style={{
                    fontWeight: 700,
                    letterSpacing: "1.4px",
                    fontFamily: "Arial",
                    height: "55px",
                  }}
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  // onClick={placeHolder}
                ></textarea>
              </div>
              <div className="app-form-group buttons">
                <Button
                  onClick={clearForm}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                >
                  CLEAR
                </Button>
                {/* <button className="app-form-button">SEND</button> */}
                <Button
                  type="submit"
                  className="sendButton"
                  variant="outlined"
                  endIcon={<SendIcon />}
                >
                  SEND
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Contact;
