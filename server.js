/* eslint-env node */
const next = require("next");
const express = require("express");
const url = require("url");
const bodyParser = require("body-parser");
const api = require("./server/server");

const dev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev, quiet: false });
const nextRequestHandler = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json());
  api(server);

  server.get("*", (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    return nextRequestHandler(req, res, parsedUrl);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
