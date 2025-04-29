const { VITE_CLOUD_NAME } = import.meta.env;

import axios from "axios";

export const uploadImageToCloudinary = async (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default");

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/image/upload`,
      formData,
      {
        onUploadProgress,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.secure_url;
  } catch (error) {
    console.error("Upload failed", error);
    throw error;
  }
};
