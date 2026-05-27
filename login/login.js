// ---------------- PASSWORD TOGGLE ----------------
const toggle = document.getElementById("togglePassword");
const pass = document.getElementById("password");

if(toggle && pass){
  toggle.addEventListener("click", () => {
    pass.type = pass.type === "password" ? "text" : "password";
    toggle.querySelector("i").classList.toggle("fa-eye");
    toggle.querySelector("i").classList.toggle("fa-eye-slash");
  });
}

// ---------------- LOGIN FUNCTION ----------------
const loginBtn = document.getElementById("loginBtn");
if(loginBtn){
  loginBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if(!username || !password){
      alert("Please enter username and password");
      return;
    }

    // ✅ Save username
    localStorage.setItem("minigram_user", username);
    alert("Welcome " + username);

    // ---------------- REDIRECT TO INDEX ----------------
    if(window.top !== window.self){
      // Loader iframe me hai
      window.top.document.getElementById("loaderFrame").src = "index.html";
    } else {
      // Direct browser
      window.location.href = "index.html";
    }
  });

  // Enter key triggers login
  document.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
      e.preventDefault();
      loginBtn.click();
    }
  });
}

// ---------------- RIPPLE EFFECT ----------------
document.addEventListener("click", function(e){
  const rippleLayer = document.querySelector(".ripple-layer");
  if(!rippleLayer) return;

  const ripple = document.createElement("span");
  ripple.className = "ripple";
  ripple.style.left = e.clientX + "px";
  ripple.style.top = e.clientY + "px";
  rippleLayer.appendChild(ripple);
  setTimeout(() => ripple.remove(), 1000);
});
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
