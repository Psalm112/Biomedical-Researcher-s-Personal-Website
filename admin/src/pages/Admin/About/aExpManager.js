import "../../../styles/adminStyles/about/aExpManager.css";
import AExp from "./aExp";
import AddExp from "./addExp";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase.js";
import { format } from "date-fns";

function AExpManager() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [experiences, setExperiences] = useState([]);

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const q = query(
      collection(db, "experiences"),
      orderBy("startDate", "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      setExperiences(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  // const Timestamp = new Date(exp.data.startDate).getTime();

  return (
    <div className="taskManager">
      <div className="taskManager__container">
        <button onClick={() => setOpenAddModal(true)}>Add task +</button>
        <div className="taskManager__tasks">
          {experiences.map((exp) => (
            <AExp
              id={exp.id}
              key={exp.id}
              completed={exp.data.completed}
              position={exp.data.position}
              description={exp.data.description}
              startDate={format(
                new Date(exp.data.startDate.toDate()),
                "MMM yyyy"
              )}
              endDate={format(new Date(exp.data.endDate.toDate()), "MMM yyyy")}
            />
          ))}
        </div>
      </div>

      {openAddModal && (
        <AddExp onClose={() => setOpenAddModal(false)} open={openAddModal} />
      )}
    </div>
  );
}

export default AExpManager;
