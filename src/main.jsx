import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LoginPage from "./LoginPage.jsx";
import QuoteCreationPage from "./QuoteCreationPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import QuoteListPage from "./QuoteListPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/create-quote",
    element: <QuoteCreationPage />,
  },
  {
    path: "/quotes",
    element: <QuoteListPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
