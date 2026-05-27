console.log("🎬 create.js loaded");

// ================================
// 🎬 CREATE REEL (FINAL PRO)
// ================================
function createReel(data = {}){

  // ================================
  // 🧱 ROOT
  // ================================
  const reel = document.createElement("div");
  reel.className = "reel";

  // ================================
  // 🎥 VIDEO
  // ================================
  const video = document.createElement("video");

  video.src = data.video || "";
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.autoplay = false;

  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");

  // 🔥 LOADING STATE
  video.classList.add("reelVideo", "loading");

  // 🎯 READY STATE SWITCH
  video.addEventListener("loadeddata", () => {
    video.classList.remove("loading");
    video.classList.add("ready");
  });

  reel.appendChild(video);

  // ================================
  // 🔝 PROGRESS BAR
  // ================================
  const progress = document.createElement("div");
  progress.className = "progressBar";

  const bar = document.createElement("div");
  bar.className = "bar";

  progress.appendChild(bar);
  reel.appendChild(progress);

  // ================================
  // 🎯 OVERLAY
  // ================================
  const overlay = document.createElement("div");
  overlay.className = "overlay";

  overlay.innerHTML = `
    <div class="reelUser">
      <span class="reelUserName">${data.user || "user"}</span>
      <button class="instaBtn">Follow</button>
    </div>

    <div class="reelCaption">
      ${data.caption || ""}
    </div>
  `;

  reel.appendChild(overlay);

  // ================================
  // ❤️ ACTIONS (RIGHT SIDE)
  // ================================
  const actions = document.createElement("div");
  actions.className = "reelActions";

  actions.innerHTML = `
    <div class="actionGroup like">
      <div class="iconCircle">
        <span class="material-symbols-rounded">favorite</span>
      </div>
      <div class="actionCount">${window.format?.(data.likes || 0)}</div>
    </div>

    <div class="actionGroup comment">
      <div class="iconCircle">💬</div>
      <div class="actionCount">${window.format?.(data.comments || 0)}</div>
    </div>

    <div class="actionGroup share">
      <div class="iconCircle">🔗</div>
      <div class="actionCount">Share</div>
    </div>
  `;

  reel.appendChild(actions);

  // ================================
  // ❤️ DOUBLE TAP LIKE
  // ================================
  let lastTap = 0;

  reel.addEventListener("click", (e) => {
    const now = Date.now();

    if(now - lastTap < 300){
      // ❤️ LIKE TRIGGER
      const likeBtn = reel.querySelector(".like");
      likeBtn?.classList.add("liked");

      // 💥 HEART ANIMATION
      const heart = document.createElement("div");
      heart.className = "likeAnimation";
      heart.innerHTML = "❤️";

      reel.appendChild(heart);

      setTimeout(() => heart.remove(), 600);
    }

    lastTap = now;
  });

  // ================================
  // 🎥 AUTO PLAY CONTROL (HOOK READY)
  // ================================
  reel.play = () => {
    video.play().catch(() => {});
    window.startProgress?.(reel, video);
  };

  reel.pause = () => {
    video.pause();
  };

  return reel;
}


// ================================
// 🌍 GLOBAL EXPOSE
// ================================
window.createReel = createReel;


// ================================
// 🔥 ESBUILD FIX (VERY IMPORTANT)
// ================================
export {};
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
