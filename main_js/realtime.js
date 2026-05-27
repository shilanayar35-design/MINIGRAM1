// ================================
// REALTIME POSTS (ULTRA SAFE)
// ================================

function initRealtime(){

  console.log("⚡ Realtime Init");

  // ================================
  // SUPABASE CHECK
  // ================================
  if(!window.supabaseClient){
    console.warn("⚠ Supabase not found (offline mode)");
    return;
  }

  try{

    // ================================
    // REMOVE OLD CHANNEL (SAFE)
    // ================================
    if(window.STATE?.postChannel){
      try{
        supabaseClient.removeChannel(STATE.postChannel);
        console.log("🧹 Old channel removed");
      }catch(e){
        console.warn("⚠ Channel remove error:", e);
      }
    }

    // ================================
    // CREATE CHANNEL
    // ================================
    STATE.postChannel =
      supabaseClient
        .channel("posts")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "posts"
          },
          payload => {

            try{

              const post = payload?.new;
              if(!post || !post.id) return;

              console.log("🆕 Realtime post:", post);

              // ================================
              // AVOID DUPLICATE
              // ================================
              if(document.getElementById("post-" + post.id)) return;

              // ================================
              // UPDATE STATE
              // ================================
              if(window.STATE){
                STATE.FEED.unshift(post);
              }

              // ================================
              // RENDER
              // ================================
              window.renderFeed?.([post], false);

              // ================================
              // TOAST
              // ================================
              window.toast?.("New post");

            }catch(innerErr){
              console.warn("⚠ Realtime handler error:", innerErr);
            }

          }
        )

        // 🔥 FIXED SUBSCRIBE (IMPORTANT)
        .subscribe((status, err)=>{

          if(err){
            console.warn("⚠ Realtime error:", err);
            return;
          }

          console.log("⚡ Realtime:", status);

        });

    console.log("✅ Realtime Connected");

  }catch(e){

    console.error("❌ Realtime Crash:", e);

  }

}


// ================================
// GLOBAL EXPORT
// ================================

window.initRealtime = initRealtime;
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
