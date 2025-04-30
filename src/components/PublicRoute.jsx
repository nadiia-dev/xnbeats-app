import { useSelector } from "react-redux";
import { selectCheckingAuth, selectIsAuth } from "../store/auth/selectors";
import { Navigate } from "react-router-dom";
import Spinner from "./Spinner";

const PublicRoute = ({ children }) => {
  const isAuth = useSelector(selectIsAuth);
  const isAuthChecking = useSelector(selectCheckingAuth);

  if (isAuthChecking) return <Spinner />;

  if (isAuth) {
    return <Navigate to="/dashboard" />;
  } else {
    return children;
  }
};

export default PublicRoute;
