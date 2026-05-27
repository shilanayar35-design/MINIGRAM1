console.log("🧠 cpu.js loaded (smooth)");

(function(){

  // ================================
  // 🎯 UI
  // ================================
  const box = document.createElement("div");

  box.style.position = "fixed";
  box.style.top = "55%";
  box.style.right = "6px";
  box.style.transform = "translateY(-50%)";

  box.style.padding = "4px 6px";
  box.style.fontSize = "10px";
  box.style.fontWeight = "600";

  box.style.background = "rgba(0,0,0,0.5)";
  box.style.borderRadius = "6px";

  box.style.zIndex = "999999";
  box.style.pointerEvents = "none";

  document.body.appendChild(box);

  // ================================
  // 🧠 CPU ENGINE (SMOOTH)
  // ================================
  let last = performance.now();
  let smoothLoad = 0;

  function loop(now){

    const delta = now - last;

    // 🎯 base load calc
    let rawLoad = (delta - 16) * 4;

    rawLoad = Math.max(0, Math.min(100, rawLoad));

    // ================================
    // 🔥 SMOOTHING (EMA)
    // ================================
    smoothLoad = smoothLoad * 0.85 + rawLoad * 0.15;

    last = now;

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  // ================================
  // 🖥️ UI UPDATE (SLOW)
  // ================================
  setInterval(() => {

    const load = Math.round(smoothLoad);

    // 🎨 color
    if (load < 30) box.style.color = "#0f0";
    else if (load < 60) box.style.color = "#ff0";
    else box.style.color = "#f00";

    box.innerText = `CPU: ${load}%`;

  }, 250); // 🔥 slower update = stable

})();
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
