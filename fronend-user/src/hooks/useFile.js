import { useState } from "react";

export const useFile = () => {
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState([]);

  const handleFile = (e) => {
    const selectedFiles = Array.from(e.target.files);

    setFiles(selectedFiles);

    // tạo preview
    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));

    setPreview(previewUrls);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreview((prev) => prev.filter((_, i) => i !== index));
  };

  const resetFile = () => {
    setFiles([]);
    setPreview([]);
  };

  return {
    files,
    preview,
    handleFile,
    removeFile,
    resetFile,
  };
};
