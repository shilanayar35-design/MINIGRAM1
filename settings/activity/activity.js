function openPage(type){
  if(type === "likes"){
    alert("Open Likes Page");
  }
  else if(type === "deleted"){
    alert("Open Recently Deleted");
  }
  else if(type === "archive"){
    alert("Open Archive");
  }
}

// back button
document.querySelector(".back").onclick = () => {
  history.back();
};
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
