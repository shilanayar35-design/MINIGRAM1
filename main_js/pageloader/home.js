//////////////////////////////////////////////////
// 🏠 HOME PAGE LOADER (FINAL PAGE_CONFIG VERSION)
//////////////////////////////////////////////////

console.log(
  "🏠 pageloader/home.js loaded"
);

//////////////////////////////////////////////////
// 🚀 LOAD HOME
//////////////////////////////////////////////////

window.loadHome =
async function(container){

  try{

    console.log(
      "🏠 Loading Home..."
    );

    //////////////////////////////////////////////////
    // 📦 GET PAGE CONFIG
    //////////////////////////////////////////////////

    const config =
      window.PAGE_CONFIG?.home;

    //////////////////////////////////////////////////
    // ❌ CONFIG MISSING
    //////////////////////////////////////////////////

    if(!config){

      throw new Error(
        "Home config missing"
      );

    }

    //////////////////////////////////////////////////
    // 🛡️ SAFE CONTAINER
    //////////////////////////////////////////////////

    if(!container){

      throw new Error(
        "Container missing"
      );

    }

    //////////////////////////////////////////////////
    // 🎨 LOAD CSS
    //////////////////////////////////////////////////

    if(
      typeof window.loadCSS ===
      "function"
    ){

      await window.loadCSS?.(
        config.css || []
      );

      console.log(
        "✅ Config CSS Loaded"
      );

    }else{

      console.warn(
        "⚠️ loadCSS missing"
      );

    }

    //////////////////////////////////////////////////
    // 📦 PAGE CACHE
    //////////////////////////////////////////////////

    window.PAGE_CACHE =
      window.PAGE_CACHE ||
      new Map();

    //////////////////////////////////////////////////
    // 📦 CACHE LIMIT
    //////////////////////////////////////////////////

    if(
      window.PAGE_CACHE.size > 5
    ){

      const firstKey =

        window.PAGE_CACHE
          .keys()
          .next()
          .value;

      window.PAGE_CACHE.delete(
        firstKey
      );

    }

    //////////////////////////////////////////////////
    // 📦 LOAD HTML
    //////////////////////////////////////////////////

    let fragment;

    //////////////////////////////////////////////////
    // ⚡ CACHE HIT
    //////////////////////////////////////////////////

    if(
      window.PAGE_CACHE.has(
        "home"
      )
    ){

      console.log(
        "⚡ HOME CACHE HIT"
      );

      fragment =

        window.PAGE_CACHE
          .get("home")
          .cloneNode(true);

    }

    //////////////////////////////////////////////////
    // 🌐 FETCH HTML
    //////////////////////////////////////////////////

    else{

      console.log(
        "🌐 Fetching HTML"
      );

      //////////////////////////////////////////////////
      // ❌ NO HTML PATH
      //////////////////////////////////////////////////

      if(!config.html){

        throw new Error(
          "config.html missing"
        );

      }

      const res =

        await fetch(
          config.html
        );

      //////////////////////////////////////////////////
      // ❌ FETCH FAIL
      //////////////////////////////////////////////////

      if(!res.ok){

        throw new Error(
          "HTML fetch failed"
        );

      }

      const html =
        await res.text();

      //////////////////////////////////////////////////
      // 🚀 CREATE FRAGMENT
      //////////////////////////////////////////////////

      fragment =

        document
          .createRange()
          .createContextualFragment(
            html
          );

      //////////////////////////////////////////////////
      // 💾 SAVE CACHE
      //////////////////////////////////////////////////

      window.PAGE_CACHE.set(

        "home",

        fragment.cloneNode(true)

      );

      console.log(
        "💾 Home Cached"
      );

    }

    //////////////////////////////////////////////////
    // 🚀 FAST RENDER
    //////////////////////////////////////////////////

    container.replaceChildren(
      fragment
    );

    console.log(
      "✅ HTML Rendered"
    );

    //////////////////////////////////////////////////
    // 💥 RESET STORIES
    //////////////////////////////////////////////////

    window.STORIES_INITIALIZED =
      false;

    const storiesWrapper =

      document.getElementById(
        "storiesWrapper"
      );

    if(storiesWrapper){

      //////////////////////////////////////////////////
      // 🧹 HARD RESET
      //////////////////////////////////////////////////

      storiesWrapper
        .replaceChildren();

      //////////////////////////////////////////////////
      // 👁️ FORCE VISIBLE
      //////////////////////////////////////////////////

      storiesWrapper.style.display =
        "";

      storiesWrapper.style.visibility =
        "visible";

      storiesWrapper.style.opacity =
        "1";

    }

    //////////////////////////////////////////////////
    // ⚡ WAIT DOM PAINT
    //////////////////////////////////////////////////

    await new Promise(

      resolve => {

        requestAnimationFrame(
          resolve
        );

      }

    );

    //////////////////////////////////////////////////
    // 📜 LOAD PAGE JS
    //////////////////////////////////////////////////

    if(
      typeof window.loadJS ===
      "function"
    ){

      await window.loadJS?.(
        config.js || []
      );

      console.log(
        "✅ Config JS Loaded"
      );

    }else{

      console.warn(
        "⚠️ loadJS missing"
      );

    }

    //////////////////////////////////////////////////
    // 🧠 RESET PAGE STATE
    //////////////////////////////////////////////////

    window.STATE =
      window.STATE || {};

    window.STATE.PAGE = 0;
    window.STATE.FEED = [];
    window.STATE.END = false;
    window.STATE.LOADING = false;

    //////////////////////////////////////////////////
    // 🚀 INIT PAGE
    //////////////////////////////////////////////////

    const initFunction =

      window.FUNCTIONS?.[
        config.init
      ];

    if(
      typeof initFunction ===
      "function"
    ){

      await initFunction();

      console.log(
        "✅ Page Init Success"
      );

    }else{

      console.warn(
        "⚠️ Init function missing"
      );

    }

    //////////////////////////////////////////////////
    // 📚 INIT STORIES
    //////////////////////////////////////////////////

    if(
      typeof window.initStories ===
      "function"
    ){

      try{

        //////////////////////////////////////////////////
        // ⚡ WAIT FINAL PAINT
        //////////////////////////////////////////////////

        await new Promise(

          resolve => {

            requestAnimationFrame(()=>{

              requestAnimationFrame(
                resolve
              );

            });

          }

        );

        //////////////////////////////////////////////////
        // 🚀 INIT STORIES
        //////////////////////////////////////////////////

        window.initStories();

        console.log(
          "✅ Stories Ready"
        );

      }catch(e){

        console.error(
          "❌ initStories error:",
          e
        );

      }

    }

    //////////////////////////////////////////////////
    // 📜 LOAD SCROLL ENGINE
    //////////////////////////////////////////////////

    if(
      config.scroll?.enabled
    ){

      const scrollFile =

        `page_config/scroll/scroll_${config.scroll.config}.js`;

      //////////////////////////////////////////////////
      // 🚀 LOAD SCROLL FILE
      //////////////////////////////////////////////////

      await window.loadJS?.([
        scrollFile
      ]);

      //////////////////////////////////////////////////
      // 🚀 INIT SCROLL
      //////////////////////////////////////////////////

      if(
        typeof window.initScroll ===
        "function"
      ){

        //////////////////////////////////////////////////
        // ♻️ PREVENT DOUBLE INIT
        //////////////////////////////////////////////////

        if(
          !window.__SCROLL_INITIALIZED
        ){

          window.initScroll();

          window.__SCROLL_INITIALIZED =
            true;

          console.log(
            "✅ Dynamic Scroll Ready"
          );

        }else{

          console.log(
            "⚠️ Scroll already initialized"
          );

        }

      }

    }

    //////////////////////////////////////////////////
    // 🎉 DONE
    //////////////////////////////////////////////////

    console.log(
      "🚀 Home Ready"
    );

  }catch(err){

    //////////////////////////////////////////////////
    // 💀 FINAL CRASH
    //////////////////////////////////////////////////

    console.error(
      "❌ Home Load Error:",
      err
    );

    if(container){

      const crash =

        document.createElement(
          "div"
        );

      //////////////////////////////////////////////////
      // 🎨 STYLE
      //////////////////////////////////////////////////

      crash.style.color =
        "white";

      crash.style.padding =
        "30px";

      crash.style.textAlign =
        "center";

      crash.style.fontSize =
        "18px";

      //////////////////////////////////////////////////
      // 💀 UI
      //////////////////////////////////////////////////

      crash.innerHTML = `

        ❌ HOME CRASH

        <br><br>

        Check console logs

      `;

      //////////////////////////////////////////////////
      // 🚀 RENDER
      //////////////////////////////////////////////////

      container.replaceChildren(
        crash
      );

    }

  }

};

//////////////////////////////////////////////////
// 🛡️ GLOBAL ERROR TRACK
//////////////////////////////////////////////////

if(
  !window.__GLOBAL_ERROR_TRACKER
){

  window.__GLOBAL_ERROR_TRACKER =
    true;

  window.addEventListener?.(

    "error",

    e => {

      console.log(

        "💀 ERROR IN FILE:",

        e.filename,

        e.message,

        "LINE:",

        e.lineno

      );

    }

  );

}

//////////////////////////////////////////////////
// 🎉 READY
//////////////////////////////////////////////////

console.log(
  "🔥 HOME LOADER READY"
);