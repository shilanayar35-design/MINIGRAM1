window.initNotifications = function () {

  const container = document.getElementById("notifications");

  if (!container) {
    console.warn(" Notifications container not found");
    return;
  }

  /* ===== CLEAN INIT (SPA SAFE) ===== */
  container.innerHTML = "";

  /* ================= DATA ================= */

  const data = [
    { type: "request", user: "luudddiin", time: "5h", img: "https://i.pravatar.cc/150?img=1" },
    { type: "request", user: "satvilkarpooja", time: "6h", img: "https://i.pravatar.cc/150?img=2" },
    { type: "suggest", user: "_green_panther_mh07_", time: "3d", img: "https://i.pravatar.cc/150?img=3" },
    { type: "suggest", user: "miss_ms_deaf03", time: "6d", img: "https://i.pravatar.cc/150?img=4" }
  ];

  /* ================= CREATE ITEM ================= */

  function createItem(n) {
    const div = document.createElement("div");
    div.className = "item";

    if (n.type === "request") {
      div.innerHTML = `
        <div class="left">
          <img src="${n.img}" loading="lazy">
          <div class="text-wrap">
            <div class="text">
              <b>${n.user}</b> requested to follow you
            </div>
            <div class="time">${n.time}</div>
          </div>
        </div>

        <div class="actions">
          <button class="btn confirm">Confirm</button>
          <button class="btn delete">Delete</button>
        </div>
      `;
    } else {
      div.innerHTML = `
        <div class="left">
          <img src="${n.img}" loading="lazy">
          <div class="text-wrap">
            <div class="text">
              <b>${n.user}</b> is on MiniGram
            </div>
            <div class="time">${n.time}</div>
          </div>
        </div>

        <button class="btn follow">Follow</button>
      `;
    }

    return div;
  }

  /* ================= RENDER ================= */

  const fragment = document.createDocumentFragment();

  data.forEach(n => {
    fragment.appendChild(createItem(n));
  });

  container.appendChild(fragment);

  /* ================= EVENTS ================= */

  if (!container.dataset.eventsAdded) {

    container.addEventListener("click", (e) => {

      const btn = e.target;

      // FOLLOW / CONFIRM
      if (
        btn.classList.contains("confirm") ||
        btn.classList.contains("follow")
      ) {
        btn.innerText = "Following";
        btn.classList.add("following");
      }

      // DELETE
      if (btn.classList.contains("delete")) {
        const item = btn.closest(".item");

        item.style.opacity = "0";
        item.style.transform = "translateX(40px)";

        setTimeout(() => {
          if (item) item.remove();
        }, 200);
      }

    });

    container.dataset.eventsAdded = "true";
  }

  /* ================= BACK BUTTON ================= */

  const backBtn = document.querySelector(".notificationsPage .backBtn");

  if (backBtn && !backBtn.dataset.bound) {

    backBtn.addEventListener("click", () => {

      if (typeof loadPage === "function") {
        loadPage("home"); //  FIXED
      } else {
        history.back(); // fallback
      }

    });

    backBtn.dataset.bound = "true";
  }

}; //  MOST IMPORTANT (function close)
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
