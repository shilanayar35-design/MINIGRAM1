async function initArchive() {
  console.log("🔥 Archive page initialized");

  // ===== BACK BUTTON =====
  const backBtn = document.querySelector(".back");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      if (typeof window.loadPage === "function") {
        window.loadPage("settings"); // back button loads settings
      } else {
        console.warn("❌ loadPage function not found");
      }
    });
  }

  // ===== TABS =====
  const tabs = document.querySelectorAll(".tab");
  const tabWrapper = document.querySelector(".tabs");

  const stories = [
    { title: "Trip to Mountains", type: "story" },
    { title: "Birthday Party", type: "story" },
    { title: "Gaming Stream", type: "story" }
  ];

  const posts = [
    { title: "Sunset Photo", type: "post" },
    { title: "New Blog", type: "post" }
  ];

  function updateArchiveItems(tabId) {
    // select the archive-list inside the active tab
    const tabContent = document.getElementById(tabId);
    if (!tabContent) return;

    const archiveList = tabContent.querySelector(".archive-list");
    if (!archiveList) return;

    archiveList.innerHTML = "";
    const items = tabId === "stories" ? stories : posts;

    items.forEach(item => {
      const div = document.createElement("div");
      div.className = "archive-item";
      div.innerHTML = `
        <div class="archive-item-title">${item.title}</div>
        <div class="archive-item-type">${item.type}</div>
      `;
      archiveList.appendChild(div);
    });
  }

  // Tab click handler
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // Remove active from all tabs & contents
      tabs.forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

      // Add active to clicked tab
      tab.classList.add("active");
      const content = document.getElementById(tab.dataset.tab);
      if (content) content.classList.add("active");

      // Add post style
      if (tab.dataset.tab === "posts") {
        tabWrapper.classList.add("posts-active");
      } else {
        tabWrapper.classList.remove("posts-active");
      }

      // Update items in the clicked tab
      updateArchiveItems(tab.dataset.tab);
    });
  });

  // Initialize first tab items
  const activeTab = document.querySelector(".tab.active")?.dataset.tab || "stories";
  updateArchiveItems(activeTab);

  console.log("✅ Archive page fully initialized");
}

// Register in FUNCTIONS
window.FUNCTIONS = window.FUNCTIONS || {};
window.FUNCTIONS.initArchive = initArchive;
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
