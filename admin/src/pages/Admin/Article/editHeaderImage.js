import React, { useEffect } from "react";
// import VidFileUpload from "../Gallery/videos/uploadVidGalleryFiles";
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ModeEdit } from "@mui/icons-material";
import UploadNewHeaderImage from "./updateHeaderImgFile";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  backgroundColor: "#bab4c2",
  p: 4,
};

const UpdateHeaderImage = ({
  setUpdate,
  update,
  dir,
  title,
  collectionName,
  fileId,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (update) {
      handleClose();
    }
  }, [update]);

  return (
    <>
      <MenuItem onClick={handleOpen}>
        <ListItemIcon>
          <ModeEdit />
        </ListItemIcon>
        Edit Header Image
      </MenuItem>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <UploadNewHeaderImage
            setCompleted={setUpdate}
            fileId={fileId}
            Text="Upload article header image"
            accept="image/*"
            docId={title}
            collectionName={collectionName}
            dir={dir}
            completed={update}
            ImgURL="articleHeaderImg"
            ImgName="articleHeaderImgName"
          />
        </Box>
      </Modal>
    </>
  );
};

export default UpdateHeaderImage;
