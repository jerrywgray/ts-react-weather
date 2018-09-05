import { loadComponents } from "loadable-components";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import config from "./config";

// Load all components needed before starting rendering
loadComponents().then(() => {
  ReactDOM.hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById(config.rootContainer),
  );
});
