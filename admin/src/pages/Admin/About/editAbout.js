import Modal from "../Modal.js";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import "../../../styles/adminStyles/about/editExp.css";
import { toast } from "react-toastify";

function EditAbout({ open, onClose, toEditIntro, toEditAbout, id }) {
  const [about, setAbout] = useState(toEditAbout);
  const [intro, setIntro] = useState(toEditIntro);

  /* function to update document in firestore */
  const handleUpdate = async (e) => {
    e.preventDefault();
    const taskDocRef = doc(db, "about", "about");
    try {
      await updateDoc(taskDocRef, {
        about: about,
        intro: intro,
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
    <Modal modalLable="Edit About" onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className="editTask" name="updateTask">
        <input
          type="text"
          name="intro"
          onChange={(e) => setIntro(e.target.value)}
          value={intro}
        />
        <textarea
          onChange={(e) => setAbout(e.target.value)}
          value={about}
        ></textarea>
        <button className="button" type="submit">
          Edit
        </button>
      </form>
    </Modal>
  );
}

export default EditAbout;
