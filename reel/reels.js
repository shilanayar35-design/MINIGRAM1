console.log("🎥 reels.js loaded");

// ================================
// GLOBAL HOLDER
// ================================
window.FUNCTIONS = window.FUNCTIONS || {};

// ================================
// 📦 DUMMY DATA (FIXED)
// ================================
window.loadDummy = function(){

  const dummy = [
    {
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
      user: "Demo",
      likes: 120
    },
    {
      video: "https://www.w3schools.com/html/movie.mp4",
      user: "Test",
      likes: 90
    }
  ];

  const s = window.REELS_STATE;

  s.data = dummy; // 🔥 IMPORTANT SYNC FIX

  window.appendReels(dummy);
};

// ================================
// 🔥 RENDER ENGINE (SAFE)
// ================================
window.render = function(){

  const s = window.REELS_STATE;
  if (!s || !s.container) return;

  s.reels.forEach((reel, i) => {

    // 🔥 SAFETY GUARD (IMPORTANT FIX)
    if (i >= s.reels.length) return;

    reel.style.transform = `translateY(${(i - s.index) * 100}%)`;

    const video = reel.querySelector("video");
    if (!video) return;

    if (i === s.index) {

      const p = video.play?.();
      if (p !== undefined) p.catch(()=>{});

      window.startProgress?.(reel, video);

    } else {

      video.pause();
      video.currentTime = 0;
    }

  });

};

// ================================
// AUTO WATCHER
// ================================
function watchIndex(){

  let last = -1;

  function loop(){

    const s = window.REELS_STATE;
    if (!s) return requestAnimationFrame(loop);

    if (s.index !== last){
      last = s.index;
      window.render?.();
    }

    requestAnimationFrame(loop);
  }

  loop();
}

// ================================
// 🚀 INIT REELS
// ================================
async function initReels(){

  // 🔥 SAFE WAIT LOOP
  while (true) {
    if (typeof window.appendReels === "function") break;
    await new Promise(function(resolve){
      setTimeout(resolve, 20);
    });
  }

  console.log("✅ appendReels ready");

  // ================================
  // STATE INIT
  // ================================
  if(!window.REELS_STATE){
    window.REELS_STATE = {
      container: null,
      reels: [],
      data: [],
      index: 0,
      isFetching: false,
      lastId: null
    };
  }

  const state = window.REELS_STATE;

  const container = document.querySelector(".reelsContainer");

  if(!container){
    console.error("❌ reelsContainer not found");
    return;
  }

  state.container = container;

  container.style.opacity = "0";

  state.reels = [];
  state.data = [];
  state.index = 0;
  state.isFetching = false;

  container.innerHTML = "";

  console.log("🔄 Reset done");

  // ================================
  // SWIPE INIT
  // ================================
  try{
    window.initSwipe?.();
  }catch(e){
    console.warn(e);
  }

  // ================================
  // WATCHER
  // ================================
  watchIndex();

  // ================================
  // DATA LOAD
  // ================================
  try{

    if(window.supabase){

      await window.fetchReels?.();

      if(state.reels.length === 0){
        window.loadDummy();
      }

    } else {

      window.loadDummy();

    }

  } catch(e){

    window.loadDummy();

  }

  window.render();

  requestAnimationFrame(()=>{
    container.style.opacity = "1";
  });
}

// ================================
// DESTROY
// ================================
function destroyReels(){

  const state = window.REELS_STATE;
  if(!state) return;

  document.querySelectorAll("video").forEach(v=>{
    v.pause();
    v.currentTime = 0;
  });

  if(state.container){
    state.container.innerHTML = "";
  }

  state.reels = [];
  state.data = [];
  state.index = 0;

  console.log("🧹 destroyed");
}

// ================================
// EXPORT
// ================================
window.initReels = initReels;
window.destroyReels = destroyReels;
window.FUNCTIONS.initReels = initReels;
window.FUNCTIONS.destroyReels = destroyReels;
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
