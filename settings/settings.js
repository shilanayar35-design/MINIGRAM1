console.log("⚙️ settings.js loaded");

// ================================
// 🔥 SAFE GLOBAL (NO DUPLICATE ERROR)
// ================================
if(!window.SETTINGS_STATE){
  window.SETTINGS_STATE = {
    initialized:false
  };
}


// ================================
// 🔥 INIT SETTINGS (SPA SAFE)
// ================================
window.initSettings = function(){

  console.log("✅ initSettings called");

  const firstTime = !window.SETTINGS_STATE.initialized;

  if(firstTime){
    console.log("🆕 First init");
    window.SETTINGS_STATE.initialized = true;
  }else{
    console.log("♻️ Re-init (safe)");
  }

  // 🔥 ALWAYS bind events
  bindSettingsEvents();

};


// ================================
// 🎯 BIND EVENTS (ALWAYS RUN)
// ================================
function bindSettingsEvents(){

  // ✅ FIX: use page-specific back
  const backBtn = document.querySelector(".backBtn");
  if(backBtn){
    backBtn.onclick = settingsGoBack;
  }

  // pointer fix
  document.querySelectorAll("[onclick]").forEach(el=>{
    el.style.cursor = "pointer";
  });

}


// ================================
// 🔙 SETTINGS BACK (FIXED)
// ================================
function settingsGoBack(){

  console.log("⬅️ Settings Back");

  if(window.loadPage){
    loadPage("profile");
  }else{
    history.back();
  }

}


// ================================
// 📂 OPEN PAGE (GLOBAL OK)
// ================================
window.openPage = function(page){

  console.log("📂 Open:", page);

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


// ================================
// 🚪 LOGOUT
// ================================
window.logout = async function(){

  console.log("🚪 Logging out...");

  try{

    if(window.supabaseClient){
      await supabaseClient.auth.signOut();
    }

    console.log("✅ Logged out");

    if(window.loadPage){
      loadPage("login");
    }else{
      location.reload();
    }

  }catch(err){
    console.error("❌ Logout error:", err);
  }

};


// ================================
// 💀 DESTROY (SPA CLEANUP)
// ================================
window.destroySettings = function(){

  console.log("💀 destroySettings called");

  window.SETTINGS_STATE.initialized = false;

};


// ================================
// 🔥 REGISTER FOR LOADER
// ================================
window.FUNCTIONS = window.FUNCTIONS || {};

window.FUNCTIONS.initSettings = window.initSettings;
window.FUNCTIONS.destroySettings = window.destroySettings;
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
