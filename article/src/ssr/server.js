import path from "path";
import fs from "fs";

import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { matchPath } from "react-router-dom";
import IndexSSR from "../../src/IndexSSR";
import { Helmet, HelmetProvider } from "react-helmet-async";
const helmetContext = {};
const PORT =
  process.env.PORT || process.env.NODE_ENV === "production" ? 80 : 3006;
const app = express();

const routes = ["/"];

app.get("/*", (req, res, next) => {
  // const activeRoute = routes.find((route) =>
  //   matchPath({ path: route }, req.path)
  // );
  // if (activeRoute) {
  const app = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={req.url}>
        <IndexSSR />
      </StaticRouter>
    </HelmetProvider>
  );
  const { helmet } = helmetContext;
  // const indexFile = path.resolve(
  //   process.env.NODE_ENV === "production"
  //     ? "./index.html"
  //     : "./build/index.html"
  // );
  // fs.readFile(indexFile, "utf8", (err, data) => {
  //   if (err) {
  //     console.error("Something went wrong:", err);
  //     return res.status(500).send("Oops, better luck next time!");
  //   }

  // let shtml = data;
  // shtml = shtml.replace(
  //   `<html lang="en">`,
  //   `<html ${helmet.htmlAttributes.toString()}>`
  // );
  // shtml = shtml.replace(`<title></title>`, helmet.title.toString());
  // shtml = shtml.replace(`<meta name="h-meta"/>`, helmet.meta.toString());
  // shtml = shtml.replace(`<meta name="h-link"/>`, helmet.link.toString());
  // data = data.replace(`<title></title>`, helmet.title.toString())
  //     .replace;

  const html = `
  <!DOCTYPE html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        ${helmet.title.toString()}
        ${helmet.priority.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${helmet.style.toString()}
        ${helmet.script.toString()}
      </head>
      <body ${helmet.bodyAttributes.toString()} >
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">
          ${app}
        </div>
        <script src="bundle.js"></script>
      </body>
    </html>`;

  // console.log(html);
  // return res.send(
  //   shtml.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
  // );
  res.send(html);
  // });
  // } else {
  //   next();
  // }
});

if (process.env.NODE_ENV === "development") {
  app.use(express.static("./.ssr-server-cache"));
  app.use(express.static("./build"));
} else {
  app.use(express.static("./"));
}

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
