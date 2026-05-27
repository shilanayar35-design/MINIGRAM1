console.log("🖐️ swipe.js loaded");

// ================================
// 🧠 GLOBAL HANDLERS
// ================================
window._reelsTouchStart = null;
window._reelsTouchMove = null;
window._reelsTouchEnd = null;

function initSwipe(){

  const s = window.REELS_STATE;
  const el = s?.container;

  if (!el) {
    console.warn("❌ Swipe: no container");
    return;
  }

  let startY = 0;
  let currentY = 0;
  let startTime = 0;
  let isDragging = false;

  // ================================
  // 👆 TOUCH START
  // ================================
  window._reelsTouchStart = function(e){
    startY = e.touches[0].clientY;
    currentY = startY;
    startTime = Date.now();
    isDragging = true;
  };

  // ================================
  // 👆 TOUCH MOVE (SMOOTH DRAG)
  // ================================
  window._reelsTouchMove = function(e){

    if (!isDragging) return;

    currentY = e.touches[0].clientY;
    const delta = currentY - startY;

    const currentReel = s.reels[s.index];
    if (!currentReel) return;

    // 🔥 live drag effect
    currentReel.style.transition = "none";
    currentReel.style.transform = `translateY(${delta}px)`;
  };

  // ================================
  // ✋ TOUCH END
  // ================================
  window._reelsTouchEnd = function(){

    if (!isDragging) return;
    isDragging = false;

    const delta = currentY - startY;
    const time = Date.now() - startTime;

    const velocity = Math.abs(delta) / time;

    // 🔥 SMART THRESHOLD
    const shouldSwipe =
      Math.abs(delta) > 80 || velocity > 0.5;

    if (shouldSwipe){
      if (delta < 0){
        s.index++; // up
      } else {
        s.index--; // down
      }
    }

    // 🔥 LIMIT
    s.index = Math.max(0, Math.min(s.index, s.reels.length - 1));

    console.log("👉 index:", s.index);

    // ================================
    // 🎯 RESET POSITIONS
    // ================================
    s.reels.forEach((reel, i) => {
      reel.style.transition = "transform 0.3s ease";
      reel.style.transform = `translateY(${(i - s.index) * 100}%)`;
    });

    // ================================
    // 🎥 AUTO PLAY / PAUSE
    // ================================
    s.reels.forEach((reel, i) => {
      if (i === s.index){
        reel.play?.();
      } else {
        reel.pause?.();
      }
    });

    // ================================
    // 📡 PRELOAD NEXT
    // ================================
    window.preloadNext?.();
  };

  // ================================
  // 🚀 ADD EVENTS
  // ================================
  el.addEventListener("touchstart", window._reelsTouchStart, { passive: true });
  el.addEventListener("touchmove", window._reelsTouchMove, { passive: true });
  el.addEventListener("touchend", window._reelsTouchEnd, { passive: true });

}

window.initSwipe = initSwipe;


// ================================
// 🧹 DESTROY SYSTEM
// ================================
window.FUNCTIONS = window.FUNCTIONS || {};

window.FUNCTIONS.reelsDestroy = function(){

  const s = window.REELS_STATE;
  const el = s?.container;

  if (el){
    if (window._reelsTouchStart){
      el.removeEventListener("touchstart", window._reelsTouchStart);
    }
    if (window._reelsTouchMove){
      el.removeEventListener("touchmove", window._reelsTouchMove);
    }
    if (window._reelsTouchEnd){
      el.removeEventListener("touchend", window._reelsTouchEnd);
    }
  }

  window._reelsTouchStart = null;
  window._reelsTouchMove = null;
  window._reelsTouchEnd = null;

  console.log("🧹 reels cleaned");
};


// ================================
// 🔥 ESBUILD FIX
// ================================
export {};
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
