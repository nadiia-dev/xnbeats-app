import { useEffect, useRef } from "react";
import useStyles from "./style";
import { Card, CardMedia } from "@mui/material";

const ImageCarousel = ({ content }) => {
  const { imgSrc } = content;
  const classes = useStyles();
  const autoPlayRef = useRef();
  const autoPlay = 3;

  useEffect(() => {
    const play = () => {
      console.log("Autoplay");
    };

    const interval = setInterval(play, autoPlay * 1000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  return (
    <Card className={classes.card} sx={{ marginBottom: 10 }}>
      <CardMedia
        className={classes.img}
        component="img"
        src={imgSrc}
        ref={autoPlayRef}
      />
    </Card>
  );
};

export default ImageCarousel;
