import * as express from "express";
import { createReadStream } from "fs";
import { getLoadableState } from "loadable-components/server";
import path from "path";
import * as React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, StaticRouterContext } from "react-router";

import App from "./app";
import FourOhFour from "./app/components/FourOhFour";

import config from "./config";


console.log("Server booting...");

const isProd = process.env.NODE_ENV === "production";
const server: express.Application = express();
const PORT = process.env.PORT || 8081;

console.log(`Prod: ${isProd} Port: ${PORT}`);

server.use("/assets", express.static("dist/client"));

server.get("*.js", (req, res, next) => {
  req.url = req.url + ".gz";
  res.setHeader("Content-Type", config.contentTypes(req.url));
  res.set("Content-Encoding", "gzip");
  next();
});

server.get("*", (req: express.Request, res: express.Response) => {
  const { httpVersion, method } = req;
  let { url } = req;
  if (!url || url === "index.html") {
    url = "/";
  }
  console.log(`${httpVersion} ${method} ${url}`);

  const staticContext: any = {};

  const app = (
    <StaticRouter context={staticContext} location={url}>
      <App />
    </StaticRouter>
  );

  try {
    getLoadableState(app).then((loadableState) => {
      const html = renderToString(app);

      const fouredOut = staticContext.statusCode === 404;

      res.setHeader("Content-Type", config.contentTypes(url));
      res.setHeader("Cache-Control", config.cacheControl(isProd, fouredOut ? 0 : 5));

      res.status(staticContext.statusCode || 200).send(`
        <!doctype html>
        <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
          <main id="${config.rootContainer}">${html}</main>
          ${loadableState.getScriptTag()}
          <script crossorigin src="${config.reactURL(isProd)}"></script>
          <script crossorigin src="${config.reactDomURL(isProd)}"></script>
          <script src="assets/${config.browserURL}"></script>
        </body>
        </html>
      `);
    });
  } catch (e) {
    console.error(e);
    url = "500.html";
    res.setHeader("Content-Type", config.contentTypes(url));
    res.setHeader("Cache-Control", config.cacheControl(isProd, 0));
    res.statusCode = 500;
    res.end("500 Internal Error");
  }
});

server.listen(PORT, () => { console.log("Server Up"); });
