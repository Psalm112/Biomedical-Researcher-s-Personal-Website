// import React from "react";
// import { useState } from "react";
// import { db } from "../../../firebase.js";
// import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import { collection, addDoc, Timestamp, doc, setDoc } from "firebase/firestore";

// const UploadImg = ({
//   collectionName,
//   storageRef,
//   fileName,
//   docName,
//   file,
//   documentName,
//   keyName,
// }) => {
//   return new Promise((resolve, reject) => {
//     if (!file) return;

//     const uploadTask = uploadBytesResumable(storageRef, file);
//     let progress;
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         progress = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );
//       },
//       (error) => {
//         alert(error);
//       }
//     );
//     async () => {
//       try {
//         const postUrl = await getDownloadURL(storageRef);
//         resolve(postUrl);
//         createPost(postUrl);
//       } catch (error) {
//         reject(error);
//       }
//     };
//     // getDownloadURL(uploadTask.snapshot.ref).then((postUrl) => {
//     //   createPost(postUrl);
//     // });

//     // const postsCollectionRef = collection(db, 'articles');
//     const createPost = async (postUrl) => {
//       try {
//         await setDoc(doc(db, collectionName, documentName), {
//           keyName: postUrl,
//           docName: fileName,
//           created: Timestamp.now(),
//         });
//       } catch (err) {
//         alert(err);
//       }
//     };
//   });
// };

// export default UploadImg;
