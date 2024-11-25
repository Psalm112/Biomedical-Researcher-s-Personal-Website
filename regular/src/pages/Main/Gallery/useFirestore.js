import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";

const useFirestore = (collectionName = "famgallery") => {
  const [documents, setDocuments] = useState([]);
  //   const { setAlert } = useAuth();
  useEffect(() => {
    const q = query(
      collection(db, collectionName),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => {
          docs.push({ id: doc.id, data: doc.data() });
        });
        setDocuments(docs);
      },
      (error) => {
        // setAlert({
        //   isAlert: true,
        //   severity: "error",
        //   message: error.message,
        //   timeout: 8000,
        //   location: "main",
        // });
        console.log(error);
      }
    );

    return () => unsubscribe();
  }, [collectionName]);

  return { documents };
};

export default useFirestore;
