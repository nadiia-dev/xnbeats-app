import { useSelector } from "react-redux";
import { selectIsAuth } from "../store/auth/selectors";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuth = useSelector(selectIsAuth);
  if (isAuth) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
