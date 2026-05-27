// ================= AUTH CHECK =================

function checkAuth(){

let user = localStorage.getItem("minigram_user")

if(!user){

// show login page
loadPage("login.html")

// hide home feed
document.getElementById("homeSection").style.display = "none"

}

else{

showHome()

}

}


// ================= LOGIN SUCCESS =================

function loginSuccess(username){

localStorage.setItem("minigram_user", username)

document.getElementById("appContent").innerHTML = ""

showHome()

}


// ================= LOGOUT =================

function logout(){

localStorage.removeItem("minigram_user")

loadPage("login.html")

}


// ================= MAKE GLOBAL =================

window.loginSuccess = loginSuccess
window.logout = logout
window.checkAuth = checkAuth
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
