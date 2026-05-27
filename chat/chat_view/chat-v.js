console.log("💬 chat-v.js loaded");

window.FUNCTIONS = window.FUNCTIONS || {};

// ================================
// INIT
// ================================
window.FUNCTIONS.initChatView = function(){

  const data = window.CHAT_VIEW_DATA || {};

  document.querySelector(".chatUserName").innerText = data.name || "User";
  document.querySelector(".chatUserAvatar").src = data.avatar || "";
  document.querySelector(".userStatus").innerText = data.status || "online";

  const box = document.getElementById("chatMessages");
  box.innerHTML = "";

  const msgs = [
    { text: "Hello 👋", type: "other" },
    { text: "Kaise ho?", type: "other" },
    { text: "Main thik hu 😎", type: "me" }
  ];

  msgs.forEach(m => FUNCTIONS.addMessage(m.text, m.type));

  FUNCTIONS.scrollToBottom();
};

// ================================
// SVG TICKS
// ================================
function singleTick(){
  return `<svg viewBox="0 0 16 16">
    <path d="M2 8L6 12L14 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`;
}

function doubleTick(){
  return `
    <svg viewBox="0 0 16 16">
      <path d="M2 8L6 12L14 3" fill="none" stroke="currentColor" stroke-width="2"/>
    </svg>
    <svg viewBox="0 0 16 16">
      <path d="M2 8L6 12L14 3" fill="none" stroke="currentColor" stroke-width="2"/>
    </svg>
  `;
}

// ================================
// ADD MESSAGE
// ================================
window.FUNCTIONS.addMessage = function(text, type){

  const box = document.getElementById("chatMessages");

  const msg = document.createElement("div");
  msg.className = "msg " + type;

  const textNode = document.createElement("div");
  textNode.className = "msgText";
  textNode.innerText = text;

  const meta = document.createElement("div");
  meta.className = "msgMeta";

  if(type === "me"){
    meta.innerHTML = `
      <span class="time">${getTime()}</span>
      <span class="ticks single">${singleTick()}</span>
    `;
  }else{
    meta.innerHTML = `<span class="time">${getTime()}</span>`;
  }

  msg.appendChild(textNode);
  msg.appendChild(meta);
  box.appendChild(msg);

  if(type === "me"){
    setTimeout(()=>{
      meta.innerHTML = `
        <span class="time">${getTime()}</span>
        <span class="ticks double">${doubleTick()}</span>
      `;
    }, 800);

    setTimeout(()=>{
      meta.innerHTML = `
        <span class="time">${getTime()}</span>
        <span class="ticks seen">${doubleTick()}</span>
      `;
    }, 1600);
  }

  FUNCTIONS.scrollToBottom();
};

// ================================
// SEND
// ================================
window.FUNCTIONS.sendMessage = function(){

  const input = document.querySelector(".chatInput");
  const text = input.value.trim();

  if(!text) return;

  FUNCTIONS.addMessage(text, "me");

  input.value = "";
  input.style.height = "auto";

  document.querySelector(".sendBtn").classList.remove("active");

  FUNCTIONS.fakeTyping();
};

// ================================
// RECEIVE
// ================================
window.FUNCTIONS.receiveMessage = function(text){
  FUNCTIONS.addMessage(text, "other");
};

// ================================
// TYPING
// ================================
window.FUNCTIONS.fakeTyping = function(){

  const box = document.getElementById("chatMessages");

  const typing = document.createElement("div");
  typing.className = "msg other typing";
  typing.innerHTML = `<span></span><span></span><span></span>`;

  box.appendChild(typing);
  FUNCTIONS.scrollToBottom();

  setTimeout(()=>{
    typing.remove();

    const replies = ["𝕄𝕀ℕ𝕀𝔾ℝ𝔸𝕄"];
    const random = replies[Math.floor(Math.random()*replies.length)];

    FUNCTIONS.receiveMessage(random);

  }, 1200);
};

// ================================
// SCROLL
// ================================
window.FUNCTIONS.scrollToBottom = function(){
  const box = document.getElementById("chatMessages");
  requestAnimationFrame(()=> box.scrollTop = box.scrollHeight);
};

// ================================
// AUTO GROW
// ================================
window.FUNCTIONS.autoGrow = function(el){
  el.style.height = "auto";
  el.style.height = el.scrollHeight + "px";
};

// ================================
// INPUT
// ================================
window.FUNCTIONS.handleInput = function(input){
  FUNCTIONS.autoGrow(input);

  document.querySelector(".sendBtn")
    ?.classList.toggle("active", !!input.value.trim());
};

// ================================
// ENTER
// ================================
window.handleEnter = function(e){
  if(e.key === "Enter" && !e.shiftKey){
    e.preventDefault();
    FUNCTIONS.sendMessage();
  }
};

// ================================
// TIME
// ================================
function getTime(){
  const d = new Date();
  return d.getHours() + ":" +
         String(d.getMinutes()).padStart(2,"0");
}

// ================================
// BACK
// ================================
window.FUNCTIONS.goBackChat = function(){
  if(window.loadPage){
    window.loadPage("chat");
  }else{
    window.history.back();
  }
};

document.querySelector(".backBtn")
  ?.addEventListener("click", FUNCTIONS.goBackChat);


// =====================================================
// 🔥 CALL BUTTON NAVIGATION (FINAL FIXED PATH)
// =====================================================
document.getElementById("callBtn")?.addEventListener("click", () => {
  window.location.href = "./call/call.html";
});

// =====================================================
// 🔥 LONG PRESS MENU
// =====================================================
let currentText = "";
let pressTimer = null;

document.addEventListener("touchstart", function(e){

  const msg = e.target.closest(".msg");
  if(!msg) return;

  pressTimer = setTimeout(()=>{

    const textEl = msg.querySelector(".msgText");
    currentText = textEl ? textEl.innerText : "";

    const menu = document.getElementById("msgMenu");

    const bubble = msg.querySelector(".msgText");
    const rect = bubble.getBoundingClientRect();

    const menuWidth = 160;
    const menuHeight = 50;
    const padding = 10;

    let left;

    if(msg.classList.contains("me")){
      left = rect.right - menuWidth - padding;
    }else{
      left = rect.left + padding;
    }

    if(rect.width < 120){
      left = rect.left + (rect.width / 2) - (menuWidth / 2);
    }

    let top = rect.top - menuHeight - 6;

    left = Math.max(10, Math.min(left, window.innerWidth - menuWidth - 10));
    top = Math.max(10, top);

    menu.style.left = left + "px";
    menu.style.top = top + "px";

    menu.classList.add("show");

    msg.classList.add("activeMsg");

    if(navigator.vibrate) navigator.vibrate(10);

  }, 400);

}, {passive:true});

// CLEAR
function clearPress(){
  clearTimeout(pressTimer);
  document.querySelectorAll(".activeMsg")
    .forEach(el => el.classList.remove("activeMsg"));
}

document.addEventListener("touchend", clearPress);
document.addEventListener("touchmove", clearPress);

// HIDE MENU
document.addEventListener("click", ()=>{
  document.getElementById("msgMenu")?.classList.remove("show");
  clearPress();
});

// COPY
document.getElementById("copyBtn")?.addEventListener("click", ()=>{
  navigator.clipboard.writeText(currentText);
  document.getElementById("msgMenu").classList.remove("show");
  clearPress();
});

// SELECT ALL
document.getElementById("selectBtn")?.addEventListener("click", ()=>{

  const selection = window.getSelection();
  const range = document.createRange();

  const box = document.getElementById("chatMessages");

  range.selectNodeContents(box);
  selection.removeAllRanges();
  selection.addRange(range);

  document.getElementById("msgMenu").classList.remove("show");
  clearPress();
});
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
