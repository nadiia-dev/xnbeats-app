import makeStyles from "@mui/styles/makeStyles";

export default makeStyles(() => ({
  card: {
    borderRadius: 5,
    width: "100%",
    height: "80vh",
    color: "black",
  },
  img: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  slider: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
