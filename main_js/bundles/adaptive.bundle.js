

/* FILE: page_config/adaptive_system/core/adaptive.js */

//////////////////////////////////////////////////
// 🚀 ADAPTIVE ENGINE (FINAL UPGRADE)
//////////////////////////////////////////////////

console.log("🚀 adaptive.js loaded");

//////////////////////////////////////////////////
// 🌍 PERFORMANCE MODE
//////////////////////////////////////////////////

window.performanceMode =
window.performanceMode || "high";

//////////////////////////////////////////////////
// 🧠 GLOBAL ADAPTIVE STORAGE
//////////////////////////////////////////////////

window.ADAPTIVE =
window.ADAPTIVE || {};

//////////////////////////////////////////////////
// 📦 LOAD ADAPTIVE FILE
//////////////////////////////////////////////////

window.loadAdaptive =
async function(id){

  //////////////////////////////////////////////////
  // ♻️ ALREADY LOADED
  //////////////////////////////////////////////////

  if(window.ADAPTIVE?.[id])
    return;

  //////////////////////////////////////////////////
  // 📜 CREATE SCRIPT
  //////////////////////////////////////////////////

  const s =
    document.createElement("script");

  s.src =
    `page_config/adaptive_system/adaptive_loader_${id}.js`;

  //////////////////////////////////////////////////
  // ❌ ERROR
  //////////////////////////////////////////////////

  s.onerror = () => {

    console.error(
      "❌ Adaptive load fail:",
      id
    );

  };

  //////////////////////////////////////////////////
  // 📦 APPEND
  //////////////////////////////////////////////////

  document.body.appendChild(s);

  //////////////////////////////////////////////////
  // ⏳ WAIT
  //////////////////////////////////////////////////

  await new Promise(r => {

    s.onload = r;

  });

  console.log(
    "✅ Adaptive loaded:",
    id
  );

};

//////////////////////////////////////////////////
// 🎨 APPLY CSS ADAPTIVE
//////////////////////////////////////////////////

window.applyAdaptive =
async function(page){

  //////////////////////////////////////////////////
  // 📦 PAGE CONFIG
  //////////////////////////////////////////////////

  const config =
    window.PAGE_CONFIG?.[page];

  //////////////////////////////////////////////////
  // ❌ NO ADAPTIVE
  //////////////////////////////////////////////////

  if(!config?.adaptive)
    return;

  //////////////////////////////////////////////////
  // 🧠 ADAPTIVE ID
  //////////////////////////////////////////////////

  const id =
    config.adaptive;

  //////////////////////////////////////////////////
  // 📦 LOAD FILE
  //////////////////////////////////////////////////

  await window.loadAdaptive(id);

  //////////////////////////////////////////////////
  // 📦 DATA
  //////////////////////////////////////////////////

  const data =
    window.ADAPTIVE?.[id];

  if(!data)
    return;

  //////////////////////////////////////////////////
  // 🌍 ROOT
  //////////////////////////////////////////////////

  const root =
    document.documentElement;

  //////////////////////////////////////////////////
  // 🔥 APPLY VARIABLES
  //////////////////////////////////////////////////

  for(const file in data){

    //////////////////////////////////////////////////
    // 📦 MODE DATA
    //////////////////////////////////////////////////

    const modeData =
      data[file]?.[
        window.performanceMode
      ];

    if(!modeData)
      continue;

    //////////////////////////////////////////////////
    // 🎨 APPLY
    //////////////////////////////////////////////////

    for(const key in modeData){

      //////////////////////////////////////////////////
      // ⚡ ONLY CSS VARS
      //////////////////////////////////////////////////

      if(
        typeof modeData[key] !==
        "object"
      ){

        root.style.setProperty(

          `--${key}`,

          modeData[key]

        );

      }

    }

  }

  console.log(

    "🎨 Adaptive applied:",

    page,

    "|",

    window.performanceMode

  );

};

//////////////////////////////////////////////////
// ⚡ GET JS ADAPTIVE DATA
//////////////////////////////////////////////////

window.getAdaptiveData =
function(file){

  //////////////////////////////////////////////////
  // 📄 CURRENT PAGE
  //////////////////////////////////////////////////

  const page =
    window.CURRENT_PAGE;

  //////////////////////////////////////////////////
  // 📦 CONFIG
  //////////////////////////////////////////////////

  const config =
    window.PAGE_CONFIG?.[page];

  //////////////////////////////////////////////////
  // ❌ NO CONFIG
  //////////////////////////////////////////////////

  if(!config?.adaptive)
    return {};

  //////////////////////////////////////////////////
  // 🧠 ADAPTIVE ID
  //////////////////////////////////////////////////

  const adaptiveId =
    config.adaptive;

  //////////////////////////////////////////////////
  // 📦 FILE DATA
  //////////////////////////////////////////////////

  const data =
    window.ADAPTIVE?.[
      adaptiveId
    ]?.[file];

  //////////////////////////////////////////////////
  // ❌ NO DATA
  //////////////////////////////////////////////////

  if(!data)
    return {};

  //////////////////////////////////////////////////
  // 🚀 RETURN MODE DATA
  //////////////////////////////////////////////////

  return (

    data[
      window.performanceMode
    ] || {}

  );

};

//////////////////////////////////////////////////
// 💀 ERROR LOGGER
//////////////////////////////////////////////////

window.addEventListener &&
window.addEventListener(

  "error",

  e => {

    console.log(

      "💀 ADAPTIVE ERROR:",

      e.filename,

      e.message

    );

  }

);

/* FILE: main_js/pageloader/fps.js */

//////////////////////////////////////////////////
//  FPS ENGINE + ADAPTIVE CONTROLLER (FINAL)
//////////////////////////////////////////////////

console.log(" fps.js loaded");

//////////////////////////////////////////////////
//  GLOBAL PERFORMANCE STATE
//////////////////////////////////////////////////

window.performanceMode =
window.performanceMode || "high";

window.__LAST_MODE =
window.__LAST_MODE || "high";

window.__FPS =
window.__FPS || 60;

window.__FPS_DROP_COUNT = 0;
window.__FPS_RISE_COUNT = 0;

//////////////////////////////////////////////////
//  FPS BOX
//////////////////////////////////////////////////

(function(){

  const box =
    document.createElement("div");

  box.id = "fpsBox";

  //////////////////////////////////////////////////
  //  STYLE
  //////////////////////////////////////////////////

  box.style.position = "fixed";
  box.style.top = "50%";
  box.style.right = "6px";

  box.style.transform =
    "translateY(-50%)";

  box.style.padding = "4px 7px";

  box.style.fontSize = "10px";
  box.style.fontWeight = "600";

  box.style.color = "#0f0";

  box.style.background =
    "rgba(0,0,0,0.45)";

  box.style.borderRadius = "7px";

  box.style.backdropFilter =
    "blur(4px)";

  box.style.zIndex = "999999";

  box.style.pointerEvents = "none";

  box.style.transition =
    "all .25s ease";

  box.innerText =
    "FPS: 0 | HIGH";

  document.body.appendChild(box);

  //////////////////////////////////////////////////
  //  ENGINE
  //////////////////////////////////////////////////

  let frames = 0;

  let last =
    performance.now();

  //////////////////////////////////////////////////
  //  MODE SWITCH SYSTEM
  //////////////////////////////////////////////////

  function updateMode(fps){

    //////////////////////////////////////////////////
    //  LOW DETECT
    //////////////////////////////////////////////////

    if(fps < 25){

      window.__FPS_DROP_COUNT++;

      window.__FPS_RISE_COUNT = 0;

      //////////////////////////////////////////////////
      //  STABLE LOW
      //////////////////////////////////////////////////

      if(
        window.__FPS_DROP_COUNT >= 2 &&
        window.performanceMode !== "low"
      ){

        window.performanceMode =
          "low";

      }

    }

    //////////////////////////////////////////////////
    //  MID DETECT
    //////////////////////////////////////////////////

    else if(fps < 45){

      window.__FPS_DROP_COUNT = 0;
      window.__FPS_RISE_COUNT = 0;

      if(
        window.performanceMode !== "mid"
      ){

        window.performanceMode =
          "mid";

      }

    }

    //////////////////////////////////////////////////
    //  HIGH DETECT
    //////////////////////////////////////////////////

    else{

      window.__FPS_RISE_COUNT++;

      window.__FPS_DROP_COUNT = 0;

      //////////////////////////////////////////////////
      //  STABLE HIGH
      //////////////////////////////////////////////////

      if(
        window.__FPS_RISE_COUNT >= 3 &&
        window.performanceMode !== "high"
      ){

        window.performanceMode =
          "high";

      }

    }

  }

  //////////////////////////////////////////////////
  //  UI UPDATE
  //////////////////////////////////////////////////

  function updateBox(fps){

    const mode =
      window.performanceMode;

    //////////////////////////////////////////////////
    //  COLORS
    //////////////////////////////////////////////////

    if(mode === "high"){

      box.style.color = "#00ff99";

    }

    else if(mode === "mid"){

      box.style.color = "#ffd500";

    }

    else{

      box.style.color = "#ff4444";

    }

    //////////////////////////////////////////////////
    //  TEXT
    //////////////////////////////////////////////////

    box.innerText =
      `FPS: ${fps} | ${mode.toUpperCase()}`;

  }

  //////////////////////////////////////////////////
  //  MAIN LOOP
  //////////////////////////////////////////////////

  function loop(now){

    frames++;

    //////////////////////////////////////////////////
    //  EVERY 1 SECOND
    //////////////////////////////////////////////////

    if(now - last >= 1000){

      const fps =
        Math.round(
          (frames * 1000) /
          (now - last)
        );

      //////////////////////////////////////////////////
      //  SAVE FPS
      //////////////////////////////////////////////////

      window.__FPS = fps;

      //////////////////////////////////////////////////
      //  UPDATE MODE
      //////////////////////////////////////////////////

      updateMode(fps);

      //////////////////////////////////////////////////
      //  UPDATE UI
      //////////////////////////////////////////////////

      updateBox(fps);

      //////////////////////////////////////////////////
      //  MODE CHANGED?
      //////////////////////////////////////////////////

      if(
        window.__LAST_MODE !==
        window.performanceMode
      ){

        console.log(
          " MODE:",
          window.__LAST_MODE,
          "",
          window.performanceMode
        );

        //////////////////////////////////////////////////
        //  SAVE LAST
        //////////////////////////////////////////////////

        window.__LAST_MODE =
          window.performanceMode;

        //////////////////////////////////////////////////
        //  APPLY ADAPTIVE
        //////////////////////////////////////////////////

        if(window.CURRENT_PAGE){

          window.applyAdaptive?.(
            window.CURRENT_PAGE
          );

        }

      }

      //////////////////////////////////////////////////
      //  RESET
      //////////////////////////////////////////////////

      frames = 0;

      last = now;

    }

    requestAnimationFrame(loop);

  }

  requestAnimationFrame(loop);

})();

//////////////////////////////////////////////////
//  ERROR LOGGER
//////////////////////////////////////////////////

window.addEventListener &&
window.addEventListener(
  "error",
  e => {

    console.log(
      " FPS ERROR:",
      e.filename,
      e.message
    );

  }
);

/* FILE: main_js/pageloader/cpu.js */

console.log("🧠 cpu.js loaded (smooth)");

(function(){

  // ================================
  // 🎯 UI
  // ================================
  const box = document.createElement("div");

  box.style.position = "fixed";
  box.style.top = "55%";
  box.style.right = "6px";
  box.style.transform = "translateY(-50%)";

  box.style.padding = "4px 6px";
  box.style.fontSize = "10px";
  box.style.fontWeight = "600";

  box.style.background = "rgba(0,0,0,0.5)";
  box.style.borderRadius = "6px";

  box.style.zIndex = "999999";
  box.style.pointerEvents = "none";

  document.body.appendChild(box);

  // ================================
  // 🧠 CPU ENGINE (SMOOTH)
  // ================================
  let last = performance.now();
  let smoothLoad = 0;

  function loop(now){

    const delta = now - last;

    // 🎯 base load calc
    let rawLoad = (delta - 16) * 4;

    rawLoad = Math.max(0, Math.min(100, rawLoad));

    // ================================
    // 🔥 SMOOTHING (EMA)
    // ================================
    smoothLoad = smoothLoad * 0.85 + rawLoad * 0.15;

    last = now;

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  // ================================
  // 🖥️ UI UPDATE (SLOW)
  // ================================
  setInterval(() => {

    const load = Math.round(smoothLoad);

    // 🎨 color
    if (load < 30) box.style.color = "#0f0";
    else if (load < 60) box.style.color = "#ff0";
    else box.style.color = "#f00";

    box.innerText = `CPU: ${load}%`;

  }, 250); // 🔥 slower update = stable

})();
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
