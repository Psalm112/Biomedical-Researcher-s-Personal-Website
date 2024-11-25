import React from "react";
import Modal from "../Modal.js";
import { useState } from "react";
import { db } from "../../../firebase.js";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import DatePicker from "react-datepicker";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import "../../../styles/adminStyles/about/addExp.css";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
function AddExp({ onClose, open }) {
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  //   const [dateRange, setDateRange] = useState([null, null]);
  //   const [startDate, endDate] = dateRange;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(startDate);
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    setEndDate(null);
    setStartDate(null);
  };

  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "experiences"), {
        position: position,
        description: description,
        completed: checked,
        startDate: startDate,
        endDate: endDate,
        created: Timestamp.now(),
      });
      toast.success("Experience successfully added", {
        autoClose: 2000,
      });
      onClose();
    } catch (err) {
      toast.error("error in adding experience", {
        autoClose: 2000,
      });
    }
  };

  const CompletedState = () => {
    if (checked) {
      return (
        <div>
          <DatePicker
            placeholderText="Click to select a date"
            selected={startDate}
            onChange={(month) => {
              setStartDate(month);
              setEndDate(month);
            }}
            dateFormat="MMM yyyy"
            showMonthYearPicker
            isClearable={true}
            required
          />
        </div>
      );
    } else {
      return (
        <div>
          <DatePicker
            placeholderText="Click to select start date"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MMM yyyy"
            showMonthYearPicker
            selectsStart
            startDate={startDate}
            endDate={endDate}
            isClearable={true}
            required
          />
          <DatePicker
            placeholderText="Click to select end date"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="MMM yyyy"
            showMonthYearPicker
            isClearable={true}
            required
          />
        </div>
      );
    }
  };

  return (
    <Modal modalLable="Add Task" onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className="addTask" name="addTask">
        <input
          type="text"
          name="Position"
          onChange={(e) => setPosition(e.target.value.toUpperCase())}
          value={position}
          placeholder="Enter title"
          required
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter work decription"
          value={description}
          required
        ></textarea>
        <div>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Ongoing"
              labelPlacement="start"
            />
          </FormGroup>
        </div>
        <CompletedState />
        <button className="button" type="submit">
          Done
        </button>
      </form>
    </Modal>
  );
}

export default AddExp;
