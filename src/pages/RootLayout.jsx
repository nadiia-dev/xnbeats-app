import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ToastComponent from "../utils/toasts";

const RootLayout = () => {
  return (
    <>
      <Header />
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <ToastComponent />
    </>
  );
};

export default RootLayout;
