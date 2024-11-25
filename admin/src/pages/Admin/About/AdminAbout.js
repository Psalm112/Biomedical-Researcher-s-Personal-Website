import { React, useState, useEffect } from "react";
// import Paper from "@mui/material/Paper";
import AExpManager from "./aExpManager";
import AdAbout from "./About";
import Divider from "@mui/material/Divider";
import AdAboutImg from "./aboutimage";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase.js";
import Meta from "../meta";
const AdminAbout = () => {
  return (
    <div>
      <Meta collectionName="about" docName="about" />
      <AdAbout />
      <AboutImg />
      <ResumeFile />
      <Divider />
      <div>
        <AExpManager />
      </div>
    </div>
  );
};

const AboutImg = () => {
  const [about, setAbout] = useState({});
  const docRef = doc(db, "about", "about");

  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      setAbout(doc.data());
    });
  }, []);
  const fileName = about.aboutImgName;
  const completed = about.uploadCompleteStatus;
  return (
    <>
      <AdAboutImg
        collectionName="about"
        fileURL={about.aboutImgURL}
        Text="About page Image"
        accept="image/*"
        alt={about.aboutImgName}
        docName="about"
        dir="aboutFiles"
        completed={completed}
        subDir={fileName}
        ImgURL="aboutImgURL"
        ImgName="aboutImgName"
        uploadCompleteStatus="uploadCompleteStatus"
      />
    </>
  );
};

const ResumeFile = () => {
  const [about, setAbout] = useState({});
  const docRef = doc(db, "about", "about");

  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      setAbout(doc.data());
    });
  }, []);
  const fileName = about.resumeFileName;
  const completed = about.resumeUploadStatus;
  return (
    <>
      <AdAboutImg
        collectionName="about"
        fileURL={about.resumeURL}
        Text="Resume"
        accept=".pdf"
        docName="about"
        dir="aboutFiles"
        completed={completed}
        subDir={fileName}
        ImgURL="resumeURL"
        ImgName="resumeFileName"
        uploadCompleteStatus="resumeUploadStatus"
      />
    </>
  );
};
export default AdminAbout;
