import React, { useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { format } from "date-fns";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
// import required modules
import { FreeMode } from "swiper";
import "../../../styles/generalStyles/about/Exp.css";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

function ExpMini() {
  const [experiences, setExperiences] = useState([]);

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const q = query(
      collection(db, "experiences"),
      orderBy("startDate", "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      setExperiences(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  // console.log(experiences);
  return (
    <div className="expMobile">
      {experiences.map((exp) => (
        <div className="expDiv">
          {exp.data.completed ? (
            <p className="expDate">
              {`${format(
                new Date(exp.data.startDate.toDate()),
                "MMM yyyy"
              )} - ${format(new Date(exp.data.endDate.toDate()), "MMM yyyy")}`}
            </p>
          ) : (
            <p className="expDate">
              {format(new Date(exp.data.startDate.toDate()), "MMM yyyy")}
            </p>
          )}
          <div className="expDivCircle">
            <div className="expLine"></div>
            <div className="expCircle">
              <p className="expDesc">{exp.data.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ExpLarge() {
  const [experiences, setExperiences] = useState([]);

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const q = query(
      collection(db, "experiences"),
      orderBy("startDate", "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      setExperiences(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={0}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode]}
      className="mySwiper"
    >
      {experiences.map((exp) => (
        <SwiperSlide>
          <div className="expDiv">
            {exp.data.completed ? (
              <p className="expDate">
                {`${format(
                  new Date(exp.data.startDate.toDate()),
                  "MMM yyyy"
                )} - ${format(
                  new Date(exp.data.endDate.toDate()),
                  "MMM yyyy"
                )}`}
              </p>
            ) : (
              <p className="expDate">
                {format(new Date(exp.data.startDate.toDate()), "MMM yyyy")}
              </p>
            )}
            <div className="expDivCircle">
              <div className="expLine"></div>
              <div className="expCircle">
                <p className="expDesc">{exp.data.description}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

const Experience = () => {
  if (window.innerWidth < 900) {
    return (
      <div className="exp">
        <div className="exph3">
          <h2>Experience Roadmap</h2>
        </div>
        <ExpMini />;
      </div>
    );
  } else {
    return (
      <div className="exp">
        <div className="exph3">
          <h2>Experience Roadmap</h2>
        </div>
        <ExpLarge />;
      </div>
    );
  }
};

export default Experience;
