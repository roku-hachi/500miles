import { useState } from "react";
import { supabase } from "../utils/supabaseClient"; // nhớ import đúng path

export const useFile = () => {
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [uploadedUrls, setUploadedUrls] = useState([]);

  // chọn file + preview
  const handleFile = (e) => {
    const selectedFiles = Array.from(e.target.files);

    setFiles(selectedFiles);

    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));

    setPreview(previewUrls);
  };

  // upload lên Supabase
  const uploadFiles = async () => {
    const urls = [];

    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from("images")
        .upload(`uploads/${fileName}`, file);

      if (error) {
        console.error("Upload error:", error);
        continue;
      }

      // lấy public URL
      const { data } = supabase.storage
        .from("images")
        .getPublicUrl(`uploads/${fileName}`);

      urls.push(data.publicUrl);
    }

    setUploadedUrls(urls);
    return urls;
  };

  // xóa file
  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreview((prev) => prev.filter((_, i) => i !== index));
  };

  // reset
  const resetFile = () => {
    setFiles([]);
    setPreview([]);
    setUploadedUrls([]);
  };

  return {
    files,
    preview,
    uploadedUrls,
    handleFile,
    uploadFiles,
    removeFile,
    resetFile,
  };
};
