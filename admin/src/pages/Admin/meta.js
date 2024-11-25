import "../../styles/adminStyles/about/aExp.css";
import MetaItem from "./metaItem";
import EditMeta from "./editMeta";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.js";

function Meta({ collectionName, docName }) {
  //   const [checked, setChecked] = useState(completed);
  const [open, setOpen] = useState({ edit: false, view: false });
  const [meta, setMeta] = useState({});
  const docRef = doc(db, collectionName, docName);

  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };

  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      setMeta(doc.data());
    });
  }, []);

  /* function to update document in firestore */

  /* function to delete a document from firstore */

  return (
    <div
      className="adminAbout"
      style={{ margin: "30px 0", padding: "0 10px", textAlign: "center" }}
    >
      <div className={`task`}>
        <div className="task__body">
          <h2>Page Info</h2>
          <p>
            <i style={{ display: "inline-block", wordBreak: "break-word" }}>
              these information helps with google searches and sharing of the
              webpage link
            </i>
          </p>
          <p style={{ display: "inline-block", wordBreak: "break-word" }}>
            <span>
              <b>Webpage Keywords: </b>
            </span>
            {meta.pageKeywords}
          </p>
          <div>
            <b>Webpage Description: </b>
            {meta.pageDescription}
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
        <MetaItem
          onClose={handleClose}
          desc={meta.pageDescription}
          keywords={meta.pageKeywords}
          open={open.view}
        />
      )}

      {open.edit && (
        <EditMeta
          collectionName={collectionName}
          docName={docName}
          onClose={handleClose}
          toEditDesc={meta.pageDescription}
          toEditKeywords={meta.pageKeywords}
          open={open.edit}
        />
      )}
    </div>
  );
}

export default Meta;
