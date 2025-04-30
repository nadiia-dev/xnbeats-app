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
import Profile from "./pages/Profile";
import Reviews from "./pages/reviews/Reviews";
import AddEdit from "./pages/reviews/AddEdit";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
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
      {
        path: "/dashboard/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/reviews",
        element: (
          <PrivateRoute>
            <Reviews />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/reviews/add",
        element: (
          <PrivateRoute>
            <AddEdit />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/reviews/edit/:id",
        element: (
          <PrivateRoute>
            <AddEdit />
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
