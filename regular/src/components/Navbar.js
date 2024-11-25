import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import "../styles/componentStyles/Nav.css";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Zoom from "@mui/material/Zoom";
import PropTypes from "prop-types";

const pages = ["about", "contact", "articles", "gallery"];

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger} style={{ zIndex: "1000" }}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const NavBar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  return (
    <React.Fragment>
      <AppBar
        position="static"
        className="Nav"
        sx={{
          position: "sticky",
          top: "0",
        }}
      >
        <div className="navHome">
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
              {/* icon */}
              <div
                className="logoSection"
                style={{
                  display: "flex",
                  height: "100%",
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
                <div style={{ width: "25px", marginRight: "3px" }}>
                  <a href="/">
                    <img src="img/logo.png" width="100%" alt="logo" />
                  </a>
                </div>
                <div style={{ width: "150px" }}>
                  <a href="/">
                    <img src="img/logoText.png" width="100%" alt="logoText" />
                  </a>
                </div>
              </div>

              <Box sx={{ flexGrow: 0.5, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon sx={{ color: "#4e5e72" }} />
                </IconButton>

                {/* mobile */}
                <Menu
                  className="navElMob"
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {/* mobile */}
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <Button variant="Text">
                          <a
                            href={
                              page === "articles"
                                ? `https://article.victoroyebanji.com/`
                                : page
                            }
                          >
                            {page}
                          </a>
                        </Button>
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              {/* desktop */}
              <div
                className="homeSmall logoSection"
                style={{
                  display: "none",
                  height: "100%",
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
                <div style={{ width: "25px", marginRight: "3px" }}>
                  <a href="/">
                    <img src="img/logo.png" width="100%" alt="logo" />
                  </a>
                </div>
                <div style={{ width: "150px" }}>
                  <a href="/">
                    <img src="img/logoText.png" width="100%" alt="logoText" />
                  </a>
                </div>
              </div>

              <Box
                className="navElDesk"
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <a
                      href={
                        page === "articles"
                          ? `https://article.victoroyebanji.com/`
                          : page
                      }
                    >
                      {page}
                    </a>
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </Container>
        </div>
      </AppBar>
      <ScrollTop {...props}>
        <Fab
          size="small"
          aria-label="scroll back to top"
          style={{ background: "#52463C !important" }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
};
export default NavBar;
