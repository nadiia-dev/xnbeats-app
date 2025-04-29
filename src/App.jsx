import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import RootLayout from "./pages/RootLayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { autoSignIn } from "./store/auth/actions";
import { selectLoading } from "./store/auth/selectors";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <PublicRoute>
            <Home />
          </PublicRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/contact",
        element: (
          <PublicRoute>
            <Contact />
          </PublicRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(autoSignIn());
  }, [dispatch]);

  return (
    <>{loading ? <p>Loading...</p> : <RouterProvider router={router} />}</>
  );
}

export default App;
