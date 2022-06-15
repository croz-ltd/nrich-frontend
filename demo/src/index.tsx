import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { fetchInterceptor, xhrInterceptor } from "@nrich/notification-core";
import { Notifications } from "@nrich/notification-mui";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./index.css";

fetchInterceptor();
xhrInterceptor();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Notifications />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
