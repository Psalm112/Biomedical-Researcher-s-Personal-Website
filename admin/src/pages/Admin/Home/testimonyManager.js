import "../../../styles/adminStyles/about/aExpManager.css";
import Testimony from "./testimony";
import AddTestimony from "./addTestimony";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase.js";

function TestimonyManager() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [testimonies, setTestimonies] = useState([]);

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const q = query(collection(db, "testimonies"), orderBy("created", "desc"));
    onSnapshot(q, (querySnapshot) => {
      setTestimonies(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div className="taskManager">
      <div className="taskManager__container">
        <button onClick={() => setOpenAddModal(true)}>Add Testimony +</button>
        <div className="taskManager__tasks">
          {testimonies.map((testi) => (
            <Testimony
              id={testi.id}
              key={testi.id}
              name={testi.data.name}
              occupation={testi.data.occupation}
              testimony={testi.data.testimony}
            />
          ))}
        </div>
      </div>

      {openAddModal && (
        <AddTestimony
          onClose={() => setOpenAddModal(false)}
          open={openAddModal}
        />
      )}
    </div>
  );
}

export default TestimonyManager;
