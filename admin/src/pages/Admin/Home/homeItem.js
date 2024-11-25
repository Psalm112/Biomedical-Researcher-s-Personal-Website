import Modal from "../Modal.js";
import Divider from "@mui/material/Divider";
import "../../../styles/adminStyles/about/expItem.css";

function HomeItem({
  onClose,
  open,
  headerIntro,
  name,
  occupation,
  headerBrief,
  aboutMeIntro,
  aboutMe,
}) {
  return (
    <Modal modalLable="Home Page" onClose={onClose} open={open}>
      <div className="taskItem">
        <Divider />

        <h3>Header Intro</h3>
        <p>{headerIntro}</p>

        <Divider />

        <h3>Name</h3>
        <p>{name}</p>

        <Divider />

        <h3>Occupation</h3>
        <p> {occupation}</p>

        <Divider />

        <h3>Header Brief</h3>
        <p>{headerBrief}</p>

        <Divider />

        <h3>About me</h3>
        <p>{aboutMeIntro}</p>
        <p>{aboutMe}</p>
      </div>
    </Modal>
  );
}

export default HomeItem;
