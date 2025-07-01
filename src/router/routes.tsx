import { createBrowserRouter } from "react-router";
import HomePage from "@pages/Home";
import LoginPage from "@pages/Login";

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
