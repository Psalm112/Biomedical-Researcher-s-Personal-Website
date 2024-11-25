import Modal from "../Modal.js";
import "../../../styles/adminStyles/about/expItem.css";

function AboutItem({ onClose, open, about, intro }) {
  return (
    <Modal modalLable="About" onClose={onClose} open={open}>
      <div className="taskItem">
        <h3>{intro}</h3>
        <p>{about}</p>
      </div>
    </Modal>
  );
}

export default AboutItem;
