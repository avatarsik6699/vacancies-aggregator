import { createBrowserRouter } from "react-router-dom";
import App from "@app/App";
import AuthPage from "@pages/auth-page/auth-page";
import VacanciesPage from "@pages/vacancies-page/vacancies-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "auth",
        element: <AuthPage />,
      },
      {
        path: "vacancies",
        element: <VacanciesPage />,
      },
    ],
  },
]);
