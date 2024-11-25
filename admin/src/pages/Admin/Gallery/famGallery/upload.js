import { useState } from "react";
import UploadForm from "./uploadForm";
import ProgressList from "./progressList/ProgressList";

const GalleryUpload = () => {
  const [files, setFiles] = useState([]);
  return (
    <div>
      <UploadForm setFiles={setFiles} />
      <ProgressList files={files} />
    </div>
  );
};

export default GalleryUpload;
