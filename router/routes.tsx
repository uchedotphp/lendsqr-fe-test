import { createBrowserRouter } from "react-router";
import HomePage from "../src/pages/Home";
import LoginPage from "../src/pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
]);
