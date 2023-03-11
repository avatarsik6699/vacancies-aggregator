import { RouterProvider as Router } from "react-router-dom";
import { router } from "@app/router/router";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router router={router} />
);
