import "../../../styles/adminStyles/about/aExp.css";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase.js";
import EditArtiTxt from "./editArticleAbout";
import ArticleTxtItem from "./articleTxtItem";

function ArticleAboutTxt({
  text,
  field,
  collectionName,
  docName,
  home,
  field2,
}) {
  //   const [checked, setChecked] = useState(completed);
  const [open, setOpen] = useState({ edit: false, view: false });
  const [about, setAbout] = useState({});
  const docRef = doc(db, collectionName, docName);

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
    <div
      className="adminAbout"
      style={{ margin: "0 0 30px 0", padding: "0 10px" }}
    >
      <div
        className={`task`}
        style={{ borderTopLeftRadius: "0", borderTopRightRadius: "0" }}
      >
        <div className="task__body">
          <h3>{text}</h3>
          <div style={{ textAlign: "left" }}>{about[field]}</div>
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
        <ArticleTxtItem
          onClose={handleClose}
          text={text}
          Body={about[field]}
          open={open.view}
        />
      )}

      {open.edit && (
        <EditArtiTxt
          onClose={handleClose}
          text={text}
          toEditBody={about[field]}
          field={field}
          collectionName={collectionName}
          docName={docName}
          open={open.edit}
          home={home}
          toEditField2={text}
          additonalField={field2}
        />
      )}
    </div>
  );
}

export default ArticleAboutTxt;
