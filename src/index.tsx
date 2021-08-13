import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./App.css";
import { DevTools, loadServer } from "jira-dev-tool";
import { AppProvider } from "./context/index";
import "antd/dist/antd.less";
import reportWebVitals from "./reportWebVitals";

loadServer(() => {
  ReactDOM.render(
    <React.StrictMode>
      <AppProvider>
        <DevTools />
        <App />
      </AppProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
