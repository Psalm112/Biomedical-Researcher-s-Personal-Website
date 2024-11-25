import Modal from "../Modal.js";
import "../../../styles/adminStyles/about/expItem.css";

function ArticleTxtItem({ onClose, open, Body, text }) {
  return (
    <Modal modalLable={text} onClose={onClose} open={open}>
      <div className="taskItem">
        <p>{Body}</p>
      </div>
    </Modal>
  );
}

export default ArticleTxtItem;
