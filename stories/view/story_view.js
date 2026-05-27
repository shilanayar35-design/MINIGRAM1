//////////////////////////////////////////////////
//  STORY VIEW JS (FINAL STABLE + NO LEAK)
//////////////////////////////////////////////////

(function(){

let index = 0;
let data = [];
let duration = 5000;

//  GLOBAL TIMER (IMPORTANT)
window._storyTimer = null;

//  scoped container
let container = null;

//////////////////////////////////////////////////
// INIT
//////////////////////////////////////////////////
function initStoryView(){

  console.log(" story view opened");

  container = document.querySelector(".storyViewPage");

  data = window.STORY_DATA || [];
  index = window.STORY_INDEX || 0;

  if(!data.length){
    console.warn(" No stories found");
    return close();
  }

  preloadImages();
  addEvents();
  render();
}

//////////////////////////////////////////////////
// PRELOAD
//////////////////////////////////////////////////
function preloadImages(){
  data.forEach(story=>{
    const img = new Image();
    img.src = story.image || story.url || story.avatar;
  });
}

//////////////////////////////////////////////////
// SAFE SRC
//////////////////////////////////////////////////
function getStorySrc(story){
  return story.image || story.url || story.avatar || "";
}

//////////////////////////////////////////////////
// RENDER
//////////////////////////////////////////////////
function render(){

  const story = data[index];
  if(!story) return close();

  const storyImg = document.getElementById("storyImage");
  const storyAvatar = document.getElementById("storyAvatar");
  const storyUser = document.getElementById("storyUsername");

  const src = getStorySrc(story);

  if(!src){
    console.warn(" Missing image");
    return next();
  }

  if(storyImg){
    storyImg.style.opacity = "0";

    const temp = new Image();
    temp.src = src;

    temp.onload = ()=>{
      storyImg.src = src;
      storyImg.style.opacity = "1";
    };

    temp.onerror = ()=>{
      next();
    };
  }

  if(storyAvatar) storyAvatar.src = story.avatar;
  if(storyUser) storyUser.textContent = story.user;

  createBars();
  startTimer();
}

//////////////////////////////////////////////////
// PROGRESS
//////////////////////////////////////////////////
function createBars(){

  const el = document.getElementById("storyProgress");
  if(!el) return;

  el.innerHTML = data.map((_, i)=>`
    <div class="bar">
      <div class="fill" style="width:${i < index ? '100%' : '0%'}"></div>
    </div>
  `).join("");
}

//////////////////////////////////////////////////
// TIMER (FIXED)
//////////////////////////////////////////////////
function startTimer(){

  const fills = document.querySelectorAll(".fill");
  if(!fills.length) return;

  clearInterval(window._storyTimer);

  let start = Date.now();

  window._storyTimer = setInterval(()=>{

    let progress = ((Date.now() - start) / duration) * 100;

    if(fills[index]){
      fills[index].style.width = progress + "%";
    }

    if(progress >= 100){
      next();
    }

  }, 16);
}

//////////////////////////////////////////////////
// NEXT / PREV
//////////////////////////////////////////////////
function next(){
  clearInterval(window._storyTimer);
  index++;

  if(index >= data.length) return close();
  render();
}

function prev(){
  clearInterval(window._storyTimer);
  index = Math.max(0, index - 1);
  render();
}

//////////////////////////////////////////////////
// EVENTS (SCOPED)
//////////////////////////////////////////////////
function addEvents(){

  if(!container) return;

  container.addEventListener("click", handleClick);
  container.addEventListener("touchstart", handleHoldStart);
  container.addEventListener("touchend", handleHoldEnd);
}

function removeEvents(){

  if(!container) return;

  container.removeEventListener("click", handleClick);
  container.removeEventListener("touchstart", handleHoldStart);
  container.removeEventListener("touchend", handleHoldEnd);
}

//////////////////////////////////////////////////
// HANDLERS
//////////////////////////////////////////////////
function handleClick(e){

  if(e.target.closest(".storyTop") || e.target.closest(".storyBottom")) return;

  const x = e.clientX;

  if(x < window.innerWidth / 2){
    prev();
  }else{
    next();
  }
}

function handleHoldStart(){
  clearInterval(window._storyTimer);
}

function handleHoldEnd(){
  startTimer();
}

//////////////////////////////////////////////////
// CLOSE
//////////////////////////////////////////////////
function close(){
  destroyStoryView();

  if(typeof loadPage === "function"){
    loadPage("home");
  }else{
    history.back();
  }
}

//////////////////////////////////////////////////
// CLEANUP (FINAL FIX)
//////////////////////////////////////////////////
function destroyStoryView(){

  console.log(" destroyStoryView");

  clearInterval(window._storyTimer);
  window._storyTimer = null;

  removeEvents();

  const img = document.getElementById("storyImage");
  const avatar = document.getElementById("storyAvatar");
  const user = document.getElementById("storyUsername");
  const bars = document.getElementById("storyProgress");

  if(img) img.src = "";
  if(avatar) avatar.src = "";
  if(user) user.textContent = "";
  if(bars) bars.innerHTML = "";

  container = null;
}

//////////////////////////////////////////////////
// EXPORT (IMPORTANT FOR LOADER)
//////////////////////////////////////////////////
window.FUNCTIONS = window.FUNCTIONS || {};

window.FUNCTIONS.initStoryView = initStoryView;

//  NAME MATCH WITH PAGE_CONFIG.destroy
window.FUNCTIONS.storyDestroy = destroyStoryView;

})();
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
