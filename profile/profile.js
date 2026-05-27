console.log("✅ profile.js loaded");

// ================================
// GLOBAL STATE
// ================================
let currentUser = null;
let isInitialized = false;

let postsGrid, videosGrid, userTab;
let usernameEl, nameEl, bioEl, postsEl, followersEl, followingEl, avatarEl;

// 🔥 VIRTUAL GRID
let grid = null;


// ================================
// WAIT DOM
// ================================
function waitForDom(){
  return new Promise(res=>{
    const i = setInterval(()=>{
      if(document.getElementById("postsGrid")){
        clearInterval(i);
        res();
      }
    },50);
  });
}


// ================================
// TABS SYSTEM
// ================================
function setActiveTab(index){
  const tabs = document.querySelectorAll(".tabs i");
  tabs.forEach((tab,i)=>{
    tab.classList.toggle("active", i === index);
  });
}

function switchTab(index){

  if(!postsGrid || !videosGrid || !userTab) return;

  setActiveTab(index);

  postsGrid.style.display = index === 0 ? "block" : "none";
  videosGrid.style.display = index === 1 ? "grid" : "none";
  userTab.style.display = index === 2 ? "block" : "none";

  window.scrollTo({top:0});
}

window.switchTab = switchTab;


// ================================
// 🔥 INIT PROFILE (FINAL)
// ================================
window.initProfile = async function(){

  console.log("⚡ initProfile called");

  await waitForDom();

  postsGrid = document.getElementById("postsGrid");
  videosGrid = document.getElementById("videosGrid");
  userTab = document.getElementById("userTab");

  if(!isInitialized){
    isInitialized = true;
  }

  // 🔥 IMPORTANT
  switchTab(0);

  // 🔥 ALWAYS INIT GRID (NO DEPEND ON AUTH)
  setTimeout(async () => {

    grid = new window.VirtualGrid(postsGrid);

    let finalData = [];

    try {

      // ================================
      // AUTH TRY
      // ================================
      const res = await supabaseClient.auth.getUser();

      if(res && res.data && res.data.user){
        currentUser = res.data.user;
        console.log("✅ User found");

        // ================================
        // FETCH POSTS
        // ================================
        const { data, error } =
          await supabaseClient
            .from("posts")
            .select("*")
            .eq("user_id", currentUser.id)
            .order("created_at",{ascending:false})
            .limit(50);

        if(!error && data && data.length){
          finalData = data;
          console.log("✅ Real posts:", data.length);
        }

      } else {
        console.warn("⚠️ No user (using fake data)");
      }

    } catch(err){
      console.error("❌ Auth failed → using fake data", err);
    }

    // ================================
    // 💣 FALLBACK (MOST IMPORTANT)
    // ================================
    if(!finalData.length){

      finalData = Array.from({length: 30}).map((_,i)=>({
        image_url: "https://picsum.photos/300?random=" + i
      }));

      console.log("🔥 Fake data loaded");
    }

    // ================================
    // 🚀 FINAL RENDER
    // ================================
    grid.setData(finalData);

  }, 200);
};


// ================================
// 🧹 DESTROY
// ================================
window.FUNCTIONS = window.FUNCTIONS || {};

window.FUNCTIONS.profileDestroy = function(){

  console.log("🧹 profile cleaned");

  if(postsGrid) postsGrid.innerHTML = "";
  grid = null;
};
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
