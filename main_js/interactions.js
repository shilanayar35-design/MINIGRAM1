// ================================
// HEART ANIMATION
// ================================

function animateHeart(img){

  const container = img.parentElement;

  const heart = document.createElement("div");

  heart.className = "heart";
  heart.innerText = "❤";

  container.appendChild(heart);

  setTimeout(()=>heart.remove(), 600);

}


// ================================
// LIKE SYSTEM (OPTIMISTIC)
// ================================

async function likePost(el, id){

  const likesEl = document.getElementById("likes-" + id);
  if(!likesEl) return;

  let likes = parseInt(likesEl.innerText) || 0;
  let liked = el.classList.contains("liked");

  // ================================
  // UI UPDATE
  // ================================
  if(!liked){
    likes++;
    el.innerText = "❤";
    el.classList.add("liked");
  }else{
    likes--;
    el.innerText = "🤍";
    el.classList.remove("liked");
  }

  likesEl.innerText = likes + " likes";

  // ================================
  // UPDATE STATE
  // ================================
  const post = STATE.FEED.find(p => p.id === id);
  if(post){
    post.likes = likes;
  }

  // ================================
  // BACKEND UPDATE
  // ================================
  try{

    await supabaseClient
      .from("posts")
      .update({ likes: likes })
      .eq("id", id);

  }catch(err){

    console.error(err);
    toast("Like failed");

  }

}


// ================================
// COMMENT
// ================================

function commentPost(id){
  toast("Comment system coming soon");
}


// ================================
// SHARE
// ================================

function sharePost(url){

  navigator.clipboard.writeText(url);
  toast("Link copied");

}


// ================================
// SAVE
// ================================

function savePost(id){
  toast("Saved");
}


// ================================
// OPEN CHAT
// ================================

function openChat(){
  window.location.href = "chat.html";
}


// ================================
// GLOBAL EXPORT (🔥 MOST IMPORTANT)
// ================================

window.animateHeart = animateHeart;
window.likePost = likePost;
window.commentPost = commentPost;
window.sharePost = sharePost;
window.savePost = savePost;
window.openChat = openChat;
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
