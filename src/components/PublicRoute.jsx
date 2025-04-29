import { useSelector } from "react-redux";
import { selectIsAuth } from "../store/auth/selectors";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isAuth = useSelector(selectIsAuth);
  if (isAuth) {
    return <Navigate to="/dashboard" />;
  } else {
    return children;
  }
};

export default PublicRoute;
