import { useEffect, useRef } from "react";
import useStyles from "./style";
import { Card, CardMedia, Typography } from "@mui/material";

const ImageCarousel = ({ content }) => {
  const { imgSrc } = content;
  const classes = useStyles();
  const autoPlayRef = useRef();
  const autoPlay = 30;

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };

    const interval = setInterval(play, autoPlay * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className={classes.card} sx={{ marginBottom: 10 }}>
      <CardMedia className={classes.img} component="img" src={imgSrc} />
    </Card>
  );
};

export default ImageCarousel;
