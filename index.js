import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import url from "node:url";

import errorHtml from "./errorHtml.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questionsPath = path.join(__dirname, "public", "questions");
const questionsRoutes = fs
  .readdirSync(questionsPath, "utf8")
  .sort((a, b) => Number(a.split(".")[0]) - Number(b.split(".")[0]));
const questions = {};
if (questionsRoutes.length > 0) {
  const q = [];
  for (const f of questionsRoutes) {
    const p = path.join(questionsPath, f);
    try {
      const data = await fs.promises.readFile(p, "utf8");
      q.push(data);
    } catch (error) {
      console.error(error);
    }
  }
  q.forEach(
    (v, i) =>
      (questions[i + 1] = {
        question: v,
        ranges: {
          a1: 0,
          a2: 100,
          g: 9.8,
          v1: 0,
          v2: 100,
          x1: 0,
          x2: 100,
          y1: 100,
          y2: 100,
          θ1: 0,
          θ2: 100,
        },
        solution: "",
      })
  );
}

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
      });
      res.write(data);
      return res.end();
    } catch (error) {
      const e = errorHtml(404, `file not found`);
      res.writeHead(404, {
        "content-type": "text/html",
        "content-encoding": "utf-8",
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
      });
      res.write(data);
      return res.end();
    } catch (error) {
      const e = errorHtml(404, `/* file not found */`);
      res.writeHead(404, {
        "content-type": "text/javascript",
        "content-encoding": "utf-8",
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
      });
      res.write(data);
      return res.end();
    } catch (error) {
      const e = errorHtml(404, `/* file not found */`);
      res.writeHead(404, {
        "content-type": "text/css",
        "content-encoding": "utf-8",
      });
      res.write(e);
      return res.end();
    }
  } else if (q === "/questions") {
    if (Object.keys(questions).length > 0) {
      const qu = JSON.stringify(questions);
      res.writeHead(200, {
        "content-type": "application/json",
        "content-encoding": "utf-8",
      });
      res.write(qu);
      return res.end();
    } else {
      res.writeHead(404, {
        "content-type": "application/json",
        "content-encoding": "utf-8",
      });
      return res.end("[]\n");
    }
  } else {
    const e = errorHtml(404, `${q} is not a recognized route`);
    res.writeHead(404, {
      "content-type": "text/html",
      "content-encoding": "utf-8",
    });
    res.write(e);
    return res.end();
  }
});

server.listen(process.env.PORT ?? 8080, () =>
  console.log(`Listening on port ${process.env.PORT ?? 8080}`)
);
