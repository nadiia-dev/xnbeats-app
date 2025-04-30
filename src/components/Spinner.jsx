import { Box } from "@mui/material";
import { ClipLoader } from "react-spinners";

const Spinner = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <ClipLoader
        color="blue"
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Box>
  );
};

export default Spinner;
