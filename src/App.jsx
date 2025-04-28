import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import RootLayout from "./pages/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/contact", element: <Contact /> },
      { path: "/dashboard", element: <Contact /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
