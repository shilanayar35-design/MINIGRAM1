console.log("⚡ post_optimizer loaded");

window.optimizePosts = function(posts = []){

  return posts.map(post => ({

    id: post.id || crypto.randomUUID(),
    username: post.username || "user",
    caption: post.caption || "",
    likes: Number(post.likes) || 0,
    created_at: post.created_at || new Date(),

    image_url: post.image_url || "https://picsum.photos/400",

    avatar_url: post.avatar_url ||
      `https://i.pravatar.cc/150?u=${encodeURIComponent(post.username || "user")}`

  }));

};