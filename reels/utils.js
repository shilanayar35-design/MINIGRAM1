console.log(" utils.js loaded");

window.format = (n)=>{
  if(n>1000000) return (n/1000000).toFixed(1)+"M";
  if(n>1000) return (n/1000).toFixed(1)+"K";
  return n;
};
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
