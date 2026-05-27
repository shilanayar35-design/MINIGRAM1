console.log("💬 chat.js loaded");

// ================================
// 🚀 OPEN CHAT (GLOBAL)
// ================================
function openChat(user){

  if(!user){
    console.warn("❌ No user data");
    return;
  }

  // 🔥 store selected user
  window.CHAT_VIEW_DATA = user;

  // 🚀 open chat view page
  window.loadPage("chat_view");

}

window.openChat = openChat;


// ================================
// 🚀 INIT CHAT LIST
// ================================
function initChat(){

  const chatList = document.getElementById("chatList");
  const loader = document.getElementById("loader");
  const stories = document.getElementById("stories");

  if (!chatList || !stories || !loader) return;

  chatList.innerHTML = "";
  stories.innerHTML = "";

  const users = [
    { id: "1", name: "Aman", msg: "Hii ", time: "1m" },
    { id: "2", name: "Riya", msg: "Kal milte hai", time: "5m" },
    { id: "3", name: "Karan", msg: "Game khelega?", time: "10m" },
    { id: "4", name: "Neha", msg: "Photo bhej", time: "20m" },
    { id: "5", name: "Rahul", msg: "Ok done 👍", time: "30m" },
    { id: "6", name: "Simran", msg: "Nice reel 🔥", time: "1h" }
  ];

  // ================================
  // 🔥 STORIES (FIXED)
  // ================================
  users.forEach(user => {

    const div = document.createElement("div");
    div.className = "storyItem"; // ✅ FIXED

    div.innerHTML = `
      <div class="storyRing">
        <img src="https://i.pravatar.cc/100?u=${user.name}">
      </div>
      <div class="storyUser">${user.name}</div>
    `;

    stories.appendChild(div);

  });

  // ================================
  // 🚀 CHATS (WITH DELAY LOADER)
  // ================================
  setTimeout(() => {

    loader.style.display = "none";

    users.forEach(user => {

      const chat = document.createElement("div");
      chat.className = "chatItem";

      // 🔥 attach data
      chat.dataset.id = user.id;
      chat.dataset.name = user.name;
      chat.dataset.avatar = `https://i.pravatar.cc/100?u=${user.name}`;

      chat.innerHTML = `
        <div class="avatar">
          <img src="https://i.pravatar.cc/100?u=${user.name}">
        </div>
        <div class="chatInfo">
          <div class="chatTop">
            <h3>${user.name}</h3>
            <span class="time">${user.time}</span>
          </div>
          <p>${user.msg}</p>
        </div>
      `;

      // 🔥 CLICK → OPEN CHAT VIEW
      chat.addEventListener("click", () => {

        const selectedUser = {
          id: chat.dataset.id,
          name: chat.dataset.name,
          avatar: chat.dataset.avatar
        };

        openChat(selectedUser);

      });

      chatList.appendChild(chat);

    });

  }, 800);

}


// ================================
// GLOBAL EXPORT
// ================================
window.initChat = initChat;
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
