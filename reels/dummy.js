console.log("🎭 dummy.js loaded");

function loadDummy(){

  const s = window.REELS_STATE;

  const dummy = [
    {
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
      user: "demo1",
      caption: "dummy reel 1",
      likes: 1200
    },
    {
      video: "https://www.w3schools.com/html/movie.mp4",
      user: "demo2",
      caption: "dummy reel 2",
      likes: 5000
    }
  ];

  s.data = dummy;

  window.appendReels(dummy);
  window.render();
}

window.loadDummy = loadDummy;
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
