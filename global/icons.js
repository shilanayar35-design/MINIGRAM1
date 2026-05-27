alert("ICONS JS RUNNING");

// 🔥 ALWAYS BASE FROM ROOT FILE
const BASE = location.pathname.includes("/pages/")
  ? "../"
  : "./";

const PATHS = {
  like: BASE + "global_css/like.html",
  comment: BASE + "global_css/comment.html",
  share: BASE + "global_css/share.html",
  save: BASE + "global_css/svg.html"
};

const cache = {};

function loadIcon(type){
  if(cache[type]){
    inject(type, cache[type]);
    return;
  }

  fetch(PATHS[type])
    .then(res => {
      if (!res.ok) throw new Error("Fetch failed: " + PATHS[type]);
      return res.text();
    })
    .then(svg => {
      cache[type] = svg;
      inject(type, svg);
    })
    .catch(err => console.error("❌ Icon error:", type, PATHS[type]));
}

function inject(type, svg){
  document.querySelectorAll("." + type).forEach(el=>{
    if(el.dataset.loaded) return;

    el.innerHTML = svg;
    el.dataset.loaded = "true";
  });
}

function initIcons(){
  Object.keys(PATHS).forEach(loadIcon);
}

// 🔥 FIX: debounce observer
let t;
const observer = new MutationObserver(() => {
  clearTimeout(t);
  t = setTimeout(initIcons, 50);
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// First run
initIcons();
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
