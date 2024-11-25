import Modal from "./Modal.js";
import "../../styles/adminStyles/about/expItem.css";

function MetaItem({ onClose, open, desc, keywords }) {
  return (
    <Modal modalLable="About" onClose={onClose} open={open}>
      <div className="taskItem">
        <h3>{keywords}</h3>
        <div>{desc}</div>
      </div>
    </Modal>
  );
}

export default MetaItem;
