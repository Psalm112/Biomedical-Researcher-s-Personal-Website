import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// import * as firebase from "firebase";
// import { getAuth, signInAnonymously } from "firebase/auth";

// let dd = firebase.an;
const firebaseConfig = {
  apiKey: "AIzaSyCM6ypNJWsTPF33wsr6n1gAGqDx0haEoSQ",
  authDomain: "oyebanjivictor-f4d86.firebaseapp.com",
  projectId: "oyebanjivictor-f4d86",
  storageBucket: "oyebanjivictor-f4d86.appspot.com",
  messagingSenderId: "388301069645",
  appId: "1:388301069645:web:8538f8df560b433db3ab04",
  measurementId: "G-ZCJNPC70E1",
};

// Initialize Firebase and Firestore
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const storage = getStorage();
export const storage02 = getStorage(app);
export { db };
// Initialize Analytics and get a reference to the service
// const analytics = getAnalytics(app);

// export const auth = getAuth(app);
// export const logInAnonymously = async () => {
//   try {
//     await signInAnonymously(auth);
//   } catch (err) {
//     console.log(err);
//   }
// };
