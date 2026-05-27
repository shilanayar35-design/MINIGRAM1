(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // state.js
  var require_state = __commonJS({
    "state.js"() {
      console.log(" state.js loaded");
      window.REELS_STATE = {
        container: null,
        reels: [],
        data: [],
        index: 0,
        isFetching: false,
        lastId: null
      };
      window.initReelsState = function(container) {
        window.REELS_STATE.container = container;
        console.log(" container set");
      };
      window.resetReelsState = function() {
        const s = window.REELS_STATE;
        s.reels = [];
        s.data = [];
        s.index = 0;
      };
    }
  });

  // utils.js
  var require_utils = __commonJS({
    "utils.js"() {
      console.log(" utils.js loaded");
      window.format = (n) => {
        if (n > 1e6) return (n / 1e6).toFixed(1) + "M";
        if (n > 1e3) return (n / 1e3).toFixed(1) + "K";
        return n;
      };
    }
  });

  // like.js
  var require_like = __commonJS({
    "like.js"() {
      console.log("\u2764\uFE0F like.js loaded");
      function toggleLike(el) {
        el.classList.toggle("liked");
      }
      document.addEventListener("click", (e) => {
        const btn = e.target.closest(".like");
        if (!btn) return;
        toggleLike(btn);
      });
      window.toggleLike = toggleLike;
    }
  });

  // progress.js
  var require_progress = __commonJS({
    "progress.js"() {
      console.log("\u23F1\uFE0F progress.js loaded");
      function startProgress(reel, video) {
        const bar = reel.querySelector(".bar");
        if (!bar) return;
        function loop() {
          if (!video.duration) return requestAnimationFrame(loop);
          bar.style.width = video.currentTime / video.duration * 100 + "%";
          if (!video.paused) {
            requestAnimationFrame(loop);
          }
        }
        loop();
      }
      window.startProgress = startProgress;
    }
  });

  // video.js
  var require_video = __commonJS({
    "video.js"() {
      console.log(" video.js loaded");
      window.preloadNext = function() {
        const s = window.REELS_STATE;
        const next = s.reels[s.index + 1];
        if (next) {
          const v = next.querySelector("video");
          if (v) v.preload = "auto";
        }
      };
    }
  });

  // swipe.js
  var require_swipe = __commonJS({
    "swipe.js"() {
      console.log("\u{1F590}\uFE0F swipe.js loaded");
      function initSwipe() {
        const s = window.REELS_STATE;
        const el = s.container;
        let startY = 0;
        let delta = 0;
        let dragging = false;
        el.addEventListener("touchstart", (e) => {
          startY = e.touches[0].clientY;
          dragging = true;
        });
        el.addEventListener("touchmove", (e) => {
          if (!dragging) return;
          delta = e.touches[0].clientY - startY;
        });
        el.addEventListener("touchend", () => {
          if (Math.abs(delta) > 80) {
            s.index += delta < 0 ? 1 : -1;
          }
          s.index = Math.max(0, Math.min(s.index, s.reels.length - 1));
          window.render();
          dragging = false;
          delta = 0;
        });
      }
      window.initSwipe = initSwipe;
    }
  });

  // create.js
  var require_create = __commonJS({
    "create.js"() {
      console.log("\u{1F3AC} create.js loaded");
      function createReel(data) {
        const reel = document.createElement("div");
        reel.className = "reel";
        const video = document.createElement("video");
        video.src = data.video;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        reel.appendChild(video);
        const overlay = document.createElement("div");
        overlay.className = "overlay";
        overlay.innerHTML = `
    <div class="user">${data.user || "user"}</div>
    <div class="caption">${data.caption || ""}</div>
    <div class="likes">\u2764\uFE0F ${data.likes || 0}</div>
  `;
        reel.appendChild(overlay);
        return reel;
      }
      window.createReel = createReel;
    }
  });

  // append.js
  var require_append = __commonJS({
    "append.js"() {
      console.log("\u{1F4E6} append.js loaded");
      function appendReels(list) {
        const s = window.REELS_STATE;
        if (!s.container) return;
        list.forEach((d) => {
          const reel = window.createReel(d);
          s.container.appendChild(reel);
          s.reels.push(reel);
        });
      }
      window.appendReels = appendReels;
    }
  });

  // fetch.js
  var require_fetch = __commonJS({
    "fetch.js"() {
      console.log("\u{1F4E1} fetch.js loaded");
      async function fetchReels() {
        const s = window.REELS_STATE;
        if (!window.supabase) {
          console.log("\u26A0\uFE0F offline mode");
          return window.loadDummy?.();
        }
        if (s.isFetching) return;
        s.isFetching = true;
        try {
          const { data, error } = await window.supabase.from("reels").select("*").limit(5);
          if (error || !data?.length) {
            return window.loadDummy?.();
          }
          const existing = new Set(s.data.map((x) => x.id));
          const fresh = data.filter((d) => !existing.has(d.id));
          s.data.push(...fresh);
          window.appendReels(fresh);
          window.render();
        } catch (e) {
          console.log("fetch fail \u2192 dummy");
          window.loadDummy?.();
        }
        s.isFetching = false;
      }
      window.fetchReels = fetchReels;
    }
  });

  // main.js
  var require_main = __commonJS({
    "main.js"() {
      var state = __toESM(require_state());
      var utils = __toESM(require_utils());
      var like = __toESM(require_like());
      var progress = __toESM(require_progress());
      var video = __toESM(require_video());
      var swipe = __toESM(require_swipe());
      var create = __toESM(require_create());
      var append = __toESM(require_append());
      var fetch = __toESM(require_fetch());
      console.log(state, utils, like, progress, video, swipe, create, append, fetch);
    }
  });
  require_main();
})();
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
