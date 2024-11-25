import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MainListItems from "./listItems";
import { Outlet } from "react-router-dom";
import "../../styles/adminStyles/listItems.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db, logout } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Logout } from "@mui/icons-material";
// import Chart from "./Chart";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      backgroundColor: "transparent",
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function AdminContent() {
  const [user] = useAuthState(auth);
  // const [name, setName] = React.useState("");
  const navigate = useNavigate();
  // const fetchUserName = async () => {
  //   try {
  //     const q = query(collection(db, "users"), where("uid", "==", user?.uid));
  //     const doc = await getDocs(q);
  //     const data = doc.docs[0].data();
  //     setName(data.name);
  //   } catch (err) {
  //     console.error(err);
  //     alert("An error occured while fetching user data");
  //   }
  // };

  // React.useEffect(() => {
  //   if (loading) return;
  //   if (!user) return navigate("/");
  //   fetchUserName();
  // }, [user, loading]);

  const [about, setAbout] = React.useState({});
  const docRef = doc(db, "articles", "articleAbout");

  React.useEffect(() => {
    onSnapshot(docRef, (doc) => {
      setAbout(doc.data());
    });
  }, []);

  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (window.innerWidth > 540) {
      setOpen(true);
    }
  }, []);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [navText, setNavText] = React.useState("Dashboard");
  // const [SM, setSM] = React.useState(false);
  React.useEffect(() => {
    if (window.location.pathname === "/") {
      setNavText("Dashboard");
    } else if (window.location.pathname === "/about") {
      setNavText("About");
    } else if (window.location.pathname === "/home") {
      setNavText("Home");
    } else if (window.location.pathname === "/articles") {
      setNavText("Articles");
    } else if (window.location.pathname === "/contact") {
      setNavText("Contact");
    } else if (window.location.pathname === "/gallery") {
      setNavText("Gallery");
    }

    // if (window.innerWidth > 540) {
    //   setSM(false);
    // } else {
    //   setSM(true);
    // }
  }, []);

  return (
    <div className="adminContainer">
      <ThemeProvider theme={mdTheme}>
        {/* <BrowserRouter> */}
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open} className="adminNav">
            <Toolbar
              sx={{
                justifyContent: "space-between",
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                className="menuIconButton"
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon className="menuIcon" />
              </IconButton>

              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                justifySelf="flex-end"
                // sx={{ flexGrow: 1 }}
              >
                {navText}
              </Typography>
              <div
                style={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  className="adminProfile"
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginRight: "20px",
                  }}
                >
                  {/* <h2 style={{ marginBlock: 0, color: "#4e5e72" }}>{name}</h2> */}
                  <p style={{ marginBlock: 0, color: "#111101" }}>Admin</p>
                </div>
                <Avatar
                  className="adminProfileAvatar"
                  alt="Victor Oyebanji"
                  src={about.artiAboutURL}
                  // sx={{ width: 56, height: 56 }}
                />
              </div>
            </Toolbar>
          </AppBar>

          <Drawer
            variant="permanent"
            open={open}
            className={
              open
                ? "adminSidebar adminSide"
                : "adminSidebar adminSide closeSide"
            }
          >
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <div
                className="small logoSection"
                style={{
                  display: "flex",
                  height: "100%",
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
                <div
                  style={{
                    width: "25px",
                    marginRight: "3px",
                    display: "block",
                  }}
                >
                  <img src="img/logo.png" width="100%" alt="logo" />
                </div>
                <div style={{ width: "150px" }}>
                  <img src="img/logoText.png" width="100%" alt="logoText" />
                </div>
              </div>

              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav" sx={{ flexGrow: 1 }}>
              <MainListItems />
            </List>
            <List component="nav">
              {open && (
                <div
                  style={{
                    width: "240px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h4
                    style={{
                      padding: "0 16px",
                      color: "#4e5e72",
                      display: "inline-block",
                      wordBreak: "break-all",
                      whiteSpace: "normal",
                      marginBlock: 0,
                      // wordBreak: "break-all",
                    }}
                  >
                    Victor Oyebanji
                  </h4>
                  <p
                    style={{
                      padding: "0 16px",
                      color: "#4e5e72",
                      display: "inline-block",
                      wordBreak: "break-all",
                      whiteSpace: "normal",
                      marginBlock: 0,
                      // wordBreak: "break-all",
                    }}
                  >
                    {user?.email}
                  </p>
                </div>
              )}
              <ListItemButton
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                sx={{ color: "#4e5e72" }}
              >
                <ListItemIcon sx={{ color: "#4e5e72" }}>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary="SignOut" />
              </ListItemButton>
            </List>
          </Drawer>
          <Box
            className="adminMain"
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
              paddingBottom: "20px",
            }}
          >
            <Toolbar />
            <Outlet />
          </Box>
        </Box>
      </ThemeProvider>
      <ToastContainer />
    </div>
  );
}

export default function AdminOutlet() {
  return <AdminContent />;
}
