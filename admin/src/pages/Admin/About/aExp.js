import "../../../styles/adminStyles/about/aExp.css";
import { useState } from "react";
import { db } from "../../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import ExpItem from "./expItem";
import EditExp from "./editExp";
import { toast } from "react-toastify";

function AExp({ id, position, description, completed, startDate, endDate }) {
  const [checked, setChecked] = useState(completed);
  const [open, setOpen] = useState({ edit: false, view: false });

  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };

  /* function to update document in firestore */

  /* function to delete a document from firstore */
  const handleDelete = async () => {
    const taskDocRef = doc(db, "experiences", id);
    try {
      await deleteDoc(taskDocRef);
      toast.success("experience deleted successfully", {
        autoClose: 2000,
      });
    } catch (err) {
      toast.error("error in deleting experience", {
        autoClose: 2000,
      });
    }
  };

  const AExpDate = () => {
    if (completed) {
      return <p>{`${startDate} - Present`}</p>;
    } else {
      return <p>{`${startDate} - ${endDate}`}</p>;
    }
  };

  return (
    <div className={`task ${checked && "task--borderColor"}`}>
      <div className="task__body">
        <h2>{position}</h2>
        <p>{description}</p>
        <AExpDate />
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
        <ExpItem
          onClose={handleClose}
          position={position}
          description={description}
          date={<AExpDate />}
          open={open.view}
        />
      )}

      {open.edit && (
        <EditExp
          onClose={handleClose}
          toEditPosition={position}
          toEditDescription={description}
          toEditStartDate={startDate}
          toEditCompleted={completed}
          toEditEndDate={endDate}
          open={open.edit}
          id={id}
        />
      )}
    </div>
  );
}

export default AExp;
