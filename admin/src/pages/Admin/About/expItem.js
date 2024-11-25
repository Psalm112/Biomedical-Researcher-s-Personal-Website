import Modal from "../Modal.js";
import "../../../styles/adminStyles/about/expItem.css";

function ExpItem({ onClose, open, position, description, date }) {
  return (
    <Modal modalLable="Experience" onClose={onClose} open={open}>
      <div className="taskItem">
        <h2>{position}</h2>
        <p>{description}</p>
        <p>{date}</p>
      </div>
    </Modal>
  );
}

export default ExpItem;
