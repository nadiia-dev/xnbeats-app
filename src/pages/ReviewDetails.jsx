import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { selectCurReview } from "../store/reviews/selectors";
import { useEffect } from "react";
import { getReviewById } from "../store/reviews/actions";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Rating } from "react-simple-star-rating";
import { clearReview } from "../store/reviews/slice";
import Spinner from "../components/Spinner";

const ReviewDetails = () => {
  const { pathname } = useLocation();
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const curReview = useSelector(selectCurReview);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (id) {
      dispatch(getReviewById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(clearReview());
  }, [dispatch]);

  return (
    <>
      {curReview ? (
        <Box display="flex" gap={3} my={5} px={5}>
          <Box flex={3}>
            <Typography variant="p" component="p">
              Reviewed by: {curReview.ownerData.name}
            </Typography>
            <Typography variant="p" component="h1">
              {curReview.title}
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: curReview.content }}></div>
          </Box>
          <Box flex={2}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={curReview.imageUrl}
                alt="image"
              />
              <CardContent>
                <Typography variant="p" component="p">
                  Our Rating:
                </Typography>
                <Rating initialValue={curReview.rating} />
              </CardContent>
            </Card>
          </Box>
        </Box>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default ReviewDetails;
