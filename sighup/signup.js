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

// ---------------- SIGNUP FUNCTION ----------------
const signupBtn = document.getElementById("signupBtn");
if(signupBtn){
  signupBtn.addEventListener("click", () => {
    const fullname = document.getElementById("fullname").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirm = document.getElementById("confirmPassword").value.trim();

    if(!fullname || !username || !email || !password || !confirm){
      alert("Please fill all fields");
      return;
    }

    if(password !== confirm){
      alert("Passwords do not match");
      return;
    }

    // ✅ Save username
    localStorage.setItem("minigram_user", username);
    alert("Account created for " + username);

    // ---------------- REDIRECT TO INDEX ----------------
    if(window.top !== window.self){
      window.top.document.getElementById("loaderFrame").src = "index.html";
    } else {
      window.location.href = "/storage/emulated/0/MINIGRAM1/index.html";
    }
  });

  // Enter key triggers signup
  document.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
      e.preventDefault();
      signupBtn.click();
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
