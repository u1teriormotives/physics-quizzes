import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import url from "node:url";

import errorHtml from "./errorHtml.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
