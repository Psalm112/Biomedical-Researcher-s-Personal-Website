import Modal from "../Modal.js";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import Divider from "@mui/material/Divider";
import "../../../styles/adminStyles/about/editExp.css";
import { toast } from "react-toastify";

function EditHome({
  open,
  onClose,
  toEditHeaderIntro,
  toEditName,
  toEditOccupation,
  toEditHeaderBrief,
  toEditAboutMeIntro,
  toEditAboutMe,
  id,
}) {
  const [headerIntro, setHeaderIntro] = useState(toEditHeaderIntro);
  const [name, setName] = useState(toEditName);
  const [occupation, setOccupation] = useState(toEditOccupation);
  const [headerBrief, setHeaderBrief] = useState(toEditHeaderBrief);
  const [aboutMeIntro, setAboutMeIntro] = useState(toEditAboutMeIntro);
  const [aboutMe, setAboutMe] = useState(toEditAboutMe);
  /* function to update document in firestore */
  const handleUpdate = async (e) => {
    e.preventDefault();
    const taskDocRef = doc(db, "home", "info");
    try {
      await updateDoc(taskDocRef, {
        headerIntro: headerIntro,
        name: name,
        occupation: occupation,
        headerBrief: headerBrief,
        aboutMeIntro: aboutMeIntro,
        aboutMe: aboutMe,
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
          onChange={(e) => setHeaderIntro(e.target.value)}
          value={headerIntro}
        />
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
          onChange={(e) => setHeaderBrief(e.target.value)}
          value={headerBrief}
        ></textarea>
        <Divider />
        <input
          type="text"
          name="AboutMeIntro"
          onChange={(e) => setAboutMeIntro(e.target.value)}
          value={aboutMeIntro}
        />
        <textarea
          onChange={(e) => setAboutMe(e.target.value)}
          value={aboutMe}
        ></textarea>
        <button className="button" type="submit">
          Edit
        </button>
      </form>
    </Modal>
  );
}

export default EditHome;
