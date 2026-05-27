

/* FILE: main_js/feedRenderer.js */

// ================================
// RENDER FEED (OPTIMIZED VERSION)
// ================================
function renderFeed(posts = [], append = true){

  const feed =
    document.getElementById("feed");

  const template =
    document.getElementById("postTemplate");

  //////////////////////////////////////////////////
  // 🔥 HARD SAFETY
  //////////////////////////////////////////////////

  if(!feed || !template){

    console.error(
      "❌ feed/template missing"
    );

    return;

  }

  if(!Array.isArray(posts))
    return;

  //////////////////////////////////////////////////
  // 🧹 CLEAN STATES
  //////////////////////////////////////////////////

  document
    .getElementById("emptyFeed")
    ?.remove();

  //////////////////////////////////////////////////
  // 🚀 DOCUMENT FRAGMENT
  // (BIG PERFORMANCE BOOST)
  //////////////////////////////////////////////////

  const fragment =
    document.createDocumentFragment();

  //////////////////////////////////////////////////
  // 🚀 RENDER POSTS
  //////////////////////////////////////////////////

  posts.forEach(post => {

    //////////////////////////////////////////////////
    // 🛡️ SAFETY
    //////////////////////////////////////////////////

    if(!post || !post.id)
      return;

    if(
      document.getElementById(
        "post-" + post.id
      )
    ) return;

    //////////////////////////////////////////////////
    // 📦 DATA
    //////////////////////////////////////////////////

    const username =
      post.username || "user";

    const avatar =
      post.avatar_url ||
      `https://i.pravatar.cc/150?u=${
        encodeURIComponent(username)
      }`;

    const image =
      post.image_url || "";

    const caption =
      post.caption || "";

    const time =
      (
        typeof window.formatTime ===
        "function" &&
        post.created_at
      )

      ? window.formatTime(
          post.created_at
        )

      : "";

    const likes =
      Number(post.likes) || 0;

    //////////////////////////////////////////////////
    // 📄 CLONE TEMPLATE
    //////////////////////////////////////////////////

    const clone =
      template.content.cloneNode(
        true
      );

    const el =
      clone.querySelector(".post");

    if(!el) return;

    //////////////////////////////////////////////////
    // 🆔 POST ID
    //////////////////////////////////////////////////

    el.id =
      "post-" + post.id;

    //////////////////////////////////////////////////
    // 🚀 FAST SELECTORS
    //////////////////////////////////////////////////

    const avatarEl =
      clone.querySelector(
        ".avatar"
      );

    const usernameEl =
      clone.querySelector(
        ".username"
      );

    const img =
      clone.querySelector(
        ".postImage"
      );

    const likesEl =
      clone.querySelector(
        ".postLikes"
      );

    const timeEl =
      clone.querySelector(
        ".postTime"
      );

    const captionUser =
      clone.querySelector(
        ".postCaption b"
      );

    const captionText =
      clone.querySelector(
        ".captionText"
      );

    const likeBtn =
      clone.querySelector(
        ".likeBtn"
      );

    const commentBtn =
      clone.querySelector(
        ".commentBtn"
      );

    const shareBtn =
      clone.querySelector(
        ".shareBtn"
      );

    const saveBtn =
      clone.querySelector(
        ".saveBtn"
      );

    //////////////////////////////////////////////////
    // 👤 USER
    //////////////////////////////////////////////////

    avatarEl.src =
      avatar;

    usernameEl.textContent =
      username;

    //////////////////////////////////////////////////
    // 🖼️ IMAGE (OPTIMIZED)
    //////////////////////////////////////////////////

    img.loading =
      "lazy";

    img.decoding =
      "async";

    img.src =
      image;

    img.setAttribute(
      "data-id",
      post.id
    );

    //////////////////////////////////////////////////
    // 🖼️ IMAGE LOAD
    //////////////////////////////////////////////////

    img.onload = () => {

      img.classList.remove(
        "loading"
      );

      img.classList.add(
        "loaded"
      );

    };

    //////////////////////////////////////////////////
    // ❌ IMAGE FAIL SAFE
    //////////////////////////////////////////////////

    img.onerror = () => {

      img.src =
        "https://via.placeholder.com/400x400?text=No+Image";

    };

    //////////////////////////////////////////////////
    // ❤️ LIKES
    //////////////////////////////////////////////////

    likesEl.textContent =
      likes + " likes";

    likesEl.id =
      "likes-" + post.id;

    //////////////////////////////////////////////////
    // 🕒 TIME
    //////////////////////////////////////////////////

    timeEl.textContent =
      time;

    //////////////////////////////////////////////////
    // 📝 CAPTION
    //////////////////////////////////////////////////

    captionUser.textContent =
      username;

    captionText.textContent =
      caption;

    //////////////////////////////////////////////////
    // ❤️ DOUBLE TAP LIKE
    //////////////////////////////////////////////////

    let lastTap = 0;

    img?.addEventListener(
      "click",
      () => {

        const now =
          Date.now();

        if(
          now - lastTap < 300
        ){

          window.animateHeart?.(
            img
          );

          window.likePost?.(
            likeBtn,
            post.id
          );

        }

        lastTap = now;

      }
    );

    //////////////////////////////////////////////////
    // ❤️ LIKE BUTTON
    //////////////////////////////////////////////////

    likeBtn?.addEventListener(
      "click",
      () => {

        window.likePost?.(
          likeBtn,
          post.id
        );

      }
    );

    //////////////////////////////////////////////////
    // 💬 COMMENT
    //////////////////////////////////////////////////

    commentBtn?.addEventListener(
      "click",
      () => {

        window.commentPost?.(
          post.id
        );

      }
    );

    //////////////////////////////////////////////////
    // 📤 SHARE
    //////////////////////////////////////////////////

    shareBtn?.addEventListener(
      "click",
      () => {

        window.sharePost?.(
          image
        );

      }
    );

    //////////////////////////////////////////////////
    // 💾 SAVE
    //////////////////////////////////////////////////

    saveBtn?.addEventListener(
      "click",
      () => {

        window.savePost?.(
          post.id
        );

      }
    );

    //////////////////////////////////////////////////
    // 🚀 ADD TO FRAGMENT
    //////////////////////////////////////////////////

    append
      ? fragment.appendChild(clone)
      : fragment.prepend(clone);

  });

  //////////////////////////////////////////////////
  // 🚀 SINGLE DOM APPEND
  // (VERY IMPORTANT)
  //////////////////////////////////////////////////

  append
    ? feed.appendChild(fragment)
    : feed.prepend(fragment);

  //////////////////////////////////////////////////
  // 🧹 AUTO CLEAN OLD POSTS
  //////////////////////////////////////////////////

  while(
    feed.children.length > 15
  ){

    feed.removeChild(
      feed.firstElementChild
    );

  }

}

/* FILE: main_js/feedService.js */

console.log("🔥 FETCH SYSTEM READY");

//////////////////////////////////////////////////
// ⏱️ TIMEOUT WRAPPER
//////////////////////////////////////////////////

function fetchWithTimeout(
  promise,
  time = 5000
){

  return Promise.race([

    promise,

    new Promise((_, reject)=>

      setTimeout(()=>{

        reject(
          new Error("Timeout")
        );

      }, time)

    )

  ]);

}

//////////////////////////////////////////////////
// 🚀 LOAD FEED
//////////////////////////////////////////////////

async function loadFeed(){

  //////////////////////////////////////////////////
  // 🛑 STATE CHECK
  //////////////////////////////////////////////////

  if(!window.STATE) return;

  if(
    STATE.LOADING ||
    STATE.END
  ) return;

  //////////////////////////////////////////////////
  // 📦 FEED ELEMENT
  //////////////////////////////////////////////////

  const feed =
    document.getElementById(
      "feed"
    );

  if(!feed){

    console.warn(
      "⚠️ feed not found"
    );

    return;

  }

  //////////////////////////////////////////////////
  // 🔄 LOADING START
  //////////////////////////////////////////////////

  STATE.LOADING = true;

  window.showSkeleton?.();

  try{

    console.log(
      "🔥 FETCH START"
    );

    //////////////////////////////////////////////////
    // 🛑 SUPABASE CHECK
    //////////////////////////////////////////////////

    if(!window.supabaseClient){

      throw new Error(
        "Supabase not initialized"
      );

    }

    //////////////////////////////////////////////////
    // 📄 PAGINATION
    //////////////////////////////////////////////////

    const from =
      STATE.PAGE * STATE.LIMIT;

    const to =
      from + STATE.LIMIT - 1;

    //////////////////////////////////////////////////
    // 🚀 PAGE CONFIG
    //////////////////////////////////////////////////

    const postConfig =

      window.PAGE_CONFIG?.[
        window.CURRENT_PAGE
      ]?.post;

    //////////////////////////////////////////////////
    // 🛑 POST DISABLED
    //////////////////////////////////////////////////

    if(!postConfig?.enabled){

      console.warn(
        "⚠️ Post system disabled"
      );

      return;

    }

    //////////////////////////////////////////////////
    // 🚀 FETCH FROM PLUGIN
    //////////////////////////////////////////////////

    const data =
      await fetchWithTimeout(

        window.POST_PLUGIN?.fetch(
          from,
          to
        ),

      5000);

    //////////////////////////////////////////////////
    // 📭 NO DATA
    //////////////////////////////////////////////////

    if(
      !data ||
      data.length === 0
    ){

      //////////////////////////////////////////////////
      // 🛑 END
      //////////////////////////////////////////////////

      STATE.END = true;

      //////////////////////////////////////////////////
      // 😴 FALLBACK
      //////////////////////////////////////////////////

      if(

        STATE.PAGE === 0 &&

        postConfig?.fallback

      ){

        window.renderFeed?.(

          window.POST_PLUGIN?.fallback?.()

        , true);

      }

      //////////////////////////////////////////////////
      // 📭 EMPTY UI
      //////////////////////////////////////////////////

      else if(
        STATE.PAGE === 0
      ){

        showEmptyFeed?.();

      }

      return;

    }

    //////////////////////////////////////////////////
    // ✅ SUCCESS
    //////////////////////////////////////////////////

    STATE.FEED.push(
      ...data
    );

    window.renderFeed?.(
      data,
      true
    );

    STATE.PAGE++;

    console.log(
      "✅ FEED LOADED:",
      data.length
    );

  }catch(err){

    //////////////////////////////////////////////////
    // ❌ ERROR
    //////////////////////////////////////////////////

    console.error(
      "❌ FEED ERROR:",
      err.message
    );

    //////////////////////////////////////////////////
    // 😴 FALLBACK
    //////////////////////////////////////////////////

    const postConfig =

      window.PAGE_CONFIG?.[
        window.CURRENT_PAGE
      ]?.post;

    if(

      STATE.PAGE === 0 &&

      postConfig?.fallback

    ){

      window.renderFeed?.(

        window.POST_PLUGIN?.fallback?.()

      , true);

    }

    //////////////////////////////////////////////////
    // 📢 TOAST
    //////////////////////////////////////////////////

    window.toast?.(
      "Offline mode"
    );

  }finally{

    //////////////////////////////////////////////////
    // 🧹 CLEANUP
    //////////////////////////////////////////////////

    window.hideSkeleton?.();

    STATE.LOADING = false;

  }

}

//////////////////////////////////////////////////
// 🚀 CREATE POST
//////////////////////////////////////////////////

async function createPost(){

  //////////////////////////////////////////////////
  // 🛑 OFFLINE
  //////////////////////////////////////////////////

  if(!window.supabaseClient){

    window.toast?.(
      "Offline - cannot post"
    );

    return;

  }

  //////////////////////////////////////////////////
  // 📷 INPUTS
  //////////////////////////////////////////////////

  const image =
    prompt(
      "Enter image URL"
    );

  if(!image) return;

  const caption =

    prompt("Caption")

    || "";

  const username =

    prompt("Username")

    || "user";

  //////////////////////////////////////////////////
  // ⏳ LOADING
  //////////////////////////////////////////////////

  window.toast?.(
    "Uploading..."
  );

  try{

    //////////////////////////////////////////////////
    // 🚀 INSERT
    //////////////////////////////////////////////////

    const { data, error } =

      await fetchWithTimeout(

        supabaseClient

          .from("posts")

          .insert([{

            image_url:
              image,

            caption:
              caption,

            username:
              username,

            likes: 0

          }])

          .select()

          .single()

      , 5000);

    //////////////////////////////////////////////////
    // ❌ ERROR
    //////////////////////////////////////////////////

    if(error){

      throw error;

    }

    //////////////////////////////////////////////////
    // ✅ SUCCESS
    //////////////////////////////////////////////////

    window.toast?.(
      "Uploaded"
    );

    window.renderFeed?.(
      [data],
      false
    );

    if(window.STATE){

      STATE.FEED.unshift(
        data
      );

    }

  }catch(err){

    //////////////////////////////////////////////////
    // ❌ FAIL
    //////////////////////////////////////////////////

    console.error(
      "❌ CREATE POST ERROR:",
      err.message
    );

    window.toast?.(
      "Failed (offline?)"
    );

  }

}

//////////////////////////////////////////////////
// 📭 EMPTY FEED UI
//////////////////////////////////////////////////

function showEmptyFeed(){

  const feed =
    document.getElementById(
      "feed"
    );

  if(!feed) return;

  feed.innerHTML = `

    <div class="emptyFeed">

      <h3>
        No posts yet
      </h3>

      <p>
        Start by creating one 🚀
      </p>

    </div>

  `;

}

//////////////////////////////////////////////////
// 🌍 GLOBAL EXPORT
//////////////////////////////////////////////////

window.loadFeed =
  loadFeed;

window.createPost =
  createPost;

window.showEmptyFeed =
  showEmptyFeed;

//////////////////////////////////////////////////
// 💀 GLOBAL ERROR LOGGER
//////////////////////////////////////////////////

window.addEventListener?.(

  "error",

  e => {

    console.log(

      "💀 ERROR IN FILE:",

      e.filename,

      e.message

    );

  }

);

/* FILE: main_js/pageloader/virtualGrid.js */

console.log(" virtualGrid loaded");

window.VirtualGrid = function(container){

  const state = {
    container,
    data: [],
    pool: [],
    visibleCount: 18, //  6 rows � 3 cols (better UX)
    startIndex: 0,
    cols: 3,
    gap: 2,
    itemSize: 0
  };

  state.container.style.position = "relative";

  // ================================
  //  CALCULATE SIZE
  // ================================
  function calculateSize(){

    let width = state.container.clientWidth;

    if(!width || width < 100){
      width = state.container.getBoundingClientRect().width;
    }

    if(!width || width < 100){
      width = Math.min(window.innerWidth, 420);
    }

    const totalGap = state.gap * (state.cols - 1);

    state.itemSize = Math.floor((width - totalGap) / state.cols);
  }

  // ================================
  //  CREATE POOL
  // ================================
  function createPool(){

    for(let i=0;i<state.visibleCount;i++){

      const div = document.createElement("div");
      div.className = "post";

      const img = new Image();
      img.loading = "lazy";
      img.decoding = "async";

      div.appendChild(img);
      state.container.appendChild(div);

      state.pool.push(div);
    }
  }

  // ================================
  //  RENDER
  // ================================
  function render(){

    for(let i=0;i<state.pool.length;i++){

      const item = state.pool[i];
      const data = state.data[i];

      if(!data){
        item.style.display = "none";
        continue;
      }

      item.style.display = "block";

      const row = Math.floor(i / state.cols);
      const col = i % state.cols;

      const size = state.itemSize;

      item.style.position = "absolute";
      item.style.width = size + "px";
      item.style.height = size + "px";

      item.style.left = (col * (size + state.gap)) + "px";
      item.style.top = (row * (size + state.gap)) + "px";

      const img = item.querySelector("img");

      if(img.src !== data.image_url){
        img.src = data.image_url || "https://via.placeholder.com/300";
      }
    }
  }

  // ================================
  //  SET DATA (LIMITED HEIGHT)
  // ================================
  function setData(list){

    state.data = list || [];

    calculateSize();

    if(state.itemSize === 0){
      setTimeout(() => setData(state.data), 80);
      return;
    }

    const rows = Math.ceil(state.pool.length / state.cols);
    const height = rows * (state.itemSize + state.gap);

    //  LIMITED HEIGHT (NO INFINITE)
    state.container.style.height = height + "px";

    render();
  }

  // ================================
  //  RESIZE
  // ================================
  window.addEventListener("resize", () => {
    calculateSize();
    render();
  });

  createPool();

  return {
    setData
  };
};
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
