import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import Layout from "../pages/Layout";
import ErrorPage from "../pages/ErrorPage";
import NotFoundPage from "../pages/NotFoundPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { path: "/", element: <HomePage/> },
      { path: "/login", Component: LoginPage },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    Component: Layout,
    children: [{ path: "*", Component: NotFoundPage }],
    errorElement: <ErrorPage />,
  },
]);

export default router;
