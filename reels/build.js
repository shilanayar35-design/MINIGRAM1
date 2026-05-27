require("esbuild").build({
  entryPoints: ["./main.js"],
  bundle: true,
  outfile: "./reels.bundle.js",
  minify: false
}).then(() => {
  console.log("🔥 Bundle Done");
}).catch(() => process.exit(1));
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
