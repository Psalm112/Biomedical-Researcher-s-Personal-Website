import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { MoreVert } from "@mui/icons-material";
import Delete from "@mui/icons-material/Delete";
import deleteFile from "../Gallery/firebase/deleteFile";
import { doc, collection, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase.js";
import { toast } from "react-toastify";

export default function ImgDelete({
  docId,
  dir,
  collectionName,
  fileId,
  ImgName,
  ImgURL,
  uploadCompleteStatus,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = async () => {
    try {
      //   await deleteDocument(collectionName, docId);
      const uDoc = {
        [ImgURL]: null,
        [ImgName]: null,
        [uploadCompleteStatus]: false,
      };

      // const docRef = db.collection("about").doc("about");
      const docRef = doc(collection(db, collectionName), docId);
      await updateDoc(docRef, uDoc);
      await deleteFile(`${dir}/${fileId}`);
      toast.success("File successfully deleted", {
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("error while deleting file", {
        autoClose: 2000,
      });
    }
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Option">
          <IconButton
            onClick={handleClick}
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              color: "white",
              background: "rgba(0,0,0,0.3)",
            }}
          >
            <MoreVert fontSize="large" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="image-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
