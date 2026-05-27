console.log("✅ accounts.js loaded");

/* ================================
   🔥 INIT (SPA SAFE)
================================ */
window.initAccounts = function(){

  console.log("🔥 initAccounts called");

  const firstTime = !window._accountsInitDone;

  if(firstTime){
    console.log("🆕 First init");
    window._accountsInitDone = true;
  }else{
    console.log("♻️ Re-init (safe)");
  }

  // 🔥 ALWAYS bind events
  bindEvents();

};


/* ================================
   🎯 BIND EVENTS (ALWAYS RUN)
================================ */
function bindEvents(){

  // ✅ CLOSE BUTTON (FIXED)
  const closeBtn = document.querySelector(".closeBtn");
  if(closeBtn){
    closeBtn.onclick = accountsGoBack; // ❌ no global goBack
  }

  // POINTER FIX
  document.querySelectorAll("[onclick]").forEach(el=>{
    el.style.cursor = "pointer";
  });

}


/* ================================
   🔙 BACK (PAGE-SPECIFIC FIX)
================================ */
function accountsGoBack(){

  console.log("⬅️ Accounts Back");

  if(window.loadPage){
    loadPage("settings"); // ✅ correct flow
  }else{
    history.back();
  }

}


/* ================================
   📂 OPEN PAGE (SAFE)
================================ */
window.openPage = function(page){

  console.log("📂 Open page:", page);

  if(!page){
    console.warn("⚠️ No page provided");
    return;
  }

  if(window.loadPage){
    loadPage(page);
  }else{
    alert("Open: " + page);
  }

};


/* ================================
   💀 DESTROY (SPA CLEANUP)
================================ */
window.destroyAccounts = function(){

  console.log("💀 destroyAccounts called");

  window._accountsInitDone = false;

};


/* ================================
   🔥 REGISTER FOR LOADER
================================ */
window.FUNCTIONS = window.FUNCTIONS || {};

window.FUNCTIONS.initAccounts = window.initAccounts;
window.FUNCTIONS.destroyAccounts = window.destroyAccounts;
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
