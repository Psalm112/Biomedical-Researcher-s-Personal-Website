import "../../../styles/adminStyles/about/aExp.css";
import HomeItem from "./homeItem";
import EditHome from "./editHome";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import Divider from "@mui/material/Divider";
import { db } from "../../../firebase.js";

function AdHome() {
  //   const [checked, setChecked] = useState(completed);
  const [open, setOpen] = useState({ edit: false, view: false });
  const [home, setHome] = useState({});
  const docRef = doc(db, "home", "info");

  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };

  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      setHome(doc.data());
    });
  }, []);

  /* function to update document in firestore */

  /* function to delete a document from firstore */

  return (
    <div className="adminAbout" style={{ margin: "30px 0", padding: "0 10px" }}>
      <div className={`task`}>
        <div className="task__body">
          <h2 style={{ textAlign: "center" }}>Home Page</h2>
          <Divider />
          <div>
            <h3>Header Intro</h3>
            {home.headerIntro}
          </div>
          <Divider />
          <div>
            <h3>Name</h3>
            {home.name}
          </div>
          <Divider />
          <div>
            <h3>Occupation</h3>
            {home.occupation}
          </div>
          <Divider />
          <div>
            <h3>Header Brief</h3>
            {home.headerBrief}
          </div>
          <Divider />
          <div>
            <h3>About me</h3>
            <p>{home.aboutMeIntro}</p>
            <br />
            {home.aboutMe}
          </div>
          <div className="task__buttons">
            <div className="task__deleteNedit">
              <button
                className="task__editButton"
                onClick={() => setOpen({ ...open, edit: true })}
              >
                Edit
              </button>
            </div>
            <button onClick={() => setOpen({ ...open, view: true })}>
              View
            </button>
          </div>
        </div>
      </div>

      {open.view && (
        <HomeItem
          onClose={handleClose}
          headerIntro={home.headerIntro}
          name={home.name}
          occupation={home.occupation}
          headerBrief={home.headerBrief}
          aboutMeIntro={home.aboutMeIntro}
          aboutMe={home.aboutMe}
          open={open.view}
        />
      )}

      {open.edit && (
        <EditHome
          onClose={handleClose}
          toEditHeaderIntro={home.headerIntro}
          toEditName={home.name}
          toEditOccupation={home.occupation}
          toEditHeaderBrief={home.headerBrief}
          toEditAboutMeIntro={home.aboutMeIntro}
          toEditAboutMe={home.aboutMe}
          open={open.edit}
        />
      )}
    </div>
  );
}

export default AdHome;
