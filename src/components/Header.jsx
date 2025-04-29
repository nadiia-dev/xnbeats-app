import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectIsAuth } from "../store/auth/selectors";
import { logoutUser } from "../store/auth/actions";

const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  return (
    <header>
      <nav className="site-header py-1 sticky-top">
        <div className="container d-flex flex-row justify-content-between">
          <Link to="/" className="logo" aria-label="Product">
            XN<span>B</span>
          </Link>
          <Link className="mt-4" to="/">
            Home
          </Link>
          <Link className="mt-4" to="/contact">
            Contact
          </Link>
          {isAuth ? (
            <>
              <Link className="mt-4" to="/dashboard">
                Dashboard
              </Link>
              <div className="mt-4" onClick={() => dispatch(logoutUser())}>
                Logout
              </div>
            </>
          ) : (
            <Link className="mt-4" to="/login">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
