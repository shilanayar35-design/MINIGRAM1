

/* FILE: main_js/ui.js */

//////////////////////////////////////////////////
// 🎨 UI SYSTEM (CLEAN VERSION)
//////////////////////////////////////////////////

console.log(
  "🎨 ui.js loaded"
);

//////////////////////////////////////////////////
// 💬 CHAT NAVIGATION
//////////////////////////////////////////////////

window.openChat =
function(){

  //////////////////////////////////////////////////
  // 🚀 LOAD CHAT PAGE
  //////////////////////////////////////////////////

  window.loadPage?.(
    "chat"
  );

};

//////////////////////////////////////////////////
// 🔔 NOTIFICATIONS NAVIGATION
//////////////////////////////////////////////////

window.openNotifications =
function(){

  //////////////////////////////////////////////////
  // 🚀 LOAD NOTIFICATIONS PAGE
  //////////////////////////////////////////////////

  window.loadPage?.(
    "notifications"
  );

};

//////////////////////////////////////////////////
// 🧹 GLOBAL PAGE CLEANER
//////////////////////////////////////////////////

window.cleanupPage =
async function(){

  try{

    //////////////////////////////////////////////////
    // 📄 CURRENT PAGE
    //////////////////////////////////////////////////

    const page =
      window.CURRENT_PAGE;

    if(!page)
      return;

    //////////////////////////////////////////////////
    // 📦 DESTROY FUNCTION NAME
    //////////////////////////////////////////////////

    const destroyName =
      page + "Destroy";

    //////////////////////////////////////////////////
    // 📦 FUNCTION
    //////////////////////////////////////////////////

    const destroyFn =

      window.FUNCTIONS?.[
        destroyName
      ];

    //////////////////////////////////////////////////
    // 🚀 RUN DESTROY
    //////////////////////////////////////////////////

    if(
      typeof destroyFn ===
      "function"
    ){

      await destroyFn();

      console.log(
        `🧹 ${page} cleaned`
      );

    }

  }catch(e){

    console.error(
      "❌ cleanupPage error:",
      e
    );

  }

};

//////////////////////////////////////////////////
// 📱 SMALL UI HELPERS
//////////////////////////////////////////////////

window.safeHide =
function(id){

  const el =
    document.getElementById(id);

  if(el){

    el.style.display =
      "none";

  }

};

window.safeShow =
function(id){

  const el =
    document.getElementById(id);

  if(el){

    el.style.display =
      "";

  }

};

//////////////////////////////////////////////////
// 🛡️ GLOBAL ERROR LOGGER
//////////////////////////////////////////////////

if(
  !window.__UI_ERROR_TRACKER
){

  window.__UI_ERROR_TRACKER =
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
  "🔥 UI SYSTEM READY"
);

/* FILE: main_js/pageloader/navigation.js */

window.initNavigation = function(){

  const homeBtn = document.getElementById("homeBtn");
  if(homeBtn){
    homeBtn.onclick = () => loadPage("home");
  }

  const searchBtn = document.getElementById("searchBtn");
  if (searchBtn) {
    searchBtn.onclick = () => loadPage("search");
  }

  const profileBtn = document.getElementById("profileBtn");
  if (profileBtn) {
    profileBtn.onclick = () => loadPage("profile");
  }

  const reelsBtn = document.getElementById("reelsBtn");
  if (reelsBtn) {
    reelsBtn.onclick = () => loadPage("reels");
  }

};
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));


/* FILE: main_js/pageloader/loader.js */

//////////////////////////////////////////////////
// 🚀 LOAD PAGE PLUGINS
//////////////////////////////////////////////////

async function loadPlugins(config){

  try{

    //////////////////////////////////////////////////
    // 🛑 NO CONFIG
    //////////////////////////////////////////////////

    if(!config){

      console.warn(
        "⚠️ No config provided"
      );

      return;

    }

    //////////////////////////////////////////////////
    // 🚀 POST SYSTEM
    //////////////////////////////////////////////////

    if(config.post?.enabled){

      console.log(
        "🚀 Loading Post Plugins"
      );

      //////////////////////////////////////////////////
      // ⚡ OPTIMIZER
      //////////////////////////////////////////////////

      await loadScript(

        "page_config/plugins/post/post_optimizer.js"

      );

      //////////////////////////////////////////////////
      // 📦 POST ENGINE
      //////////////////////////////////////////////////

      await loadScript(

        "page_config/plugins/post/post.js"

      );

      //////////////////////////////////////////////////
      // 📡 REALTIME
      //////////////////////////////////////////////////

      if(config.post?.realtime){

        await loadScript(

          "page_config/plugins/post/realtime_post.js"

        );

      }

      //////////////////////////////////////////////////
      // ✅ READY
      //////////////////////////////////////////////////

      console.log(
        "✅ Post Plugins Ready"
      );

    }

    //////////////////////////////////////////////////
    // 📴 DISABLED
    //////////////////////////////////////////////////

    else{

      console.log(
        "⚠️ Post Plugins Disabled"
      );

    }

  }catch(err){

    //////////////////////////////////////////////////
    // ❌ ERROR
    //////////////////////////////////////////////////

    console.error(
      "❌ Plugin Load Error:",
      err.message
    );

  }

}

//////////////////////////////////////////////////
// 🌍 GLOBAL EXPORT
//////////////////////////////////////////////////

window.loadPlugins =
  loadPlugins;

//////////////////////////////////////////////////
// ✅ SYSTEM READY
//////////////////////////////////////////////////

console.log(
  "🚀 Plugin Loader Ready"
);