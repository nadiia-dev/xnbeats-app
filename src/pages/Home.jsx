import { useDispatch, useSelector } from "react-redux";
import { selectReviews } from "../store/reviews/selectors";
import { useEffect } from "react";
import { getPosts } from "../store/reviews/actions";

const Home = () => {
  const reviews = useSelector(selectReviews);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts({ limit: 6, where: 4 }));
  }, [dispatch]);
  return <div>Home</div>;
};

export default Home;
