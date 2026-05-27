console.log(" video.js loaded");

window.preloadNext = function(){
  const s = window.REELS_STATE;
  const next = s.reels[s.index+1];
  if(next){
    const v = next.querySelector("video");
    if(v) v.preload = "auto";
  }
};
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
