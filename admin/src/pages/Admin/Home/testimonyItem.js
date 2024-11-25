import Modal from "../Modal.js";
import "../../../styles/adminStyles/about/expItem.css";

function TestimonyItem({ onClose, open, name, occupation, testimony }) {
  return (
    <Modal modalLable="Experience" onClose={onClose} open={open}>
      <div className="taskItem">
        <h2 style={{ marginBlock: "0" }}>{name}</h2>
        {/* <h3 style={{ marginBlock: "0" }}>{occupation}</h3> */}
        <p>{occupation}</p>
        <p>{testimony}</p>
      </div>
    </Modal>
  );
}

export default TestimonyItem;
