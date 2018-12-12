import { loadableReady } from "@loadable/component";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import config from "./config";

// Load all components needed before starting rendering
loadableReady(() => {
  ReactDOM.hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById(config.rootContainer),
  );
});
