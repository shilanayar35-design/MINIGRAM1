//////////////////////////////////////////////////
// 🚀 ELITE CSS LOADER v3 (SMART CACHE + NO LEAK + SPA OPTIMIZED)
//////////////////////////////////////////////////

window._ACTIVE_CSS = window._ACTIVE_CSS || new Map();
window._LOADING_CSS = window._LOADING_CSS || new Map();

//////////////////////////////////////////////////
// 🚀 LOAD CSS
//////////////////////////////////////////////////
window.loadCSS = async function(files, isGlobal = false){

  files = Array.isArray(files) ? files : [files];
  if (!files.length) return;

  for (const file of files) {

    const key = file.split("?")[0];

    // ♻️ Already loaded
    if (window._ACTIVE_CSS.has(key)) {
      console.log("♻️ CSS cached:", key);
      continue;
    }

    // ⏳ Already loading
    if (window._LOADING_CSS.has(key)) {
      await window._LOADING_CSS.get(key);
      continue;
    }

    const loadPromise = new Promise((resolve) => {

      const path = window.fixPath(file);

      fetch(path)
        .then(res => {
          if (!res.ok) throw new Error("CSS fetch failed");
          return res.text();
        })
        .then(css => {

          const style = document.createElement("style");

          style.dataset.type = isGlobal ? "global" : "page";
          style.dataset.key = key;

          style.textContent = css;

          document.head.appendChild(style);

          window._ACTIVE_CSS.set(key, style);

          console.log("✅ CSS injected:", key);

          resolve();
        })
        .catch(err => {
          console.error("❌ CSS load failed:", key);
          resolve(); // safe fail
        });

    });

    window._LOADING_CSS.set(key, loadPromise);

    await loadPromise;

    window._LOADING_CSS.delete(key);
  }
};

//////////////////////////////////////////////////
// 🧹 SMART CSS CLEANUP (NO FLICKER + NO RELOAD)
//////////////////////////////////////////////////
window.cleanupPageCSS = function(keepKeys = []){

  keepKeys = Array.isArray(keepKeys) ? keepKeys : [keepKeys];

  window._ACTIVE_CSS.forEach((style, key) => {

    if (style.dataset.type === "page" && !keepKeys.includes(key)) {
      style.remove();
      window._ACTIVE_CSS.delete(key);
    }

  });

  console.log("🧹 Smart CSS cleaned");
};

//////////////////////////////////////////////////
// ♻️ HARD RESET (FULL SAFE MODE)
//////////////////////////////////////////////////
window.resetPageCSS = function(){

  window._ACTIVE_CSS.forEach((style, key) => {

    if (!style || !style.parentNode) return;

    if (style.dataset.type === "page") {
      style.remove();
      window._ACTIVE_CSS.delete(key);
    }

  });

  console.log("♻️ Full CSS reset done");
};

//////////////////////////////////////////////////
// 🔥 FORCE RELOAD (DEV TOOL)
//////////////////////////////////////////////////
window.reloadCSS = async function(file){

  const key = file.split("?")[0];

  const old = window._ACTIVE_CSS.get(key);

  if (old) {
    old.remove();
    window._ACTIVE_CSS.delete(key);
  }

  await window.loadCSS(file);
};

//////////////////////////////////////////////////
// ⚡ SMART PREFETCH (NO DUPLICATE REQUEST)
//////////////////////////////////////////////////
window.prefetchCSS = function(files){

  files = Array.isArray(files) ? files : [files];

  files.forEach(file => {

    const key = file.split("?")[0];

    // already active → skip
    if (window._ACTIVE_CSS.has(key)) return;

    // 🔥 FIX: prevent duplicate with query params
    const exists = document.querySelector(`link[href^="${key}"][rel="prefetch"]`);
    if (exists) return;

    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "style";
    link.href = file;

    document.head.appendChild(link);
  });
};

//////////////////////////////////////////////////
// 🌍 GLOBAL CSS (RUN ONLY ONCE)
//////////////////////////////////////////////////
window.loadGlobalCSSOnce = async function(files){

  if (window.__GLOBAL_CSS_DONE__) return;

  window.__GLOBAL_CSS_DONE__ = true;

  await loadCSS(files, true);

  console.log("🌍 Global CSS loaded once");
};
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
