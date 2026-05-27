console.log("📖 stories.js loaded");

//////////////////////////////////////////////////
// 🌍 GLOBAL DATA (SAFE)
//////////////////////////////////////////////////

window.storiesData =
  window.storiesData || [

    {
      user: "Mahesh",
      avatar:
        "https://i.pravatar.cc/150?img=1"
    },

    {
      user: "Rohit",
      avatar:
        "https://i.pravatar.cc/150?img=2"
    },

    {
      user: "GamingPro",
      avatar:
        "https://i.pravatar.cc/150?img=3"
    },

    {
      user: "DevX",
      avatar:
        "https://i.pravatar.cc/150?img=4"
    }

  ];

//////////////////////////////////////////////////
// 🛡️ GLOBAL INIT STATE
//////////////////////////////////////////////////

window.STORIES_INITIALIZED =
  false;

//////////////////////////////////////////////////
// 📦 GET CONTAINER (SMART)
//////////////////////////////////////////////////

function getStoriesContainer(){

  return (
    document.getElementById(
      "storiesWrapper"
    )
    ||
    document.getElementById(
      "stories"
    )
  );
}

//////////////////////////////////////////////////
// 🎨 CREATE STORY ITEM
//////////////////////////////////////////////////

function createStoryItem(
  story,
  index
){

  const item =
    document.createElement("div");

  item.className =
    "storyItem";

  //////////////////////////////////////////////////
  // 🎨 RING
  //////////////////////////////////////////////////

  const ring =
    document.createElement("div");

  ring.className =
    "storyRing";

  //////////////////////////////////////////////////
  // 🖼️ IMAGE
  //////////////////////////////////////////////////

  const img =
    document.createElement("img");

  img.src =
    story.avatar;

  img.loading =
    "lazy";

  img.draggable =
    false;

  //////////////////////////////////////////////////
  // 👤 USERNAME
  //////////////////////////////////////////////////

  const user =
    document.createElement("div");

  user.className =
    "storyUser";

  user.textContent =
    story.user;

  //////////////////////////////////////////////////
  // 📦 BUILD
  //////////////////////////////////////////////////

  ring.appendChild(img);

  item.appendChild(ring);

  item.appendChild(user);

  //////////////////////////////////////////////////
  // 👆 CLICK EVENT
  //////////////////////////////////////////////////

  item.addEventListener(
    "click",
    () => {

      window.openStory(index);

    }
  );

  return item;
}

//////////////////////////////////////////////////
// 🎨 RENDER STORIES
//////////////////////////////////////////////////

window.renderStories =
  function(){

    const container =
      getStoriesContainer();

    //////////////////////////////////////////////////
    // ❌ NO CONTAINER
    //////////////////////////////////////////////////

    if(!container){

      console.warn(
        "⚠️ stories container not found"
      );

      return;
    }

    //////////////////////////////////////////////////
    // 🧹 HARD RESET
    //////////////////////////////////////////////////

    container.replaceChildren();

    //////////////////////////////////////////////////
    // 📦 FRAGMENT
    //////////////////////////////////////////////////

    const fragment =
      document
      .createDocumentFragment();

    //////////////////////////////////////////////////
    // 🔥 BUILD ITEMS
    //////////////////////////////////////////////////

    window.storiesData
      .forEach((story, index)=>{

        if(!story) return;

        const item =
          createStoryItem(
            story,
            index
          );

        fragment
          .appendChild(item);

      });

    //////////////////////////////////////////////////
    // 🚀 FAST APPEND
    //////////////////////////////////////////////////

    container
      .appendChild(fragment);

    //////////////////////////////////////////////////
    // 🔥 FORCE VISIBLE
    //////////////////////////////////////////////////

    container.style.display =
      "";

    container.style.visibility =
      "visible";

    container.style.opacity =
      "1";

    //////////////////////////////////////////////////
    // 🔥 RESET BAD CACHE STATE
    //////////////////////////////////////////////////

    delete container.dataset.loaded;

    //////////////////////////////////////////////////
    // ✅ SAVE STATE
    //////////////////////////////////////////////////

    window.STORIES_INITIALIZED =
      true;

    console.log(
      "📖 Stories rendered:",
      window.storiesData.length
    );
};

//////////////////////////////////////////////////
// 🚀 OPEN STORY
//////////////////////////////////////////////////

window.openStory =
  function(index){

    const story =
      window.storiesData?.[index];

    if(!story) return;

    //////////////////////////////////////////////////
    // 🌍 PASS DATA
    //////////////////////////////////////////////////

    window.STORY_INDEX =
      index;

    window.STORY_DATA =
      window.storiesData;

    //////////////////////////////////////////////////
    // 🚀 OPEN PAGE
    //////////////////////////////////////////////////

    if(
      typeof loadPage ===
      "function"
    ){

      loadPage(
        "story_view"
      );

    }else{

      console.warn(
        "⚠️ loadPage not found"
      );
    }
};

//////////////////////////////////////////////////
// ⚡ INIT STORIES
//////////////////////////////////////////////////

window.initStories =
  function(){

    console.log(
      "⚡ initStories called"
    );

    //////////////////////////////////////////////////
    // 🛡️ FORCE REINIT
    //////////////////////////////////////////////////

    window.STORIES_INITIALIZED =
      false;

    //////////////////////////////////////////////////
    // 📦 GET CONTAINER
    //////////////////////////////////////////////////

    const container =
      getStoriesContainer();

    //////////////////////////////////////////////////
    // ❌ NO DOM
    //////////////////////////////////////////////////

    if(!container){

      console.warn(
        "⚠️ initStories skipped (no DOM)"
      );

      return;
    }

    //////////////////////////////////////////////////
    // 🧹 FORCE CLEAN
    //////////////////////////////////////////////////

    container.replaceChildren();

    //////////////////////////////////////////////////
    // 🔥 FORCE VISIBLE
    //////////////////////////////////////////////////

    container.style.display =
      "";

    container.style.visibility =
      "visible";

    container.style.opacity =
      "1";

    //////////////////////////////////////////////////
    // ❌ REMOVE OLD CACHE FLAGS
    //////////////////////////////////////////////////

    delete container.dataset.loaded;

    //////////////////////////////////////////////////
    // 🎨 RENDER
    //////////////////////////////////////////////////

    window.renderStories();

    console.log(
      "✅ Stories Init Complete"
    );
};

//////////////////////////////////////////////////
// 🧠 SAFE INIT
//////////////////////////////////////////////////

window.safeInitStories =
  function(){

    const el =
      getStoriesContainer();

    if(
      el &&
      typeof
      window.initStories ===
      "function"
    ){

      //////////////////////////////////////////////////
      // 🚀 NEXT FRAME INIT
      //////////////////////////////////////////////////

      requestAnimationFrame(
        () => {

          window.initStories();

        }
      );

    }else{

      console.warn(
        "⚠️ stories not ready"
      );
    }
};

//////////////////////////////////////////////////
// 💀 ERROR LOGGER
//////////////////////////////////////////////////

window.addEventListener &&
window.addEventListener(
  "error",
  e => console.log(
    "💀 ERROR IN FILE:",
    e.filename,
    e.message
  )
);