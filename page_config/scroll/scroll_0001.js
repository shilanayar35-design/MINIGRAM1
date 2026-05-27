//////////////////////////////////////////////////
// 📜 HOME SCROLL ENGINE (ULTRA LIGHT FINAL)
//////////////////////////////////////////////////

console.log("📜 scroll_0001 loaded");

window.SCROLL_SYSTEM =
  window.SCROLL_SYSTEM || {};

window.initScroll =
async function () {

  try {

    //////////////////////////////////////////////////
    // 🛡️ PREVENT DUPLICATE
    //////////////////////////////////////////////////

    if (
      window.SCROLL_SYSTEM.home
        ?.initialized
    ) return;

    //////////////////////////////////////////////////
    // 📦 FEED
    //////////////////////////////////////////////////

    const feed =
      document.getElementById(
        "feed"
      );

    if (!feed) return;

    //////////////////////////////////////////////////
    // 💾 SYSTEM
    //////////////////////////////////////////////////

    const system =
      (
        window.SCROLL_SYSTEM.home = {

          initialized: true,

          loading: false,

          observer: null,

          imageObserver: null,

          scrollHandler: null,

          stats: {

            events: 0,

            loads: 0

          }

        }
      );

    //////////////////////////////////////////////////
    // ⚡ FAST HELPERS
    //////////////////////////////////////////////////

    const getScrollTop =
      () =>

        window.pageYOffset ||

        document
          .documentElement
          .scrollTop ||

        0;

    const getHeight =
      () =>

        document
          .documentElement
          .scrollHeight;

    const getScreen =
      () =>

        window.innerHeight;

    //////////////////////////////////////////////////
    // 🚀 SCROLL ENGINE
    //////////////////////////////////////////////////

    let ticking = false;

    const onScroll =
      () => {

        if (ticking) return;

        ticking = true;

        requestAnimationFrame(

          async () => {

            ticking = false;

            //////////////////////////////////////////////////
            // 📊 EVENTS
            //////////////////////////////////////////////////

            system.stats.events++;

            //////////////////////////////////////////////////
            // 📏 POSITION
            //////////////////////////////////////////////////

            const scrollY =
              getScrollTop();

            const height =
              getHeight();

            const screen =
              getScreen();

            //////////////////////////////////////////////////
            // 🛑 STOP
            //////////////////////////////////////////////////

            if (
              window.STATE?.LOADING ||

              window.STATE?.END
            ) return;

            if (
              system.loading
            ) return;

            //////////////////////////////////////////////////
            // 🚀 LOAD MORE
            //////////////////////////////////////////////////

            if (
              height -
              (scrollY + screen)
              < 600
            ) {

              system.loading = true;

              system.stats.loads++;

              console.log(
                "🚀 LOAD MORE"
              );

              try {

                //////////////////////////////////////////////////
                // 🚀 LOAD FEED
                //////////////////////////////////////////////////

                await window
                  .loadFeed?.();

                //////////////////////////////////////////////////
                // 🧹 LIMIT POSTS
                //////////////////////////////////////////////////

                if (
                  feed.children.length
                  > 30
                ) {

                  feed.removeChild(

                    feed
                      .firstElementChild

                  );

                }

              } catch (e) {

                console.error(
                  "loadFeed error:",
                  e
                );

              }

              //////////////////////////////////////////////////
              // 🔓 UNLOCK
              //////////////////////////////////////////////////

              system.loading =
                false;

            }

          }

        );

      };

    //////////////////////////////////////////////////
    // 📡 EVENT
    //////////////////////////////////////////////////

    window.addEventListener(

      "scroll",

      onScroll,

      {
        passive: true
      }

    );

    system.scrollHandler =
      onScroll;

    //////////////////////////////////////////////////
    // 👁️ POST OBSERVER
    //////////////////////////////////////////////////

    const observer =
      new IntersectionObserver(

        (entries) => {

          for (
            const entry
            of entries
          ) {

            if (
              entry.isIntersecting
            ) {

              entry.target
                .classList
                .add(
                  "visible"
                );

            }

          }

        },

        {
          threshold: 0.15
        }

      );

    system.observer =
      observer;

    //////////////////////////////////////////////////
    // 👀 OBSERVE POSTS
    //////////////////////////////////////////////////

    document
      .querySelectorAll(
        ".post"
      )
      .forEach(
        (el) => {

          observer.observe(
            el
          );

        }
      );

    //////////////////////////////////////////////////
    // 🖼️ IMAGE OBSERVER
    //////////////////////////////////////////////////

    const imageObserver =
      new IntersectionObserver(

        (entries) => {

          for (
            const entry
            of entries
          ) {

            if (
              !entry.isIntersecting
            ) continue;

            const img =
              entry.target;

            const src =
              img.dataset.src;

            if (src) {

              img.src = src;

              img.removeAttribute(
                "data-src"
              );

            }

            imageObserver
              .unobserve(
                img
              );

          }

        },

        {
          rootMargin:
            "150px"
        }

      );

    system.imageObserver =
      imageObserver;

    //////////////////////////////////////////////////
    // 👀 OBSERVE IMAGES
    //////////////////////////////////////////////////

    document
      .querySelectorAll(
        "img[data-src]"
      )
      .forEach(
        (img) => {

          imageObserver
            .observe(
              img
            );

        }
      );

    //////////////////////////////////////////////////
    // 🎉 READY
    //////////////////////////////////////////////////

    console.log(
      "✅ Scroll Engine READY"
    );

  } catch (e) {

    console.error(
      "initScroll error:",
      e
    );

  }

};

//////////////////////////////////////////////////
// 🧹 DESTROY
//////////////////////////////////////////////////

window.destroyScroll =
function () {

  const system =
    window.SCROLL_SYSTEM
      ?.home;

  if (!system) return;

  //////////////////////////////////////////////////
  // 🧹 REMOVE EVENT
  //////////////////////////////////////////////////

  window.removeEventListener(

    "scroll",

    system.scrollHandler

  );

  //////////////////////////////////////////////////
  // 🧹 DISCONNECT
  //////////////////////////////////////////////////

  system.observer
    ?.disconnect();

  system.imageObserver
    ?.disconnect();

  //////////////////////////////////////////////////
  // ❌ REMOVE SYSTEM
  //////////////////////////////////////////////////

  delete window
    .SCROLL_SYSTEM
    .home;

  console.log(
    "🧹 Scroll Destroyed"
  );

};