/** @jsx React.DOM */

import * as React from "react";
import * as ReactDOM from "react-dom";

export default ({ body, title }) => {
    return (
      <html>
        <head>
          <title>${title}</title>
          <link rel="stylesheet" href="/assets/index.css" />
        </head>
        <body>
          <div id="root">${body}</div>
        </body>
        <script src="/assets/bundle.js"></script>
      </html>
    );
  };
