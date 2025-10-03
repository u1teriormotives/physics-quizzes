import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import url from "node:url";

import errorHtml from "./errorHtml.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsStaticPath = path.join(__dirname, "public", "js");
const jsStaticRoutes = fs.readdirSync(jsStaticPath);
const jsStaticSet = new Set(jsStaticRoutes);

const cssStaticPath = path.join(__dirname, "public", "css");
const cssStaticRoutes = fs.readdirSync(cssStaticPath);
const cssStaticSet = new Set(cssStaticRoutes);

const server = http.createServer();
server.on("request", async (req, res) => {
  const q = req.url ? req.url : "";

  if (q === "/" || q === "") {
    try {
      const dataPath = path.join(__dirname, "public", "index.html");
      const data = await fs.promises.readFile(dataPath, "utf8");
      res.writeHead(200, {
        "content-type": "text/html",
        "content-encoding": "utf-8",
        "content-length": data.length,
      });
      res.write(data);
      return res.end();
    } catch (error) {
      const e = errorHtml(404, `file not found`);
      res.writeHead(404, {
        "content-type": "text/html",
        "content-encoding": "utf-8",
        "content-length": e.length,
      });
      res.write(e);
      return res.end();
    }
  } else if (q.startsWith("/js/")) {
    const file = q.replace("/js/", "");
    try {
      if (!jsStaticSet.has(file)) throw new Error(`file no in js ${file}`);
      const route = path.join(jsStaticPath, file);
      const data = await fs.promises.readFile(route, "utf8");
      res.writeHead(200, {
        "content-type": "text/javascript",
        "content-encoding": "utf-8",
        "content-length": data.length,
      });
      res.write(data);
      return res.end();
    } catch (error) {
      const e = errorHtml(404, `/* file not found */`);
      res.writeHead(404, {
        "content-type": "text/javascript",
        "content-encoding": "utf-8",
        "content-length": e.length,
      });
      res.write(e);
      return res.end();
    }
  } else if (q.startsWith("/css/")) {
    const file = q.replace("/css/", "");
    try {
      if (!cssStaticSet.has(file)) throw new Error(`file no in css ${file}`);
      const route = path.join(cssStaticPath, file);
      const data = await fs.promises.readFile(route, "utf8");
      res.writeHead(200, {
        "content-type": "text/css",
        "content-encoding": "utf-8",
        "content-length": data.length,
      });
      res.write(data);
      return res.end();
    } catch (error) {
      const e = errorHtml(404, `/* file not found */`);
      res.writeHead(404, {
        "content-type": "text/css",
        "content-encoding": "utf-8",
        "content-length": e.length,
      });
      res.write(e);
      return res.end();
    }
  } else {
    const e = errorHtml(404, `${q} is not a recognized route`);
    res.writeHead(404, {
      "content-type": "text/html",
      "content-encoding": "utf-8",
      "content-length": e.length,
    });
    res.write(e);
    return res.end();
  }
});

server.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
