window.initNavigation = function(){

  const homeBtn = document.getElementById("homeBtn");
  if(homeBtn){
    homeBtn.onclick = () => loadPage("home");
  }

  const searchBtn = document.getElementById("searchBtn");
  if (searchBtn) {
    searchBtn.onclick = () => loadPage("search");
  }

  const profileBtn = document.getElementById("profileBtn");
  if (profileBtn) {
    profileBtn.onclick = () => loadPage("profile");
  }

  const reelsBtn = document.getElementById("reelsBtn");
  if (reelsBtn) {
    reelsBtn.onclick = () => loadPage("reels");
  }

};
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
