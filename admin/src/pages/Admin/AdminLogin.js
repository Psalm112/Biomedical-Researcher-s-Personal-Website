import React, { useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
import {
  // auth,
  logInWithEmailAndPassword,
  sendPasswordReset,
} from "../../firebase";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../../styles/adminStyles/adminLogin.css";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { Visibility } from "@mui/icons-material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import "../../styles/adminStyles/listItems.css";
import { ArrowBack, LockReset } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://wa.me/message/SRZOYIUCMQYVO1">
        Aplus Designs
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function AdminLogin() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [user, loading, error] = useAuthState(auth);

  // const LoadScreen = () => {
  //   return (
  //     <div className="loader-container">
  //       <div className="spinner">
  //         <div className="loaderInner"></div>
  //       </div>
  //     </div>
  //   );
  // };

  const [reset, setReset] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!reset) {
      try {
        await logInWithEmailAndPassword(
          data.get("email"),
          data.get("password")
        );
      } catch (err) {
        toast.error(
          "Request failed! make sure you have internet connection and try again.",
          {
            autoClose: 2000,
          }
        );
      }
    } else {
      try {
        await sendPasswordReset(data.get("email"));
        toast.success(
          "Password reset link sent! Please check your spam folder if you cant find the mail.",
          {
            autoClose: 2000,
          }
        );
      } catch (err) {
        toast.error(
          "Request failed! make sure you have internet connection and try again.",
          {
            autoClose: 2000,
          }
        );
      }
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{ height: "100vh" }}
        className="adminLogin"
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{ backgroundColor: "#f5f6fa" }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#BAB4C2" }}>
              {!reset ? <LockOutlinedIcon /> : <LockReset />}
            </Avatar>
            {reset && (
              <Grid container>
                <Grid item xs>
                  <Link
                    variant="body2"
                    sx={{
                      color: "#4e5e72",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => setReset(false)}
                  >
                    <ArrowBack sx={{ fontSize: "20px" }} />
                    <span>Back to Login</span>
                  </Link>
                </Grid>
              </Grid>
            )}
            <Typography component="h1" variant="h5">
              {!reset ? (
                "Sign in"
              ) : (
                <>
                  <h2 style={{ color: "#4e5e72", marginBlock: 0 }}>
                    Forgot Password
                  </h2>
                  <p style={{ marginBlock: 0 }}>
                    Send a link to your email to reset your password
                  </p>
                </>
              )}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1, width: "100%" }}
            >
              <TextField
                className="ddd"
                margin="normal"
                size="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              {!reset && (
                <TextField
                  className="ddd"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#4e5e72",
                  "&:hover": { backgroundColor: "#BAB4C2" },
                }}
              >
                {!reset ? "Sign In" : "Send Reset Link"}
              </Button>
              {!reset && (
                <Grid container>
                  <Grid item xs>
                    <Link
                      variant="body2"
                      sx={{ color: "#4e5e72" }}
                      onClick={() => setReset(true)}
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              )}
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer />
    </ThemeProvider>
  );
}
