//////////////////////////////////////////////////
// 🔖 SAVED VIEW PAGE INIT (FINAL HYBRID PRO)
//////////////////////////////////////////////////

(function () {

  //////////////////////////////////////////////////
  // 🚀 INIT
  //////////////////////////////////////////////////
  function initSavedView() {

    console.log("📂 Saved View Opened");

    const grid =
      document.getElementById("savedViewGrid");

    const title =
      document.getElementById("savedTitle");

    //////////////////////////////////////////////////
    // ❌ SAFE CHECK
    //////////////////////////////////////////////////
    if (!grid || !title) {

      console.error(
        "❌ savedView elements missing"
      );

      return;
    }

    //////////////////////////////////////////////////
    // 🏷️ TITLE
    //////////////////////////////////////////////////
    title.textContent =
      window.SAVED_TITLE || "Saved";

    //////////////////////////////////////////////////
    // 📦 POSTS
    //////////////////////////////////////////////////
    const posts =
      window.SAVED_TEMP || [];

    //////////////////////////////////////////////////
    // 🧹 CLEAR OLD GRID
    //////////////////////////////////////////////////
    grid.replaceChildren();

    //////////////////////////////////////////////////
    // ❌ EMPTY
    //////////////////////////////////////////////////
    if (!posts.length) {

      const empty =
        document.createElement("p");

      empty.textContent = "No Posts 😢";

      grid.appendChild(empty);

      return;
    }

    //////////////////////////////////////////////////
    // 🚀 FRAGMENT RENDER (FAST)
    //////////////////////////////////////////////////
    const fragment =
      document.createDocumentFragment();

    //////////////////////////////////////////////////
    // 🎨 BUILD POSTS
    //////////////////////////////////////////////////
    for (let i = 0; i < posts.length; i++) {

      // 🔥 pattern block
      const patternIndex = i % 6;

      let className =
        "savedViewItem";

      // 🔥 BIG TILE
      if (patternIndex === 0) {
        className += " big";
      }

      //////////////////////////////////////////////////
      // 📦 ITEM
      //////////////////////////////////////////////////
      const item =
        document.createElement("div");

      item.className = className;

      //////////////////////////////////////////////////
      // 🖼️ IMAGE
      //////////////////////////////////////////////////
      const img =
        document.createElement("img");

      img.src =
        posts[i].image ||
        posts[i].media_url ||
        "";

      img.loading = "lazy";
      img.draggable = false;

      //////////////////////////////////////////////////
      // 🎯 CLICK EVENT
      //////////////////////////////////////////////////
      item.onclick = () => {

        console.log(
          "📸 Open:",
          i
        );

      };

      //////////////////////////////////////////////////
      // 📥 APPEND
      //////////////////////////////////////////////////
      item.appendChild(img);

      fragment.appendChild(item);
    }

    //////////////////////////////////////////////////
    // 🚀 FINAL APPEND
    //////////////////////////////////////////////////
    grid.appendChild(fragment);

    console.log(
      "⚡ Saved Grid Rendered:",
      posts.length
    );

    //////////////////////////////////////////////////
    // 🔙 BACK BUTTON
    //////////////////////////////////////////////////
    const backBtn =
      document.querySelector(".backBtn");

    if (backBtn) {

      backBtn.onclick = () => {

        if (
          typeof loadPage ===
          "function"
        ) {

          loadPage("saved");

        } else {

          history.back();
        }

      };
    }
  }


  //////////////////////////////////////////////////
  // 💀 DESTROY
  //////////////////////////////////////////////////
  function destroySavedView() {

    console.log(
      "💀 destroySavedView"
    );

  }


  //////////////////////////////////////////////////
  // 🌍 REGISTER
  //////////////////////////////////////////////////
  window.FUNCTIONS =
    window.FUNCTIONS || {};

  window.FUNCTIONS.initSavedView =
    initSavedView;

  window.FUNCTIONS.destroySavedView =
    destroySavedView;

})();

//////////////////////////////////////////////////
// 💀 GLOBAL ERROR LOGGER
//////////////////////////////////////////////////

window.addEventListener &&
window.addEventListener(
  "error",
  e => {

    console.log(
      "💀 ERROR IN FILE:",
      e.filename,
      e.message
    );

  }
);