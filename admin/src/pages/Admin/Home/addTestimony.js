import React from "react";
import Modal from "../Modal.js";
import { useState } from "react";
import { db } from "../../../firebase.js";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import "../../../styles/adminStyles/about/addExp.css";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

function AddTestimony({ onClose, open }) {
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [testimony, setTestimony] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "testimonies"), {
        name: name,
        occupation: occupation,
        testimony: testimony,
        created: Timestamp.now(),
      });
      onClose();
      toast.success("Testimony added successfully", {
        autoClose: 2000,
      });
    } catch (err) {
      toast.error("error while adding testimony, try again", {
        autoClose: 2000,
      });
    }
  };

  return (
    <Modal modalLable="Add Task" onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className="addTask" name="addTask">
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Enter name"
          required
        />
        <input
          type="text"
          name="Position"
          onChange={(e) => setOccupation(e.target.value)}
          value={occupation}
          placeholder="Enter occupation"
          required
        />
        <textarea
          onChange={(e) => setTestimony(e.target.value)}
          placeholder="Enter testimony"
          value={testimony}
          required
        ></textarea>
        <button className="button" type="submit">
          Done
        </button>
      </form>
    </Modal>
  );
}

export default AddTestimony;
