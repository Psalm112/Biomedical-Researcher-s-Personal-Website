import Modal from "../Modal.js";
import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import "../../../styles/adminStyles/about/editExp.css";
import { toast } from "react-toastify";

function EditContact({
  toEditEmail,
  toEditAddress,
  toEditTel,
  toEditFacebook,
  toEditTwitter,
  toEditInstagram,
  toEditLinkedin,
  toEditMap,
}) {
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);
  const [tel, setTel] = useState(null);
  const [facebook, setFacebook] = useState(null);
  const [twitter, setTwitter] = useState(null);
  const [instagram, setInstagram] = useState(null);
  const [linkedin, setLinkedIn] = useState(null);
  const [map, setMap] = useState(null);
  useEffect(() => {
    setEmail(toEditEmail);
    setAddress(toEditAddress);
    setTel(toEditTel);
    setMap(toEditMap);
    setTwitter(toEditTwitter);
    setLinkedIn(toEditLinkedin);
    setFacebook(toEditFacebook);
    setInstagram(toEditInstagram);
  }, [toEditEmail]);
  /* function to update document in firestore */
  const handleUpdate = async (e) => {
    e.preventDefault();
    const taskDocRef = doc(db, "contact", "contactInfo");
    try {
      await updateDoc(taskDocRef, {
        address: address,
        email: email,
        facebook: facebook,
        instagram: instagram,
        twitter: twitter,
        map: map,
        phoneNumber: tel,
        linkedin: linkedin,
      });
      handleClose();
      toast.success("edit successful", {
        autoClose: 2000,
      });
    } catch (err) {
      toast.error("edit unsuccessful", {
        autoClose: 2000,
      });
    }
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <button className="task__editButton" onClick={handleOpen}>
        Edit
      </button>
      <Modal modalLable="Edit Experience" onClose={handleClose} open={open}>
        <form onSubmit={handleUpdate} className="editTask" name="updateTask">
          <input
            type="text"
            name="address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="tel"
            name="telephone"
            onChange={(e) => setTel(e.target.value)}
            value={tel}
          />
          <input
            type="text"
            name="facebook"
            onChange={(e) => setFacebook(e.target.value)}
            value={facebook}
          />
          <input
            type="text"
            name="instagram"
            onChange={(e) => setInstagram(e.target.value)}
            value={instagram}
          />
          <input
            type="text"
            name="twitter"
            onChange={(e) => setTwitter(e.target.value)}
            value={twitter}
          />
          <input
            type="text"
            name="linkedin"
            onChange={(e) => setLinkedIn(e.target.value)}
            value={linkedin}
          />
          <textarea
            onChange={(e) => setMap(e.target.value)}
            value={map}
          ></textarea>

          <button className="button" type="submit">
            Edit
          </button>
        </form>
      </Modal>
    </>
  );
}

export default EditContact;
