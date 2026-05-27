console.log("📍 position.js loaded");

function render(){

  const s = window.REELS_STATE;

  if(!s.container) return;

  const h = window.innerHeight;

  s.reels.forEach((r,i)=>{

    r.style.transform = `translate3d(0, ${(i - s.index) * h}px, 0)`;

    const v = r.querySelector("video");

    if(v){
      if(i === s.index){
        v.play().catch(()=>{});
      }else{
        v.pause();
      }
    }

  });

}

window.render = render;
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
