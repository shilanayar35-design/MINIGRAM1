console.log("🔥 state.js loaded");

// ================================
// 🧠 GLOBAL STATE (SAFE INIT)
// ================================
window.REELS_STATE = window.REELS_STATE || {
  container: null,
  reels: [],
  data: [],
  index: 0,
  isFetching: false,
  lastId: null
};

// ================================
// 🚀 INIT STATE
// ================================
window.initReelsState = function(container){

  if (!container){
    console.error("❌ No container passed");
    return;
  }

  const s = window.REELS_STATE;

  s.container = container;

  console.log("✅ container set");

};

// ================================
// 🔄 RESET STATE (SOFT)
// ================================
window.resetReelsState = function(){

  const s = window.REELS_STATE;

  s.reels.length = 0;   // 🔥 better than = []
  s.data.length = 0;

  s.index = 0;
  s.lastId = null;

  console.log("♻️ state reset");

};

// ================================
// 💣 HARD RESET (FULL CLEAN)
// ================================
window.destroyReelsState = function(){

  const s = window.REELS_STATE;

  // remove DOM reels
  if (s.container){
    s.container.innerHTML = "";
  }

  // reset everything
  window.REELS_STATE = {
    container: null,
    reels: [],
    data: [],
    index: 0,
    isFetching: false,
    lastId: null
  };

  console.log("🧹 state destroyed");

};

// ================================
// 🧠 DEBUG HELPER
// ================================
window.getReelsState = function(){
  return window.REELS_STATE;
};

// ================================
// 🚀 ESBUILD KEEP (VERY IMPORTANT)
// ================================
export {};
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
