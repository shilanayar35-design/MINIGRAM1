console.log("⏱️ progress.js loaded");

// ================================
// 🚀 PROGRESS ENGINE (SMOOTH + SAFE)
// ================================
function startProgress(reel, video){

  const bar = reel.querySelector(".progressBar div");
  if(!bar || !video) return;

  let rafId = null;

  function update(){

    // 🔥 video ready check
    if (!video.duration || isNaN(video.duration)){
      rafId = requestAnimationFrame(update);
      return;
    }

    // ================================
    // 📊 CALCULATE %
    // ================================
    const percent = (video.currentTime / video.duration) * 100;

    bar.style.width = percent + "%";

    // ================================
    // 🔁 LOOP ONLY WHEN PLAYING
    // ================================
    if (!video.paused && !video.ended){
      rafId = requestAnimationFrame(update);
    }
  }

  // ================================
  // ▶️ START EVENTS (MORE ACCURATE)
  // ================================
  video.addEventListener("play", () => {
    cancelAnimationFrame(rafId);
    update();
  });

  video.addEventListener("seeked", update);
  video.addEventListener("timeupdate", update);

  // ================================
  // 🛑 STOP CLEAN
  // ================================
  video.addEventListener("pause", () => {
    cancelAnimationFrame(rafId);
  });

  video.addEventListener("ended", () => {
    cancelAnimationFrame(rafId);
    bar.style.width = "100%";
  });

}

// ================================
// 🌍 GLOBAL EXPORT
// ================================
window.startProgress = startProgress;

// ================================
// 🧠 FORCE ESBUILD KEEP
// ================================
export {};
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
