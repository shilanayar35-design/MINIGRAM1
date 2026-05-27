//////////////////////////////////////////////////
// 🔖 SAVED PAGE INIT (FINAL CLEAN UI FIXED)
//////////////////////////////////////////////////

(function () {

  let ALL_POSTS = [];

  //////////////////////////////////////////////////
  // 🚀 INIT
  //////////////////////////////////////////////////
  async function initSaved() {
    console.log("🔖 Saved page init");

    const grid = document.getElementById("savedGrid");

    if (!grid) {
      console.error("❌ savedGrid not found");
      return;
    }

    let posts = [];

    try {
      const { data, error } = await window.supabase
        .from("saved_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      posts = data || [];

    } catch (err) {
      console.warn("⚠️ Using fallback data");

      posts = [
        { image: "https://picsum.photos/300?1", type: "ideas" },
        { image: "https://picsum.photos/300?2", type: "ideas" },
        { image: "https://picsum.photos/300?3", type: "all" },
        { image: "https://picsum.photos/300?4", type: "all" },
        { image: "https://picsum.photos/300?5", type: "ideas" },
        { image: "https://picsum.photos/300?6", type: "all" }
      ];
    }

    ALL_POSTS = posts;

    //////////////////////////////////////////////////
    // ❌ HIDE GRID (NO PREVIEW)
    //////////////////////////////////////////////////
    grid.style.display = "none";

    //////////////////////////////////////////////////
    // 🔥 COLLECTION CLICK
    //////////////////////////////////////////////////
    document.querySelectorAll(".collectionCard").forEach(card => {

      card.onclick = () => {

        const type = card.dataset.type;

        let filtered = [];

        if (type === "all") {
          filtered = ALL_POSTS;
        } else {
          filtered = ALL_POSTS.filter(p => p.type === type);
        }

        //////////////////////////////////////////////////
        // 🌍 PASS DATA
        //////////////////////////////////////////////////
        window.SAVED_TEMP = filtered;
        window.SAVED_TITLE = card.dataset.title;

        //////////////////////////////////////////////////
        // 🚀 OPEN PAGE
        //////////////////////////////////////////////////
        if (typeof loadPage === "function") {
          loadPage("saved_view");
        } else {
          console.error("❌ loadPage not found");
        }
      };

    });

    //////////////////////////////////////////////////
    // 🔙 BACK BUTTON
    //////////////////////////////////////////////////
    const backBtn = document.querySelector(".backBtn");
    if (backBtn) {
      backBtn.onclick = window.goBack;
    }
  }


  //////////////////////////////////////////////////
  // 🔙 GLOBAL BACK (OUTSIDE INIT)
  //////////////////////////////////////////////////
  window.goBack = function () {
    console.log("🔙 Going back...");

    if (window.loadPage) {
      loadPage("settings");
    } else {
      history.back();
    }
  };


  //////////////////////////////////////////////////
  // 🌍 REGISTER (VERY IMPORTANT)
  //////////////////////////////////////////////////
  window.FUNCTIONS = window.FUNCTIONS || {};
  window.FUNCTIONS.initSaved = initSaved;

})();
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
