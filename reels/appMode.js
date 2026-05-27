console.log("📱 appMode.js loaded");

function enterReelsMode(){
  document.body.classList.add("reels-mode");
}

function exitReelsMode(){
  document.body.classList.remove("reels-mode");
}

window.enterReelsMode = enterReelsMode;
window.exitReelsMode = exitReelsMode;
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
