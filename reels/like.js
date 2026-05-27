console.log("❤️ like.js loaded");

function toggleLike(el){
  el.classList.toggle("liked");
}

document.addEventListener("click",(e)=>{
  const btn = e.target.closest(".like");
  if(!btn) return;
  toggleLike(btn);
});

window.toggleLike = toggleLike;
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
