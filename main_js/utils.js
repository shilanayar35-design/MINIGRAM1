// ================================
// TIME FORMAT
// ================================

function formatTime(date){

  if(!date) return "";

  const d = new Date(date);
  const now = new Date();

  const diff = Math.floor((now - d) / 1000);

  if(diff < 60) return diff + "s";
  if(diff < 3600) return Math.floor(diff / 60) + "m";
  if(diff < 86400) return Math.floor(diff / 3600) + "h";
  if(diff < 604800) return Math.floor(diff / 86400) + "d";

  return d.toLocaleDateString();

}


// ================================
// TOAST
// ================================

function toast(text){

  const t = document.getElementById("toast");
  
  if(!t){
    console.warn("Toast element not found");
    return;
  }

  t.innerText = text;
  t.style.display = "block";

  // ================================
  // CLEAR OLD TIMER
  // ================================
  if(t.timer){
    clearTimeout(t.timer);
  }

  // ================================
  // AUTO HIDE
  // ================================
  t.timer = setTimeout(()=>{
    t.style.display = "none";
  }, 2000);

}


// ================================
// GLOBAL EXPORT (🔥 MOST IMPORTANT)
// ================================

window.formatTime = formatTime;
window.toast = toast;
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
