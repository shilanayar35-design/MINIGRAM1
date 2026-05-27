console.log("📦 append.js loaded");

// ================================
// 🚀 APPEND REELS (FINAL PRO)
// ================================
function appendReels(list){

  const s = window.REELS_STATE;

  // ❌ SAFETY CHECK
  if(!s || !s.container){
    console.warn("⚠️ No container found");
    return;
  }

  if(!Array.isArray(list) || !list.length){
    console.warn("⚠️ Empty list");
    return;
  }

  // ================================
  // 🚀 BATCH APPEND (PERFORMANCE BOOST)
  // ================================
  const frag = document.createDocumentFragment();

  list.forEach((d, i) => {

    const reel = window.createReel?.(d);

    if(!reel) return;

    // ================================
    // 📐 PERFECT STACK POSITION
    // ================================
    const index = s.reels.length + i;
    reel.style.transform = `translateY(${index * 100}%)`;

    // ================================
    // 🧠 PRELOAD OPTIMIZATION
    // ================================
    const video = reel.querySelector("video");
    if(video){
      video.preload = index <= 1 ? "auto" : "metadata";
    }

    // ================================
    // 📦 ADD TO FRAGMENT
    // ================================
    frag.appendChild(reel);

    // ================================
    // 🧠 STATE SYNC
    // ================================
    s.reels.push(reel);
    s.data.push(d);
  });

  // ================================
  // 🚀 SINGLE DOM INSERT (NO LAG)
  // ================================
  s.container.appendChild(frag);

  // ================================
  // 🎯 RENDER SYNC (ULTRA SMOOTH)
  // ================================
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.render?.();
    });
  });

  console.log("✅ Appended:", list.length);
}


// ================================
// 🌍 GLOBAL EXPOSE
// ================================
window.appendReels = appendReels;


// ================================
// 🔥 ESBUILD FIX (VERY IMPORTANT)
// ================================
export {};
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
