window.initRealtime = function () {

  try {

    if (!window.supabaseClient || !window.STATE) {
      console.warn("Realtime skipped");
      return;
    }

    if (STATE.postChannel) {
      try {
        supabaseClient.removeChannel(STATE.postChannel);
      } catch (e) {}
    }

    STATE.postChannel =
      supabaseClient
        .channel("posts")
        .on("postgres_changes", {
          event: "INSERT",
          schema: "public",
          table: "posts"
        }, payload => {

          const post = payload.new;

          if (!document.getElementById("post-" + post.id)) {
            window.renderFeed && window.renderFeed([post], false);
          }

        })
        .subscribe((status, err) => {

          if (err) {
            console.warn("Realtime error:", err);
            return;
          }

          console.log("⚡ Realtime:", status);
        });

  } catch (e) {
    console.warn("Realtime crash safe");
  }

};
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
