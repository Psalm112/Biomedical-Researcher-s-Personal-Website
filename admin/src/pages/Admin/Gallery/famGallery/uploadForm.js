import { Add } from "@mui/icons-material";
import { Fab, Input } from "@mui/material";
import React, { useRef } from "react";

const UploadForm = ({ setFiles }) => {
  const fileRef = useRef();
  const handleClick = () => {
    fileRef.current.click();
  };
  const handleChange = (e) => {
    setFiles([...e.target.files]);
    fileRef.current.value = null;
  };
  return (
    <form>
      <Input
        type="file"
        inputProps={{ multiple: true, accept: "image/*" }}
        sx={{ display: "none" }}
        inputRef={fileRef}
        onChange={handleChange}
      />
      <Fab
        sx={{ color: "#e0e0e0", backgroundColor: "#755566" }}
        aria-label="add"
        onClick={handleClick}
      >
        <Add fontSize="large" />
      </Fab>
    </form>
  );
};

export default UploadForm;
