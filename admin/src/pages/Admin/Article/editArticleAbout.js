import Modal from "../Modal.js";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import "../../../styles/adminStyles/about/editExp.css";
import { toast } from "react-toastify";

function EditArtiTxt({
  open,
  onClose,
  text,
  toEditBody,
  collectionName,
  docName,
  field,
  home,
  toEditField2,
  additonalField,
}) {
  const [body, setBody] = useState(toEditBody);
  const [field2, setField2] = useState(toEditField2);
  /* function to update document in firestore */
  const handleUpdate = async (e) => {
    e.preventDefault();
    const taskDocRef = doc(db, collectionName, docName);
    try {
      home
        ? await updateDoc(taskDocRef, {
            [field]: body,
            [additonalField]: field2,
          })
        : await updateDoc(taskDocRef, {
            [field]: body,
          });
      toast.success("Successfully updated", {
        autoClose: 2000,
      });
      onClose();
    } catch (err) {
      toast.error("error in updating database, try again", {
        autoClose: 2000,
      });
    }
  };

  return (
    <Modal modalLable={text} onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className="editTask" name="updateTask">
        {home && (
          <input
            type="text"
            value={field2}
            onChange={(e) => setField2(e.target.value)}
          />
        )}
        <textarea
          onChange={(e) => setBody(e.target.value)}
          value={body}
        ></textarea>
        <button className="button" type="submit">
          Edit
        </button>
      </form>
    </Modal>
  );
}

export default EditArtiTxt;
