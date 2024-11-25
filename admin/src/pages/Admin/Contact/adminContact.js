import { React } from "react";
import Meta from "../meta";
// import Paper from "@mui/material/Paper";
// import Divider from "@mui/material/Divider";
import AdContact from "./contact";

const AdminContact = () => {
  return (
    <div>
      <Meta collectionName="contact" docName="contactInfo" />
      <AdContact />
    </div>
  );
};
export default AdminContact;
