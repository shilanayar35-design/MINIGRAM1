//////////////////////////////////////////////////
// 🚀 PAGE LOADER V2 (ULTRA OPTIMIZED + SEARCH FIX)
//////////////////////////////////////////////////

console.log(
  "🚀 PAGE LOADER V2 LOADED"
);

//////////////////////////////////////////////////
// 🌍 SAFE PATH
//////////////////////////////////////////////////

window.BASE_PATH =

  window.BASE_PATH ||

  location.pathname.replace(
    /\/[^/]*$/,
    "/"
  );

window.fixPath = function(path){

  if(!path) return path;

  if(

    path.startsWith("http") ||

    path.startsWith("/") ||

    path.startsWith("data:")

  ){

    return path;

  }

  return window.BASE_PATH + path;

};

//////////////////////////////////////////////////
// 🌍 GLOBAL STATE
//////////////////////////////////////////////////

window.CURRENT_PAGE =
window.CURRENT_PAGE || null;

window.LAST_PAGE =
window.LAST_PAGE || null;

window.PAGE_LOAD_TIME =
window.PAGE_LOAD_TIME || 0;

let LOAD_ID = 0;

let LOADING = false;

let ACTIVE_PAGE_ID = 0;

//////////////////////////////////////////////////
// 🧠 MEMORY
//////////////////////////////////////////////////

window.PAGE_CACHE =
window.PAGE_CACHE || new Map();

window.PAGE_STATE =
window.PAGE_STATE || new Map();

window.PAGE_HTML_CACHE =
window.PAGE_HTML_CACHE || new Map();

//////////////////////////////////////////////////
// 📱 LOW-END CHECK
//////////////////////////////////////////////////

window.IS_LOW_END =

  window.IS_LOW_END ||

  (
    navigator.deviceMemory &&
    navigator.deviceMemory <= 4
  );

//////////////////////////////////////////////////
// ⚡ HTML FETCH CACHE
//////////////////////////////////////////////////

async function fetchHTML(url){

  //////////////////////////////////////////////////
  // ♻️ CACHE HIT
  //////////////////////////////////////////////////

  if(
    window.PAGE_HTML_CACHE.has(url)
  ){

    return window
      .PAGE_HTML_CACHE
      .get(url);

  }

  //////////////////////////////////////////////////
  // 🌐 FETCH
  //////////////////////////////////////////////////

  const res =
    await fetch(
      window.fixPath(url)
    );

  if(!res.ok){

    throw new Error(
      `Fetch failed: ${url}`
    );

  }

  //////////////////////////////////////////////////
  // 📄 HTML
  //////////////////////////////////////////////////

  const html =
    await res.text();

  //////////////////////////////////////////////////
  // 💾 CACHE
  //////////////////////////////////////////////////

  window.PAGE_HTML_CACHE
    .set(url, html);

  return html;

}

//////////////////////////////////////////////////
// 🛡️ SAFE RUN
//////////////////////////////////////////////////

function safeRun(fn){

  try{

    return fn?.();

  }catch(e){

    console.warn(
      "⚠️ SAFE RUN:",
      e
    );

  }

}

//////////////////////////////////////////////////
// 🎯 APPLY LAYOUT
//////////////////////////////////////////////////

function applyLayout(layout){

  //////////////////////////////////////////////////
  // 📌 APPBAR
  //////////////////////////////////////////////////

  document
    .getElementById("appbar")
    ?.style
    .setProperty(

      "display",

      layout?.appbar === false
      ? "none"
      : "flex"

    );

  //////////////////////////////////////////////////
  // 📌 BOTTOM NAV
  //////////////////////////////////////////////////

  document
    .getElementById("bottomNav")
    ?.style
    .setProperty(

      "display",

      layout?.bottomNav === false
      ? "none"
      : "flex"

    );

}

//////////////////////////////////////////////////
// 🧹 CACHE LIMIT
//////////////////////////////////////////////////

function cleanupCache(){

  //////////////////////////////////////////////////
  // 📦 LIMIT
  //////////////////////////////////////////////////

  const LIMIT =

    window.IS_LOW_END
    ? 2
    : 5;

  while(
    window.PAGE_CACHE.size > LIMIT
  ){

    const firstKey =

      window.PAGE_CACHE
      .keys()
      .next()
      .value;

    window.PAGE_CACHE
      .delete(firstKey);

  }

}

//////////////////////////////////////////////////
// 🚀 MAIN PAGE LOADER
//////////////////////////////////////////////////

window.loadPage =
async function(
  page,
  force = false
){

  //////////////////////////////////////////////////
  // 🛑 DOUBLE LOAD BLOCK
  //////////////////////////////////////////////////

  if(
    LOADING &&
    !force
  ){

    return;

  }

  LOADING = true;

  //////////////////////////////////////////////////
  // 🧠 IDS
  //////////////////////////////////////////////////

  const pageId =
    ++ACTIVE_PAGE_ID;

  const thisLoad =
    ++LOAD_ID;

  //////////////////////////////////////////////////
  // 📦 CONTAINER
  //////////////////////////////////////////////////

  const container =

    document.getElementById(
      "mainContent"
    );

  if(!container){

    LOADING = false;

    return;

  }

  //////////////////////////////////////////////////
  // 🧠 STALE CHECK
  //////////////////////////////////////////////////

  const isStale = ()=>{

    return (

      thisLoad !== LOAD_ID ||

      pageId !== ACTIVE_PAGE_ID

    );

  };

  //////////////////////////////////////////////////
  // 🚀 START
  //////////////////////////////////////////////////

  try{

    console.log(
      "🚀 Loading:",
      page
    );

    //////////////////////////////////////////////////
    // 🧠 SAVE LAST
    //////////////////////////////////////////////////

    window.LAST_PAGE =
      window.CURRENT_PAGE;

    //////////////////////////////////////////////////
    // ⏱️ TIMER
    //////////////////////////////////////////////////

    window.PAGE_LOAD_TIME =
      performance.now();

    //////////////////////////////////////////////////
    // ⚡ CONFIG
    //////////////////////////////////////////////////

    await window
      .ensurePageConfig?.(
        page
      );

    //////////////////////////////////////////////////
    // 📦 GET CONFIG
    //////////////////////////////////////////////////

    const config =

      window.PAGE_CONFIG?.[
        page
      ];

    if(!config){

      throw new Error(
        "Invalid config"
      );

    }

    //////////////////////////////////////////////////
    // 💾 SAVE PAGE STATE
    //////////////////////////////////////////////////

    if(window.CURRENT_PAGE){

      //////////////////////////////////////////////////
      // 🔥 SAVE SEARCH PAGE SCROLL
      //////////////////////////////////////////////////

      if(
        window.CURRENT_PAGE ===
        "search"
      ){

        const searchPage =

          document.querySelector(
            ".searchPage"
          );

        window.PAGE_STATE.set(

          "search",

          {
            scroll:
              searchPage?.scrollTop || 0
          }

        );

      }

      //////////////////////////////////////////////////
      // 🌍 NORMAL PAGE SCROLL
      //////////////////////////////////////////////////

      else{

        window.PAGE_STATE.set(

          window.CURRENT_PAGE,

          {
            scroll:
              window.scrollY
          }

        );

      }

    }

    //////////////////////////////////////////////////
    // 🌍 CURRENT PAGE
    //////////////////////////////////////////////////

    window.CURRENT_PAGE =
      page;

    //////////////////////////////////////////////////
    // 🎨 CSS LOAD
    //////////////////////////////////////////////////

    const cssPromise =

      config.css

      ? loadCSS(config.css)

      : Promise.resolve();

    //////////////////////////////////////////////////
    // 🔥 NO DOM CACHE FOR SEARCH
    //////////////////////////////////////////////////

    if(page === "search"){

      console.log(
        "🚫 Search DOM cache disabled"
      );

    }else{

      //////////////////////////////////////////////////
      // ♻️ CACHE HIT
      //////////////////////////////////////////////////

      const cached =

        window.PAGE_CACHE
        .get(page);

      //////////////////////////////////////////////////
      // 🚀 RESTORE CACHE
      //////////////////////////////////////////////////

      if(
        cached &&
        !force
      ){

        console.log(
          "♻️ CACHE HIT:",
          page
        );

        //////////////////////////////////////////////////
        // ⚡ FAST HTML RESTORE
        //////////////////////////////////////////////////

        container.innerHTML =
          cached;

        //////////////////////////////////////////////////
        // 🎨 WAIT CSS
        //////////////////////////////////////////////////

        await cssPromise;

        //////////////////////////////////////////////////
        // 🚀 INIT CORE
        //////////////////////////////////////////////////

        safeRun(()=>
          window.initIcons?.()
        );

        safeRun(()=>
          window.initNavigation?.()
        );

        //////////////////////////////////////////////////
        // 🎯 LAYOUT
        //////////////////////////////////////////////////

        applyLayout(
          config.layout
        );

        //////////////////////////////////////////////////
        // 🚀 ADAPTIVE
        //////////////////////////////////////////////////

        await window
          .applyAdaptive?.(
            page
          );

        //////////////////////////////////////////////////
        // 🎨 SHOW
        //////////////////////////////////////////////////

        requestAnimationFrame(()=>{

          container.style.opacity =
            "1";

        });

        //////////////////////////////////////////////////
        // 📜 RESTORE SCROLL
        //////////////////////////////////////////////////

        const saved =

          window.PAGE_STATE
          .get(page);

        if(saved?.scroll){

          requestAnimationFrame(()=>{

            window.scrollTo(
              0,
              saved.scroll
            );

          });

        }

        LOADING = false;

        return;

      }

    }

    //////////////////////////////////////////////////
    // 🧹 RESET UI
    //////////////////////////////////////////////////

    container.style.opacity =
      "0";

    //////////////////////////////////////////////////
    // 🏠 HOME SPECIAL
    //////////////////////////////////////////////////

    if(page === "home"){

      //////////////////////////////////////////////////
      // 🚀 PLUGINS
      //////////////////////////////////////////////////

      await window
        .loadPlugins?.(
          config
        );

      //////////////////////////////////////////////////
      // 🏠 LOAD HOME
      //////////////////////////////////////////////////

      await safeRun(()=>

        window.loadHome?.(
          container
        )

      );

      //////////////////////////////////////////////////
      // 💾 SAVE CACHE
      //////////////////////////////////////////////////

      if(page !== "search"){

        window.PAGE_CACHE.set(

          page,

          container.innerHTML

        );

      }

    }

    //////////////////////////////////////////////////
    // 🌐 NORMAL PAGE
    //////////////////////////////////////////////////

    else{

      //////////////////////////////////////////////////
      // 📄 FETCH HTML
      //////////////////////////////////////////////////

      const html =

        await fetchHTML(
          config.html
        );

      //////////////////////////////////////////////////
      // ⚡ FAST INSERT
      //////////////////////////////////////////////////

      container.innerHTML =
        html;

      //////////////////////////////////////////////////
      // 💾 SAVE CACHE
      //////////////////////////////////////////////////

      if(page !== "search"){

        window.PAGE_CACHE.set(

          page,

          html

        );

      }

    }

    //////////////////////////////////////////////////
    // 🧹 CLEAN CACHE
    //////////////////////////////////////////////////

    cleanupCache();

    //////////////////////////////////////////////////
    // 🛑 STALE
    //////////////////////////////////////////////////

    if(isStale()) return;

    //////////////////////////////////////////////////
    // 🎨 WAIT CSS
    //////////////////////////////////////////////////

    await cssPromise;

    //////////////////////////////////////////////////
    // 🚀 CORE INIT
    //////////////////////////////////////////////////

    safeRun(()=>
      window.initIcons?.()
    );

    safeRun(()=>
      window.initNavigation?.()
    );

    //////////////////////////////////////////////////
    // ⚡ PAGE JS
    //////////////////////////////////////////////////

    if(page !== "home"){

      //////////////////////////////////////////////////
      // 🚀 LOAD PLUGINS
      //////////////////////////////////////////////////

      await window
        .loadPlugins?.(
          config
        );

      //////////////////////////////////////////////////
      // 🚀 LOAD PAGE JS
      //////////////////////////////////////////////////

      if(config.js){

        await loadJS(
          config.js
        );

      }

      //////////////////////////////////////////////////
      // 🎬 DOUBLE RAF
      //////////////////////////////////////////////////

      await new Promise(r=>

        requestAnimationFrame(()=>

          requestAnimationFrame(r)

        )

      );

      if(isStale()) return;

      //////////////////////////////////////////////////
      // 🚀 INIT PAGE
      //////////////////////////////////////////////////

      const initFn =

        window.FUNCTIONS?.[
          config.init
        ];

      await safeRun(()=>

        initFn?.(pageId)

      );

    }

    //////////////////////////////////////////////////
    // 🎯 APPLY LAYOUT
    //////////////////////////////////////////////////

    applyLayout(
      config.layout
    );

    //////////////////////////////////////////////////
    // 🚀 APPLY ADAPTIVE
    //////////////////////////////////////////////////

    await window
      .applyAdaptive?.(
        page
      );

    //////////////////////////////////////////////////
    // 🎨 SHOW PAGE
    //////////////////////////////////////////////////

    requestAnimationFrame(()=>{

      container.style.opacity =
        "1";

    });

    //////////////////////////////////////////////////
    // 📜 SEARCH PAGE SCROLL RESTORE
    //////////////////////////////////////////////////

    if(page === "search"){

      requestAnimationFrame(()=>{

        const saved =

          window.PAGE_STATE
          .get("search");

        const searchPage =

          document.querySelector(
            ".searchPage"
          );

        if(
          saved &&
          searchPage
        ){

          searchPage.scrollTop =
            saved.scroll || 0;

        }

      });

    }

    //////////////////////////////////////////////////
    // 🌍 NORMAL PAGE SCROLL
    //////////////////////////////////////////////////

    else{

      window.scrollTo(
        0,
        0
      );

    }

    //////////////////////////////////////////////////
    // 📊 LOAD TIME
    //////////////////////////////////////////////////

    console.log(

      "✅ Loaded:",

      page,

      "| ⏱️",

      Math.round(

        performance.now() -
        window.PAGE_LOAD_TIME

      ),

      "ms"

    );

  }

  //////////////////////////////////////////////////
  // 💀 ERROR
  //////////////////////////////////////////////////

  catch(err){

    console.error(
      "❌ Load fail:",
      err
    );

    container.innerHTML = `

      <div
        style="
          color:white;
          padding:20px;
          text-align:center;
        "
      >

        ❌ Failed to load page

        <br><br>

        <button
          onclick="loadPage('${page}')"

          style="
            padding:10px 16px;
            background:#ff3040;
            border:none;
            border-radius:8px;
            color:#fff;
          "
        >

          Retry

        </button>

      </div>

    `;

  }

  //////////////////////////////////////////////////
  // 🧹 END
  //////////////////////////////////////////////////

  finally{

    LOADING = false;

  }

};

//////////////////////////////////////////////////
// 💀 GLOBAL ERROR LOGGER
//////////////////////////////////////////////////

window.addEventListener?.(

  "error",

  e => {

    console.log(

      "💀 PAGE LOADER ERROR:",

      e.filename,

      e.message

    );

  }

);

console.log(
  "🎉 PAGE LOADER V2 READY"
);