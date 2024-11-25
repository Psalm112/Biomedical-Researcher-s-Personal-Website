import { React, useState, useEffect } from "react";
import AdHome from "./Home";
import AdAboutImg from "../About/aboutimage";
import TestimonyManager from "./testimonyManager";
import Divider from "@mui/material/Divider";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase.js";
import ArticleAboutTxt from "../Article/articleAboutTxt";
import Meta from "../meta";

const AdminHome = () => {
  const [quality, setQuality] = useState({});
  const docRef = doc(db, "home", "qualities");

  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      setQuality(doc.data());
    });
  }, []);
  return (
    <div>
      <Meta collectionName="home" docName="info" />
      <AdHome />
      <HeaderImg />
      <AboutMeImg />
      <Divider sx={{ borderBottomWidth: "3px" }} />
      <p style={{ textAlign: "center" }}>QUALITIES</p>
      <div className="textManagementCont">
        <Quality1 />
        <ArticleAboutTxt
          text={quality.quality1}
          collectionName="home"
          docName="qualities"
          field="quality1desc"
          home="true"
          field2="quality1"
        />
      </div>
      <div className="textManagementCont">
        <Quality2 />
        <ArticleAboutTxt
          text={quality.quality2}
          collectionName="home"
          docName="qualities"
          field="quality2desc"
          home="true"
          field2="quality2"
        />
      </div>
      <div className="textManagementCont">
        <Quality3 />
        <ArticleAboutTxt
          text={quality.quality3}
          collectionName="home"
          docName="qualities"
          field="quality3desc"
          home="true"
          field2="quality3"
        />
      </div>
      <Divider sx={{ borderBottomWidth: "3px" }} />
      <TestimonyManager />
    </div>
  );
};

const HeaderImg = () => {
  const [home, setHome] = useState({});
  const docRef = doc(db, "home", "info");

  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      setHome(doc.data());
    });
  }, []);
  const fileName = home.headerImgName;
  const completed = home.headeruploadStatus;
  return (
    <>
      <AdAboutImg
        collectionName="home"
        fileURL={home.headerImgURL}
        Text="Header Image"
        accept="image/*"
        alt={fileName}
        docName="info"
        dir="aboutFiles"
        completed={completed}
        subDir={fileName}
        ImgURL="headerImgURL"
        ImgName="headerImgName"
        uploadCompleteStatus="headeruploadStatus"
      />
    </>
  );
};

const AboutMeImg = () => {
  const [home, setHome] = useState({});
  const docRef = doc(db, "home", "info");

  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      setHome(doc.data());
    });
  }, []);
  const fileName = home.aboutMeImgName;
  const completed = home.aboutMeUploadStatus;
  return (
    <>
      <AdAboutImg
        collectionName="home"
        fileURL={home.aboutMeImgURL}
        Text="AboutMe Section Image"
        accept="image/*"
        alt={home.aboutMeImgName}
        docName="info"
        dir="aboutFiles"
        completed={completed}
        subDir={fileName}
        ImgURL="aboutMeImgURL"
        ImgName="aboutMeImgName"
        uploadCompleteStatus="aboutMeUploadStatus"
      />
    </>
  );
};

const Quality1 = () => {
  const [quality, setQuality] = useState({});
  const docRef = doc(db, "home", "qualities");

  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      setQuality(doc.data());
    });
  }, []);
  const fileName = quality.quality1ImgName;
  const completed = quality.quality1UploadStatus;
  return (
    <>
      <AdAboutImg
        collectionName="home"
        fileURL={quality.quality1Img}
        Text="Quality 1"
        accept="image/*"
        alt=""
        docName="qualities"
        dir="homefiles/qualities"
        completed={completed}
        subDir={fileName}
        ImgURL="quality1Img"
        ImgName="quality1ImgName"
        uploadCompleteStatus="quality1UploadStatus"
      />
    </>
  );
};

const Quality2 = () => {
  const [quality, setQuality] = useState({});
  const docRef = doc(db, "home", "qualities");

  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      setQuality(doc.data());
    });
  }, []);
  const fileName = quality.quality2ImgName;
  const completed = quality.quality2UploadStatus;
  return (
    <>
      <AdAboutImg
        collectionName="home"
        fileURL={quality.quality2Img}
        Text="Quality 2"
        accept="image/*"
        alt=""
        docName="qualities"
        dir="homefiles/qualities"
        completed={completed}
        subDir={fileName}
        ImgURL="quality2Img"
        ImgName="quality2ImgName"
        uploadCompleteStatus="quality2UploadStatus"
      />
    </>
  );
};

const Quality3 = () => {
  const [quality, setQuality] = useState({});
  const docRef = doc(db, "home", "qualities");

  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      setQuality(doc.data());
    });
  }, []);
  const fileName = quality.quality3ImgName;
  const completed = quality.quality3UploadStatus;
  return (
    <>
      <AdAboutImg
        collectionName="home"
        fileURL={quality.quality3Img}
        Text="Quality 3"
        accept="image/*"
        alt=""
        docName="qualities"
        dir="homefiles/qualities"
        completed={completed}
        subDir={fileName}
        ImgURL="quality3Img"
        ImgName="quality3ImgName"
        uploadCompleteStatus="quality3UploadStatus"
      />
    </>
  );
};
export default AdminHome;
