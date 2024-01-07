import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </Router>
);

reportWebVitals();
