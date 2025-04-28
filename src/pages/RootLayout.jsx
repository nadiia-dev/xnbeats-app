import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ToastComponent from "../utils/toasts";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ToastComponent />
    </>
  );
};

export default RootLayout;
