console.log(" post.js loaded");

window.POST_PLUGIN = {

  //////////////////////////////////////////////////
  //  FETCH POSTS
  //////////////////////////////////////////////////

  async fetch(from, to){

    if(!window.supabaseClient){
      throw new Error(
        "Supabase not initialized"
      );
    }

    const { data, error } =
      await supabaseClient

      .from("posts")

      .select("*")

      .order(
        "created_at",
        {
          ascending:false
        }
      )

      .range(from, to);

    if(error) throw error;

    return window.optimizePosts

      ? window.optimizePosts(data)

      : data;
  },

  //////////////////////////////////////////////////
  //  OFFLINE FALLBACK
  //////////////////////////////////////////////////

  fallback(){

    return [{

      id: "MINIGRAM",

      username: "minigram v2",

      image_url:
        "https://picsum.photos/400",

      caption:
        " Offline mode ",

      likes: 0,

      created_at:
        new Date()

    }];

  }

};