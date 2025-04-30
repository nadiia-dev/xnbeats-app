import { useSelector } from "react-redux";
import { selectCheckingAuth, selectIsAuth } from "../store/auth/selectors";
import { Navigate } from "react-router-dom";
import Spinner from "./Spinner";

const PrivateRoute = ({ children }) => {
  const isAuth = useSelector(selectIsAuth);
  const isAuthChecking = useSelector(selectCheckingAuth);

  if (isAuthChecking) return <Spinner />;

  return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
