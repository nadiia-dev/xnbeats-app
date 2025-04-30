import { useDispatch, useSelector } from "react-redux";
import { selectPosts } from "../store/reviews/selectors";
import { useEffect, useState } from "react";
import { getPosts } from "../store/reviews/actions";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Slide,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import useStyles from "../components/style";
import ImageCarousel from "../components/ImageCarousel";
import Arrow from "../components/Arrow";

const contents = [
  {
    imgSrc:
      "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
    title: "Slide 1",
  },
  {
    imgSrc:
      "https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80",
    title: "Slide 2",
  },
  {
    imgSrc:
      "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80",
    title: "Slide 3",
  },
  {
    imgSrc:
      "https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80",
    title: "Slide 4",
  },
];

const Home = () => {
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();
  const [slideIn, setSlideIn] = useState(true);
  const [slideDirection, setSlideDirection] = useState("down");
  const [index, setIndex] = useState(0);
  const content = contents[index];
  const numSlides = contents.length;

  const onArrowClick = (direction) => {
    const increment = direction === "left" ? -1 : 1;
    const newIndex = (index + increment + numSlides) % numSlides;
    const oppDirection = direction === "left" ? "right" : "left";
    setSlideDirection(direction);
    setSlideIn(false);

    setTimeout(() => {
      setIndex(newIndex);
      setSlideDirection(oppDirection);
      setSlideIn(true);
    }, 500);
  };

  const classes = useStyles();

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(getPosts({ limit: 2, where: 2 }));
    }
  }, [dispatch, posts]);

  const renderFeaturedPosts = () => {
    if (posts.length === 0) return null;

    return posts.map((post) => (
      <Card key={post.id}>
        <CardHeader
          title={`Created at ${new Date(post.createdAt).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "short",
              day: "numeric",
            }
          )}`}
          sx={{ background: "EFEEEA", borderBottom: "1px solid lightgray" }}
        />
        <CardContent>
          <Typography variant="h5" component="p">
            {post.title}
          </Typography>
          <Typography>{post.content}</Typography>
          <Link to={`/dashboard/reviews/${post.id}`}>Read more</Link>
        </CardContent>
      </Card>
    ));
  };

  return (
    <Box px={3}>
      <Box className={classes.slider}>
        <Arrow direction="left" handleClick={() => onArrowClick("left")} />
        <Slide in={slideIn} direction={slideDirection}>
          <div style={{ margin: "0 1rem" }}>
            <ImageCarousel content={content} />
          </div>
        </Slide>
        <Arrow direction="right" handleClick={() => onArrowClick("right")} />
      </Box>
      <Box sx={{ marginBottom: 10 }}>
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          gutterBreakpoints={{ 350: "12px", 750: "16px", 900: "24px" }}
        >
          <Masonry>{renderFeaturedPosts()}</Masonry>
        </ResponsiveMasonry>
      </Box>
    </Box>
  );
};

export default Home;
