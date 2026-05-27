window.PAGE_CONFIG = {};

window.registerPageConfig = function(name, config){
  window.PAGE_CONFIG[name] = config;
};
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
