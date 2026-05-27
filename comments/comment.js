/* ============================= */
/* 🧠 GLOBAL STATE */
/* ============================= */
if (!window._commentState) {
  window._commentState = { isOpen: false };
}
const state = window._commentState;

/* ============================= */
/* 🚀 OPEN COMMENTS */
/* ============================= */
window.openComments = function () {
  const sheet = document.getElementById("commentSheet");
  if (!sheet || state.isOpen) return;

  initCommentSheet();

  sheet.classList.add("active");
  document.body.style.overflow = "hidden";
  state.isOpen = true;
};

/* ============================= */
/* ❌ CLOSE COMMENTS */
/* ============================= */
function closeComments() {
  const sheet = document.getElementById("commentSheet");
  if (!sheet || !state.isOpen) return;

  const content = sheet.querySelector(".sheetContent");

  if (content) {
    content.style.transition = "transform 0.25s ease";
    content.style.transform = "translateY(100%)";
  }

  setTimeout(() => {
    sheet.classList.remove("active");
    document.body.style.overflow = "";
    state.isOpen = false;

    if (content) {
      content.style.transition = "";
      content.style.transform = "translateY(0)";
    }
  }, 220);
}

/* ============================= */
/* 🧱 INIT SHEET */
/* ============================= */
function initCommentSheet() {
  const root = document.getElementById("commentSheet");
  if (!root || root.dataset.loaded) return;

  root.dataset.loaded = "true";

  root.innerHTML = `
    <div class="sheetContent">

      <div class="sheetHeader">
        <div class="dragBar"></div>
        <h3>Comments</h3>
      </div>

      <div id="commentList">
        <div class="emptyState">No comments yet 😶</div>
      </div>

      <div class="emojiBar">
        ❤️ 🙌 🔥 👏 😢 😍 😮 😂
      </div>

      <div class="inputBox">
        <input id="commentInput" placeholder="Add a comment...">
        <button id="postBtn">Post</button>
      </div>

    </div>
  `;

  addOutsideClickClose();
  addSwipeToClose();
  initLikeButtons();
}

/* ============================= */
/* 💬 SEND COMMENT */
/* ============================= */
function sendComment() {
  const input = document.getElementById("commentInput");
  const list = document.getElementById("commentList");

  if (!input || !list) return;

  const text = input.value.trim();
  if (!text) return;

  const empty = list.querySelector(".emptyState");
  if (empty) empty.remove();

  const div = document.createElement("div");
  div.className = "commentRow";

  div.innerHTML = `
    <img src="https://i.pravatar.cc/40?u=${Date.now()}" class="cAvatar">

    <div class="cContent">
      <div class="cTop">
        <b>You</b> <span class="time">now</span>
      </div>

      <div class="cText"></div>
      <div class="cActions">Reply</div>
    </div>

    <!-- ✅ SAME LIKE SYSTEM -->
    <button class="glassBtn like cLike"></button>
  `;

  div.querySelector(".cText").textContent = text;

  list.appendChild(div);
  input.value = "";

  initLikeButtons();

  requestAnimationFrame(() => {
    list.scrollTop = list.scrollHeight;
  });
}

/* ============================= */
/* ❤️ LIKE SYSTEM (GLOBAL SVG INJECT) */
/* ============================= */
function initLikeButtons() {
  document.querySelectorAll(".like").forEach(btn => {

    if (!btn.innerHTML.trim()) {
      btn.innerHTML = `
        <svg class="like-icon" viewBox="0 0 24 24" fill="none">
          <path 
            d="M20.8 8.6c0 5-8.8 10.4-8.8 10.4S3.2 13.6 3.2 8.6C3.2 6 5.2 4 7.8 4c1.7 0 3.2.9 4.2 2.3C13 4.9 14.5 4 16.2 4c2.6 0 4.6 2 4.6 4.6z"
            stroke="white"
            stroke-width="1.8"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      `;
    }
  });
}

/* ============================= */
/* ❤️ LIKE TOGGLE */
/* ============================= */
document.addEventListener("click", (e) => {

  const btn = e.target.closest(".like");
  if (btn) {
    btn.classList.toggle("active");
  }

  if (e.target.closest("#postBtn")) sendComment();
  if (e.target.closest(".commentBtn")) openComments();

});

/* ============================= */
/* 🖱 OUTSIDE CLICK CLOSE */
/* ============================= */
function addOutsideClickClose() {
  const root = document.getElementById("commentSheet");
  if (!root || root.dataset.outside) return;

  root.dataset.outside = "true";

  root.addEventListener("click", (e) => {
    const content = root.querySelector(".sheetContent");
    if (!content) return;

    if (!content.contains(e.target)) {
      closeComments();
    }
  });
}

/* ============================= */
/* 👆 SWIPE CLOSE */
/* ============================= */
function addSwipeToClose() {
  const sheet = document.getElementById("commentSheet");
  if (!sheet || sheet.dataset.swipe) return;

  sheet.dataset.swipe = "true";

  const content = sheet.querySelector(".sheetContent");

  let startY = 0;
  let diff = 0;
  let dragging = false;

  sheet.addEventListener("touchstart", (e) => {
    if (!content) return;
    startY = e.touches[0].clientY;
    dragging = true;
    content.style.transition = "none";
  });

  sheet.addEventListener("touchmove", (e) => {
    if (!dragging || !content) return;

    const currentY = e.touches[0].clientY;
    diff = Math.max(0, currentY - startY);

    const rubber = diff * (1 - Math.min(diff / 500, 0.4));
    content.style.transform = `translateY(${rubber}px)`;
  });

  sheet.addEventListener("touchend", () => {
    if (!content) return;

    dragging = false;
    content.style.transition = "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)";

    if (diff > 150) {
      content.style.transform = "translateY(100%)";
      setTimeout(closeComments, 200);
    } else {
      content.style.transform = "translateY(0)";
    }

    diff = 0;
  });
}
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
