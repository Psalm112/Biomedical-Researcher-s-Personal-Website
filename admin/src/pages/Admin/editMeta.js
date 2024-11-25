import Modal from "./Modal.js";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "../../styles/adminStyles/about/editExp.css";
import { toast } from "react-toastify";

function EditMeta({
  open,
  onClose,
  toEditDesc,
  toEditKeywords,
  id,
  collectionName,
  docName,
}) {
  const [desc, setDesc] = useState(toEditDesc);
  const [keywords, setKeywords] = useState(toEditKeywords);

  /* function to update document in firestore */
  const handleUpdate = async (e) => {
    e.preventDefault();
    const taskDocRef = doc(db, collectionName, docName);
    try {
      await updateDoc(taskDocRef, {
        pageDescription: desc,
        pageKeywords: keywords,
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
        <p>
          <i>separate each keyword with a comma and a space</i>
        </p>
        <input
          type="text"
          name="intro"
          onChange={(e) => setKeywords(e.target.value)}
          value={keywords}
        />
        <p>
          <i>brief description about the page</i>
        </p>
        <textarea
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        ></textarea>
        <button className="button" type="submit">
          Edit
        </button>
      </form>
    </Modal>
  );
}

export default EditMeta;
