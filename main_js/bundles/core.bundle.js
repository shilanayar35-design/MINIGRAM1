

/* FILE: main_js/function.js */

console.log("🔥 FUNCTIONS SYSTEM READY");

window.FUNCTIONS = {

  initProfile: async () => {
    console.log("⚡ initProfile trigger");

    if(window.initProfile){
      await window.initProfile();
    } else {
      console.error("❌ initProfile NOT FOUND");
    }
  },

  initReels: async () => {
    if(window.initReels){
      await window.initReels();
    }
  },

  initChat: async () => {
    if(window.initChat){
      await window.initChat();
    }
  },

  initNotifications: async () => {
    if(window.initNotifications){
      await window.initNotifications();
    }
  },

  initSearchPage: async () => {
    if(window.initSearchPage){
      await window.initSearchPage();
    }
  },

  initStories: async () => {
    if(window.initStories){
      await window.initStories();
    }
  },

  destroyReels: () => {
    if(window.destroyReels){
      window.destroyReels();
    }
  }

};
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));


/* FILE: main_js/utils.js */

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


/* FILE: main_js/interactions.js */

// ================================
// HEART ANIMATION
// ================================

function animateHeart(img){

  const container = img.parentElement;

  const heart = document.createElement("div");

  heart.className = "heart";
  heart.innerText = "❤";

  container.appendChild(heart);

  setTimeout(()=>heart.remove(), 600);

}


// ================================
// LIKE SYSTEM (OPTIMISTIC)
// ================================

async function likePost(el, id){

  const likesEl = document.getElementById("likes-" + id);
  if(!likesEl) return;

  let likes = parseInt(likesEl.innerText) || 0;
  let liked = el.classList.contains("liked");

  // ================================
  // UI UPDATE
  // ================================
  if(!liked){
    likes++;
    el.innerText = "❤";
    el.classList.add("liked");
  }else{
    likes--;
    el.innerText = "🤍";
    el.classList.remove("liked");
  }

  likesEl.innerText = likes + " likes";

  // ================================
  // UPDATE STATE
  // ================================
  const post = STATE.FEED.find(p => p.id === id);
  if(post){
    post.likes = likes;
  }

  // ================================
  // BACKEND UPDATE
  // ================================
  try{

    await supabaseClient
      .from("posts")
      .update({ likes: likes })
      .eq("id", id);

  }catch(err){

    console.error(err);
    toast("Like failed");

  }

}


// ================================
// COMMENT
// ================================

function commentPost(id){
  toast("Comment system coming soon");
}


// ================================
// SHARE
// ================================

function sharePost(url){

  navigator.clipboard.writeText(url);
  toast("Link copied");

}


// ================================
// SAVE
// ================================

function savePost(id){
  toast("Saved");
}


// ================================
// OPEN CHAT
// ================================

function openChat(){
  window.location.href = "chat.html";
}


// ================================
// GLOBAL EXPORT (🔥 MOST IMPORTANT)
// ================================

window.animateHeart = animateHeart;
window.likePost = likePost;
window.commentPost = commentPost;
window.sharePost = sharePost;
window.savePost = savePost;
window.openChat = openChat;
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));


/* FILE: main_js/core.js */

// ================================
// GLOBAL STATE (SINGLE SOURCE)
// ================================

window.STATE = window.STATE || {
  FEED: [],
  PAGE: 0,
  LIMIT: 5,
  LOADING: false,
  END: false,
  postChannel: null
};


// ================================
// NAVIGATION (SAFE + NO CRASH)
// ================================

function initNavigation(){

  console.log("🧭 INIT NAV");

  try{

    const homeBtn = document.getElementById("homeBtn");
    const searchBtn = document.getElementById("searchBtn");
    const profileBtn = document.getElementById("profileBtn");
    const reelsBtn = document.getElementById("reelsBtn");
    const createBtn = document.getElementById("createBtn");

    if(homeBtn){
      homeBtn.onclick = () => window.loadPage?.("home");
    }

    if(searchBtn){
      searchBtn.onclick = () => window.loadPage?.("search");
    }

    if(profileBtn){
      profileBtn.onclick = () => window.loadPage?.("profile");
    }

    if(reelsBtn){
      reelsBtn.onclick = () => window.loadPage?.("reels");
    }

    if(createBtn){
      createBtn.onclick = () => window.createPost?.();
    }

  }catch(e){
    console.error("❌ NAV INIT ERROR:", e);
  }

}


// ================================
// APP INIT (🔥 SINGLE ENTRY POINT FIX)
// ================================

document.addEventListener("DOMContentLoaded",()=>{

  console.log("🔥 DOM READY");

  // ❌ IMPORTANT:
  // initApp() REMOVED → no double start
  // startApp() handled by pageLoader.js ONLY

  try{
    initNavigation();   // ✅ only navigation here
  }catch(e){
    console.error("❌ NAV CRASH:", e);
  }

});


// ================================
// SAFE GLOBAL EXPORTS
// ================================

// 🔥 Only assign if exists (no override bugs)

if(typeof window.loadPage !== "function" && typeof loadPage === "function"){
  window.loadPage = loadPage;
}

if(typeof window.createPost !== "function" && typeof createPost === "function"){
  window.createPost = createPost;
}

if(typeof window.openChat !== "function" && typeof openChat === "function"){
  window.openChat = openChat;
}
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
