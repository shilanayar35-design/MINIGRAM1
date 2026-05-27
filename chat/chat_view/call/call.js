function initCall() {

  const muteBtn = document.querySelector(".mute");
  const speakerBtn = document.querySelector(".speaker");
  const endCallBtn = document.querySelector(".endCall");
  const screen = document.querySelector(".callScreen");

  let muted = false;
  let speaker = false;

  muteBtn?.addEventListener("click", () => {
    muted = !muted;
    muteBtn.classList.toggle("active", muted);
  });

  speakerBtn?.addEventListener("click", () => {
    speaker = !speaker;
    speakerBtn.classList.toggle("active", speaker);
  });

  endCallBtn?.addEventListener("click", () => {

    if (navigator.vibrate) navigator.vibrate(50);

    if (screen) {
      screen.style.transition = "0.3s ease";
      screen.style.opacity = "0";
      screen.style.transform = "scale(0.95)";
    }

    setTimeout(() => {
      window.location.href = "../chat/chat.html";
    }, 300);

  });
}

document.addEventListener("DOMContentLoaded", initCall);
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
