import { useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Typography } from "@mui/material";
import { uploadImageToCloudinary } from "../utils/imageUploader";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const ImageUploader = ({ img }) => {
  const [progress, setProgress] = useState(0);
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const url = await uploadImageToCloudinary(file, (event) => {
      const percent = Math.round((event.loaded * 100) / event.total);
      setProgress(percent);
    });
    console.log("Uploaded image URL:", url);
  };
  return (
    <>
      <form>
        <img src={img} alt="Image" width="100%" />
        <input type="file" onChange={handleUpload} />
        {progress > 0 && <LinearProgressWithLabel value={progress} />}
      </form>
    </>
  );
};

export default ImageUploader;
