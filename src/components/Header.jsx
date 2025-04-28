import { Link } from "react-router-dom";

const Header = () => {
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
          <Link className="mt-4" to="/login">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
