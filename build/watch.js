const chokidar =
require("chokidar");

const { exec } =
require("child_process");

console.log(
  "👀 Watching files..."
);

chokidar.watch([

  "main_js",
  "page_config"

]).on("change", path => {

  console.log(
    "♻️ Changed:",
    path
  );

  exec(
    "node build/build.js",
    (err, stdout) => {

      console.log(stdout);

    }
  );

});