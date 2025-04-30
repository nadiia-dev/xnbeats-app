import { useSelector } from "react-redux";
import { selectCheckingAuth, selectIsAuth } from "../store/auth/selectors";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isAuth = useSelector(selectIsAuth);
  const isAuthChecking = useSelector(selectCheckingAuth);

  if (isAuthChecking) return <p>Loading...</p>;

  if (isAuth) {
    return <Navigate to="/dashboard" />;
  } else {
    return children;
  }
};

export default PublicRoute;
