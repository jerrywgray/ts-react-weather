// App.js

import * as React from "react";
import { Route, Switch } from "react-router";
import FourOhFour from "./components/FourOhFour";
import routes from "./routes";
const RouteStatus = (props: any) => (
  <Route
    key={props.key}
    exact={props.exact}
    path={props.path}
    render={({ staticContext }) => {
      // we have to check if staticContext exists
      // because it will be undefined if rendered through a BrowserRouter
      if (staticContext) {
        staticContext.statusCode = props.statusCode;
      }

      return <div>{props.children}</div>;
    }}
  />
);

const App = (staticContext: any) => (
  <Switch>
    {Object.keys(routes).map((key) => {
      return <Route exact={key === "/"} key={key} path={key} component={routes[key]} />;
    })}
    <RouteStatus statusCode={404}>
      <FourOhFour />
    </RouteStatus>
  </Switch>
);

export default App;
