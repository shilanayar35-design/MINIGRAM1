// ================================
// GLOBAL STATE (SINGLE SOURCE)
// ================================

window.STATE = window.STATE || {
  FEED: [],
  PAGE: 0,
  LIMIT: 5,
  LOADING: false,
  END: false,
  postChannel: null
};


// ================================
// NAVIGATION (SAFE + NO CRASH)
// ================================

function initNavigation(){

  console.log("🧭 INIT NAV");

  try{

    const homeBtn = document.getElementById("homeBtn");
    const searchBtn = document.getElementById("searchBtn");
    const profileBtn = document.getElementById("profileBtn");
    const reelsBtn = document.getElementById("reelsBtn");
    const createBtn = document.getElementById("createBtn");

    if(homeBtn){
      homeBtn.onclick = () => window.loadPage?.("home");
    }

    if(searchBtn){
      searchBtn.onclick = () => window.loadPage?.("search");
    }

    if(profileBtn){
      profileBtn.onclick = () => window.loadPage?.("profile");
    }

    if(reelsBtn){
      reelsBtn.onclick = () => window.loadPage?.("reels");
    }

    if(createBtn){
      createBtn.onclick = () => window.createPost?.();
    }

  }catch(e){
    console.error("❌ NAV INIT ERROR:", e);
  }

}


// ================================
// APP INIT (🔥 SINGLE ENTRY POINT FIX)
// ================================

document.addEventListener("DOMContentLoaded",()=>{

  console.log("🔥 DOM READY");

  // ❌ IMPORTANT:
  // initApp() REMOVED → no double start
  // startApp() handled by pageLoader.js ONLY

  try{
    initNavigation();   // ✅ only navigation here
  }catch(e){
    console.error("❌ NAV CRASH:", e);
  }

});


// ================================
// SAFE GLOBAL EXPORTS
// ================================

// 🔥 Only assign if exists (no override bugs)

if(typeof window.loadPage !== "function" && typeof loadPage === "function"){
  window.loadPage = loadPage;
}

if(typeof window.createPost !== "function" && typeof createPost === "function"){
  window.createPost = createPost;
}

if(typeof window.openChat !== "function" && typeof openChat === "function"){
  window.openChat = openChat;
}
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
