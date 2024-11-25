// import { Add } from "@mui/icons-material";
// import { Fab, Input } from "@mui/material";
// import React, { useRef, useState } from "react";
// import { Button } from "@mui/material";
// import { Popover } from "@mui/material";
// const UploadForm = ({
//   setFile,
//   setThumb,
//   setTitle,
//   thumbStatus,
//   videoStatus,
//   addFileDoc,
// }) => {
//   const videoRef = useRef();
//   const posterRef = useRef();
//   const handleClick = () => {
//     videoRef.current.click();
//   };
//   const handleChange = (e) => {
//     setFile(e.target.files[0]);
//     videoRef.current.value = null;
//   };

//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const popClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const popover = document.querySelector(".popover");
//     popover.addEventListener(onclose, () => {
//       setAnchorEl(null);
//     });
//     console.log("dd");
//   };
//   const open = Boolean(anchorEl);
//   const id = open ? "simple-popover" : undefined;

//   return (
//     <form onSubmit={handleSubmit}>
//       <Button aria-describedby={id} variant="contained" onClick={popClick}>
//         Open Popover
//       </Button>
//       <Popover
//         className="popover"
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         // onClose={handleClose}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "left",
//         }}
//       >
//         <div style={{ padding: "10px" }}>
//           <Input
//             type="text"
//             autoFocus
//             placeholder="Enter video title"
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <button className="button">Next</button>
//           {!thumbStatus && (
//             <div style={{ margin: "10px 0" }}>
//               <label htmlFor="contained-button-file">
//                 <Input
//                   type="file"
//                   inputProps={{ accept: "image/*" }}
//                   sx={{ display: "none" }}
//                   inputRef={posterRef}
//                   onChange={(e) => {
//                     setThumb(e.target.files[0]);
//                     posterRef.current.value = null;
//                   }}
//                 />
//                 <Button
//                   variant="contained"
//                   component="span"
//                   onClick={() => posterRef.current.click()}
//                 >
//                   Upload video thumbnail
//                 </Button>
//               </label>
//             </div>
//           )}
//           {!videoStatus && (
//             <div>
//               <label htmlFor="contained-button-file">
//                 <Input
//                   type="file"
//                   inputProps={{ accept: "video/*" }}
//                   sx={{ display: "none" }}
//                   inputRef={videoRef}
//                   onChange={handleChange}
//                 />
//                 <Button
//                   variant="contained"
//                   component="span"
//                   onClick={handleClick}
//                   sx={{ width: "100%" }}
//                 >
//                   Upload video
//                 </Button>
//                 {/* <Fab
//               sx={{ color: "#e0e0e0", backgroundColor: "#755566" }}
//               aria-label="add"
//               onClick={handleClick}
//             >
//               <Add fontSize="small" />
//             </Fab> */}
//               </label>
//             </div>
//           )}
//           <button className="button" type="submit">
//             Done
//           </button>
//         </div>
//       </Popover>
//       {/* <Input
//         type="file"
//         inputProps={{ accept: "video/*" }}
//         sx={{ display: "none" }}
//         inputRef={videoRef}
//         onChange={handleChange}
//       /> */}
//     </form>
//   );
// };

// export default UploadForm;
