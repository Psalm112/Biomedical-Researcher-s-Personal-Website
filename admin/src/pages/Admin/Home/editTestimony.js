import Modal from "../Modal.js";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import "../../../styles/adminStyles/about/editExp.css";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

function EditTestimony({
  open,
  onClose,
  toEditName,
  toEditOccupation,
  toEditTestimony,
  id,
}) {
  const [name, setName] = useState(toEditName);
  const [occupation, setOccupation] = useState(toEditOccupation);
  const [testimony, setTestimony] = useState(toEditTestimony);

  /* function to update document in firestore */
  const handleUpdate = async (e) => {
    e.preventDefault();
    const taskDocRef = doc(db, "testimonies", id);
    try {
      await updateDoc(taskDocRef, {
        name: name,
        occupation: occupation,
        testimony: testimony,
      });
      onClose();
      toast.success("edit successful", {
        autoClose: 2000,
      });
    } catch (err) {
      toast.error("edit unsuccessful, try again", {
        autoClose: 2000,
      });
    }
  };

  return (
    <Modal modalLable="Edit Testimonies" onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className="editTask" name="updateTask">
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="text"
          name="occupation"
          onChange={(e) => setOccupation(e.target.value)}
          value={occupation}
        />
        <textarea
          onChange={(e) => setTestimony(e.target.value)}
          value={testimony}
        ></textarea>
        <button className="button" type="submit">
          Edit
        </button>
      </form>
    </Modal>
  );
}

export default EditTestimony;
