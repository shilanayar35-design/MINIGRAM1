const fs = require("fs");
const path = require("path");

//////////////////////////////////////////////////
// 🚀 FILE GROUPS
//////////////////////////////////////////////////

const bundles = {

  "core.bundle.js": [

    "main_js/function.js",
    "main_js/utils.js",
    "main_js/interactions.js",
    "main_js/core.js"

  ],

  "ui.bundle.js": [

    "main_js/ui.js",

    "main_js/pageloader/navigation.js",

    "main_js/pageloader/loader.js"

  ],

  "feed.bundle.js": [

    "main_js/feedRenderer.js",

    "main_js/feedService.js",

    "main_js/pageloader/virtualGrid.js"

  ],

  "adaptive.bundle.js": [

    "page_config/adaptive_system/core/adaptive.js",

    "main_js/pageloader/fps.js",

    "main_js/pageloader/cpu.js"

  ]

};

//////////////////////////////////////////////////
// 🚀 BUILD
//////////////////////////////////////////////////

for(const bundleName in bundles){

  let output = "";

  for(const file of bundles[bundleName]){

    try{

      const code =
      fs.readFileSync(file, "utf8");

      output += `\n\n/* FILE: ${file} */\n\n`;

      output += code;

    }catch(e){

      console.log(
        "❌ ERROR:",
        file
      );

    }

  }

  //////////////////////////////////////////////////
  // 🚀 WRITE BUNDLE
  //////////////////////////////////////////////////

  fs.writeFileSync(

    path.join(
      "main_js/bundles",
      bundleName
    ),

    output

  );

  console.log(
    "✅ BUILT:",
    bundleName
  );

}

console.log("🎉 BUILD COMPLETE");