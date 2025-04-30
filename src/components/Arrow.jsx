import { Fab } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Arrow = ({ direction, handleClick }) => {
  return (
    <Fab
      style={{
        padding: "2em",
        backgroundColor: "unset",
        boxShadow: "unset",
        border: "1px solid",
      }}
      onClick={handleClick}
    >
      {direction === "right" ? (
        <ArrowForwardIosIcon />
      ) : (
        <ArrowBackIosNewIcon />
      )}
    </Fab>
  );
};

export default Arrow;
