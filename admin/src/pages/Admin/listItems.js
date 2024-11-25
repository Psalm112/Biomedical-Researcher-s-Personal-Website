import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  AccountBox,
  Collections,
  ContactPage,
  Deck,
  Newspaper,
} from "@mui/icons-material";

const MainListItems = () => {
  return (
    <React.Fragment>
      <ListItemButton>
        <ListItemIcon>
          <a href="/">
            <DashboardIcon />
          </a>
        </ListItemIcon>
        <a href="/">
          <ListItemText primary="Dashboard" />
        </a>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <a href="/home">
            <Deck />
          </a>
        </ListItemIcon>
        <a href="/home">
          <ListItemText primary="Home" />
        </a>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <a href="/about">
            <AccountBox />
          </a>
        </ListItemIcon>
        <a href="/about">
          <ListItemText primary="About" />
        </a>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <a href="/contact">
            <ContactPage />
          </a>
        </ListItemIcon>
        <a href="/contact">
          <ListItemText primary="Contact" />
        </a>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <a href="/articles">
            <Newspaper />
          </a>
        </ListItemIcon>
        <a href="/articles">
          <ListItemText primary="Article" />
        </a>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <a href="/gallery">
            <Collections />
          </a>
        </ListItemIcon>
        <a href="/gallery">
          <ListItemText primary="Gallery" />
        </a>
      </ListItemButton>
    </React.Fragment>
  );
};

export default MainListItems;

// export const secondaryListItems = (
//   <React.Fragment>
//     <ListSubheader component="div" inset>
//       Saved reports
//     </ListSubheader>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItemButton>
//   </React.Fragment>
// );
