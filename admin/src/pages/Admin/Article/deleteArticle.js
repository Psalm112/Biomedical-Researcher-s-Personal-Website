import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { ModeEdit, MoreVert } from "@mui/icons-material";
import Delete from "@mui/icons-material/Delete";
import deleteFile from "../Gallery/firebase/deleteFile";
import deleteDocument from "../Gallery/firebase/deleteDocument";
// import { doc, collection, onSnapshot, updateDoc } from "firebase/firestore";
// import { db } from "../../../firebase.js";
import { storage } from "../../../firebase";
import { ref, listAll } from "firebase/storage";
import UpdateHeaderImage from "./editHeaderImage";
import { toast } from "react-toastify";

export default function ArticleDelete({
  docId,
  dir,
  collectionName,
  fileId,
  setEdit,
  setTitle,
  title,
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
      const listRef = ref(storage, dir);

      // Find all the prefixes and items.
      await listAll(listRef)
        .then((res) => {
          res.items.forEach((itemRef) => {
            // All the items under listRef.
            console.log(itemRef.fullPath);
            deleteFile(itemRef.fullPath);
          });
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
        });

      await deleteDocument(collectionName, docId);
      toast.success("Article deleted successfully", {
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("error in delete article", {
        autoClose: 2000,
      });
    }
  };
  const handleEdit = () => {
    setEdit(true);
    setTitle(title);
  };

  const [update, setUpdate] = React.useState(false);

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
        <UpdateHeaderImage
          update={update}
          setUpdate={setUpdate}
          title={title}
          collectionName={collectionName}
          dir={dir}
          fileId={fileId}
        />
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <ModeEdit />
          </ListItemIcon>
          Edit Article
        </MenuItem>
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
