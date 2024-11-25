import "../../../styles/adminStyles/about/aExp.css";
import { useState } from "react";
import { db } from "../../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import TestimonyItem from "./testimonyItem";
import EditTestimony from "./editTestimony";
import { toast } from "react-toastify";

function Testimony({ id, name, occupation, testimony }) {
  //   const [checked, setChecked] = useState(completed);
  const [open, setOpen] = useState({ edit: false, view: false });

  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };

  /* function to update document in firestore */

  /* function to delete a document from firstore */
  const handleDelete = async () => {
    const taskDocRef = doc(db, "testimonies", id);
    try {
      await deleteDoc(taskDocRef);
      toast.success("Delete completed", {
        autoClose: 2000,
      });
    } catch (err) {
      toast.error("error while deleting, try again", {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className={`task`}>
      <div className="task__body">
        <h2 style={{ marginBlock: "0" }}>{name}</h2>
        <h3 style={{ marginBlock: "0" }}>{occupation}</h3>
        <p>{testimony}</p>
        <div className="task__buttons">
          <div className="task__deleteNedit">
            <button
              className="task__editButton"
              onClick={() => setOpen({ ...open, edit: true })}
            >
              Edit
            </button>
            <button className="task__deleteButton" onClick={handleDelete}>
              Delete
            </button>
          </div>
          <button onClick={() => setOpen({ ...open, view: true })}>View</button>
        </div>
      </div>

      {open.view && (
        <TestimonyItem
          onClose={handleClose}
          name={name}
          occupation={occupation}
          testimony={testimony}
          open={open.view}
        />
      )}

      {open.edit && (
        <EditTestimony
          onClose={handleClose}
          toEditName={name}
          toEditOccupation={occupation}
          toEditTestimony={testimony}
          open={open.edit}
          id={id}
        />
      )}
    </div>
  );
}

export default Testimony;
