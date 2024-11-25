import Modal from "../Modal.js";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import DatePicker from "react-datepicker";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
// import { format } from "date-fns";
import "../../../styles/adminStyles/about/editExp.css";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

function EditExp({
  open,
  onClose,
  toEditPosition,
  toEditDescription,
  id,
  toEditStartDate,
  toEditEndDate,
  toEditCompleted,
}) {
  const [position, setPosition] = useState(toEditPosition);
  const [description, setDescription] = useState(toEditDescription);
  const [checked, setChecked] = useState(toEditCompleted);
  const [startDate, setStartDate] = useState(new Date(toEditStartDate));
  const [endDate, setEndDate] = useState(new Date(toEditEndDate));
  console.log(checked);
  const handleChange = (event) => {
    setChecked(event.target.checked);
    setEndDate(new Date(toEditEndDate));
    setStartDate(new Date(toEditStartDate));
  };
  /* function to update document in firestore */
  const handleUpdate = async (e) => {
    e.preventDefault();
    const taskDocRef = doc(db, "experiences", id);
    try {
      await updateDoc(taskDocRef, {
        position: position,
        description: description,
        completed: checked,
        startDate: startDate,
        endDate: endDate,
      });
      onClose();
      toast.success("edit successful", {
        autoClose: 2000,
      });
    } catch (err) {
      toast.error("edit unsuccessful", {
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
            onChange={(month) => setStartDate(month)}
            dateFormat="MMM yyyy"
            showMonthYearPicker
            isClearable={true}
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
          />
        </div>
      );
    }
  };

  return (
    <Modal modalLable="Edit Experience" onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className="editTask" name="updateTask">
        <input
          type="text"
          name="position"
          onChange={(e) => setPosition(e.target.value.toUpperCase())}
          value={position}
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
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
          Edit
        </button>
      </form>
    </Modal>
  );
}

export default EditExp;
