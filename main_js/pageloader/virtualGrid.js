console.log(" virtualGrid loaded");

window.VirtualGrid = function(container){

  const state = {
    container,
    data: [],
    pool: [],
    visibleCount: 18, //  6 rows × 3 cols (better UX)
    startIndex: 0,
    cols: 3,
    gap: 2,
    itemSize: 0
  };

  state.container.style.position = "relative";

  // ================================
  //  CALCULATE SIZE
  // ================================
  function calculateSize(){

    let width = state.container.clientWidth;

    if(!width || width < 100){
      width = state.container.getBoundingClientRect().width;
    }

    if(!width || width < 100){
      width = Math.min(window.innerWidth, 420);
    }

    const totalGap = state.gap * (state.cols - 1);

    state.itemSize = Math.floor((width - totalGap) / state.cols);
  }

  // ================================
  //  CREATE POOL
  // ================================
  function createPool(){

    for(let i=0;i<state.visibleCount;i++){

      const div = document.createElement("div");
      div.className = "post";

      const img = new Image();
      img.loading = "lazy";
      img.decoding = "async";

      div.appendChild(img);
      state.container.appendChild(div);

      state.pool.push(div);
    }
  }

  // ================================
  //  RENDER
  // ================================
  function render(){

    for(let i=0;i<state.pool.length;i++){

      const item = state.pool[i];
      const data = state.data[i];

      if(!data){
        item.style.display = "none";
        continue;
      }

      item.style.display = "block";

      const row = Math.floor(i / state.cols);
      const col = i % state.cols;

      const size = state.itemSize;

      item.style.position = "absolute";
      item.style.width = size + "px";
      item.style.height = size + "px";

      item.style.left = (col * (size + state.gap)) + "px";
      item.style.top = (row * (size + state.gap)) + "px";

      const img = item.querySelector("img");

      if(img.src !== data.image_url){
        img.src = data.image_url || "https://via.placeholder.com/300";
      }
    }
  }

  // ================================
  //  SET DATA (LIMITED HEIGHT)
  // ================================
  function setData(list){

    state.data = list || [];

    calculateSize();

    if(state.itemSize === 0){
      setTimeout(() => setData(state.data), 80);
      return;
    }

    const rows = Math.ceil(state.pool.length / state.cols);
    const height = rows * (state.itemSize + state.gap);

    //  LIMITED HEIGHT (NO INFINITE)
    state.container.style.height = height + "px";

    render();
  }

  // ================================
  //  RESIZE
  // ================================
  window.addEventListener("resize", () => {
    calculateSize();
    render();
  });

  createPool();

  return {
    setData
  };
};
window.addEventListener && window.addEventListener("error", e => console.log("ðŸ’€ ERROR IN FILE:", e.filename, e.message));
