import "../../styles/adminStyles/about/modal.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxWidth: "100%",
  bgcolor: "background.paper",
  maxHeight: "100vh",
  overflowY: "scroll",
  boxShadow: 24,
  p: 4,
  padding: 0,
};

function Mod({ open, modalLable, children, custom_modal, onClose }) {
  return (
    <Modal open={open} onClose={onClose} className="modalContainer">
      <Box sx={style}>
        {/* <div className="modalContainer" onClick={handleClose}> */}
        <div className={`modal ${custom_modal}`}>
          <div className="modal__head">
            <h2>{modalLable}</h2>
            <span className="modal__close" onClick={onClose}>
              x
            </span>
          </div>
          {children}
        </div>
        {/* </div> */}
      </Box>
    </Modal>
  );
  // }
  // return null;
}

export default Mod;
