import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.js";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../styles/componentStyles/Testimonies.css";

// import required modules
import { Parallax, Pagination, Navigation } from "swiper";

const Testimony = () => {
  const [testimonies, setTestimonies] = useState([]);

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const q = query(collection(db, "testimonies"), orderBy("created", "desc"));
    onSnapshot(q, (querySnapshot) => {
      setTestimonies(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  return (
    <div className="tesSwiperContainer">
      <h2>Testimonials</h2>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation]}
        className="mySwiper"
      >
        <div
          slot="container-start"
          className="parallax-bg"
          data-swiper-parallax="-23%"
        ></div>
        {testimonies.map((testi) => (
          <SwiperSlide>
            <div className="swiperswiper">
              <div className="title" data-swiper-parallax="-300">
                {testi.data.name}
              </div>
              <div className="subtitle" data-swiper-parallax="-200">
                {testi.data.occupation}
              </div>
              <div className="text" data-swiper-parallax="-100">
                <p>{testi.data.testimony}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimony;
