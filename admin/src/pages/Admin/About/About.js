import "../../../styles/adminStyles/about/aExp.css";
import AboutItem from "./aboutItem";
import EditAbout from "./editAbout";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase.js";

function AdAbout() {
  //   const [checked, setChecked] = useState(completed);
  const [open, setOpen] = useState({ edit: false, view: false });
  const [about, setAbout] = useState({});
  const docRef = doc(db, "about", "about");

  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };

  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      setAbout(doc.data());
    });
  }, []);

  /* function to update document in firestore */

  /* function to delete a document from firstore */

  return (
    <div className="adminAbout" style={{ margin: "30px 0", padding: "0 10px" }}>
      <div className={`task`}>
        <div className="task__body">
          <h2>About</h2>
          <h3>{about.intro}</h3>
          <div>{about.about}</div>
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
        <AboutItem
          onClose={handleClose}
          intro={about.intro}
          about={about.about}
          open={open.view}
        />
      )}

      {open.edit && (
        <EditAbout
          onClose={handleClose}
          toEditAbout={about.about}
          toEditIntro={about.intro}
          open={open.edit}
        />
      )}
    </div>
  );
}

export default AdAbout;
