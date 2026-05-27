//////////////////////////////////////////////////
// 🚀 ULTIMATE JS LOADER v3 (STABLE + SAFE + NO FAKE LOAD)
//////////////////////////////////////////////////

window._LOADED_JS = window._LOADED_JS || new Set();
window._LOADING_JS = window._LOADING_JS || new Map();

//////////////////////////////////////////////////
// 🚀 LOAD JS
//////////////////////////////////////////////////
window.loadJS = async function(files){

  files = Array.isArray(files) ? files : [files];
  if (!files || files.length === 0) return;

  for (const file of files){

    // ♻️ Already loaded
    if (window._LOADED_JS.has(file)){
      console.log("♻️ JS cached:", file);
      continue;
    }

    // ⏳ Already loading
    if (window._LOADING_JS.has(file)){
      await window._LOADING_JS.get(file);
      continue;
    }

    const loadPromise = new Promise((resolve)=>{

      const existing = document.querySelector(`script[data-src="${file}"]`);

      if (existing){
        window._LOADED_JS.add(file);
        return resolve();
      }

      const script = document.createElement("script");

      script.src = window.fixPath(file);

      // ✅ FIXED (no conflict)
      script.async = false;

      script.dataset.src = file;

      let done = false;
      let retried = false;

      //////////////////////////////////////////////////
      // ⏱️ TIMEOUT PROTECTION (SAFE)
      //////////////////////////////////////////////////
      const timeout = setTimeout(()=>{
        if (!done){
          console.error("⏱️ JS timeout:", file);

          done = true;
          clearTimeout(timeout);

          window._LOADING_JS.delete(file);

          resolve(); // ❗ don't mark as loaded
        }
      }, 8000);

      //////////////////////////////////////////////////
      // ✅ SUCCESS
      //////////////////////////////////////////////////
      script.onload = () => {
        if (done) return;

        console.log("✅ JS loaded:", file);

        done = true;
        clearTimeout(timeout);

        window._LOADED_JS.add(file);
        window._LOADING_JS.delete(file);

        resolve();
      };

      //////////////////////////////////////////////////
      // ❌ ERROR + RETRY
      //////////////////////////////////////////////////
      script.onerror = () => {

        if (!retried){
          retried = true;

          console.warn("🔁 retry:", file);

          script.remove();

          setTimeout(()=>{
            window._LOADING_JS.delete(file);
            window.loadJS([file]).then(resolve);
          }, 120);

        } else {
          console.error("❌ failed:", file);

          done = true;
          clearTimeout(timeout);

          window._LOADING_JS.delete(file);

          resolve(); // ❗ don't mark as loaded
        }
      };

      document.body.appendChild(script);
    });

    window._LOADING_JS.set(file, loadPromise);

    await loadPromise;
  }
};

//////////////////////////////////////////////////
// 🧹 RESET JS CACHE (DEV TOOL)
//////////////////////////////////////////////////
window.resetJS = function(){

  document.querySelectorAll("script[data-src]").forEach(s => s.remove());

  window._LOADED_JS.clear();
  window._LOADING_JS.clear();

  console.log("🧹 JS cache cleared");
};

//////////////////////////////////////////////////
// ⚡ SMART PREFETCH (NO DUPLICATE)
//////////////////////////////////////////////////
window.prefetchJS = function(files){

  files = Array.isArray(files) ? files : [files];

  files.forEach(file => {

    if (window._LOADED_JS.has(file)) return;

    if (document.querySelector(`link[href="${file}"][rel="prefetch"]`)) return;

    const link = document.createElement("link");

    link.rel = "prefetch";
    link.as = "script";
    link.href = file;

    document.head.appendChild(link);
  });
};

//////////////////////////////////////////////////
// ⚡ CRITICAL JS (PRIORITY LOAD)
//////////////////////////////////////////////////
window.loadCriticalJS = async function(files){
  console.log("⚡ Critical JS loading...");
  await window.loadJS(files);
};

//////////////////////////////////////////////////
// 🎨 FONT APPLY (GLOBAL SAFE)
//////////////////////////////////////////////////
function applyFonts(page){

  const f = window.PAGE_CONFIG[page]?.fonts || {};

  const root = document.documentElement;

  root.style.setProperty("--font-ui", `${f.ui || "Open Sans"}, system-ui, sans-serif`);
  root.style.setProperty("--font-title", `${f.title || "Poppins"}, sans-serif`);
  root.style.setProperty("--font-caption", `${f.caption || "Comfortaa"}, sans-serif`);
}
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
