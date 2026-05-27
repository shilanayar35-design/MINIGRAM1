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