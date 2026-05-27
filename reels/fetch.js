console.log("📡 fetch.js loaded");

async function fetchReels(){

  const s = window.REELS_STATE;

  if(!window.supabase){
    console.log("⚠️ offline mode");
    return window.loadDummy?.();
  }

  if(s.isFetching) return;
  s.isFetching = true;

  try{

    const { data, error } = await window.supabase
      .from("reels")
      .select("*")
      .limit(5);

    if(error || !data?.length){
      return window.loadDummy?.();
    }

    const existing = new Set(s.data.map(x=>x.id));
    const fresh = data.filter(d=>!existing.has(d.id));

    s.data.push(...fresh);

    window.appendReels(fresh);
    window.render();

  }catch(e){
    console.log("fetch fail → dummy");
    window.loadDummy?.();
  }

  s.isFetching = false;
}

window.fetchReels = fetchReels;
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
