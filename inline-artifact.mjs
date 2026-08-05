import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, extname } from "path";

const dist = "dist";
const assetsDir = join(dist, "assets");
const files = readdirSync(assetsDir);
const cssFile = files.find((f) => f.endsWith(".css"));
const jsFile = files.find((f) => f.endsWith(".js"));

let css = readFileSync(join(assetsDir, cssFile), "utf8");
let js = readFileSync(join(assetsDir, jsFile), "utf8");

const mime = {
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

function inlineAsset(filename) {
  const path = join(assetsDir, filename);
  const ext = extname(filename);
  const type = mime[ext];
  if (!type) return null;
  const b64 = readFileSync(path).toString("base64");
  return `data:${type};base64,${b64}`;
}

css = css.replace(/url\(\/assets\/([^)]+)\)/g, (match, filename) => {
  const dataUri = inlineAsset(filename);
  return dataUri ? `url(${dataUri})` : match;
});

// Vite emette i riferimenti alle immagini importate come stringhe JS
// "/assets/nome-hash.jpg" dentro il bundle — non passano per il CSS,
// vanno riscritte separatamente o restano rotte nel file singolo.
js = js.replace(/\/assets\/([a-zA-Z0-9._-]+\.(?:jpg|jpeg|png|svg))/g, (match, filename) => {
  const dataUri = inlineAsset(filename);
  return dataUri ?? match;
});

const html = `<meta charset="UTF-8" />
<title>Armonya — Biorisonanza per cani e gatti</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>${css}</style>
<div id="root"></div>
<script type="module">${js}</script>
`;

writeFileSync(join(dist, "artifact.html"), html);
console.log("Wrote dist/artifact.html —", (html.length / 1024 / 1024).toFixed(2), "MB");
