//////////////////////////////////////////////////
//  FPS ENGINE + ADAPTIVE CONTROLLER (FINAL)
//////////////////////////////////////////////////

console.log(" fps.js loaded");

//////////////////////////////////////////////////
//  GLOBAL PERFORMANCE STATE
//////////////////////////////////////////////////

window.performanceMode =
window.performanceMode || "high";

window.__LAST_MODE =
window.__LAST_MODE || "high";

window.__FPS =
window.__FPS || 60;

window.__FPS_DROP_COUNT = 0;
window.__FPS_RISE_COUNT = 0;

//////////////////////////////////////////////////
//  FPS BOX
//////////////////////////////////////////////////

(function(){

  const box =
    document.createElement("div");

  box.id = "fpsBox";

  //////////////////////////////////////////////////
  //  STYLE
  //////////////////////////////////////////////////

  box.style.position = "fixed";
  box.style.top = "50%";
  box.style.right = "6px";

  box.style.transform =
    "translateY(-50%)";

  box.style.padding = "4px 7px";

  box.style.fontSize = "10px";
  box.style.fontWeight = "600";

  box.style.color = "#0f0";

  box.style.background =
    "rgba(0,0,0,0.45)";

  box.style.borderRadius = "7px";

  box.style.backdropFilter =
    "blur(4px)";

  box.style.zIndex = "999999";

  box.style.pointerEvents = "none";

  box.style.transition =
    "all .25s ease";

  box.innerText =
    "FPS: 0 | HIGH";

  document.body.appendChild(box);

  //////////////////////////////////////////////////
  //  ENGINE
  //////////////////////////////////////////////////

  let frames = 0;

  let last =
    performance.now();

  //////////////////////////////////////////////////
  //  MODE SWITCH SYSTEM
  //////////////////////////////////////////////////

  function updateMode(fps){

    //////////////////////////////////////////////////
    //  LOW DETECT
    //////////////////////////////////////////////////

    if(fps < 25){

      window.__FPS_DROP_COUNT++;

      window.__FPS_RISE_COUNT = 0;

      //////////////////////////////////////////////////
      //  STABLE LOW
      //////////////////////////////////////////////////

      if(
        window.__FPS_DROP_COUNT >= 2 &&
        window.performanceMode !== "low"
      ){

        window.performanceMode =
          "low";

      }

    }

    //////////////////////////////////////////////////
    //  MID DETECT
    //////////////////////////////////////////////////

    else if(fps < 45){

      window.__FPS_DROP_COUNT = 0;
      window.__FPS_RISE_COUNT = 0;

      if(
        window.performanceMode !== "mid"
      ){

        window.performanceMode =
          "mid";

      }

    }

    //////////////////////////////////////////////////
    //  HIGH DETECT
    //////////////////////////////////////////////////

    else{

      window.__FPS_RISE_COUNT++;

      window.__FPS_DROP_COUNT = 0;

      //////////////////////////////////////////////////
      //  STABLE HIGH
      //////////////////////////////////////////////////

      if(
        window.__FPS_RISE_COUNT >= 3 &&
        window.performanceMode !== "high"
      ){

        window.performanceMode =
          "high";

      }

    }

  }

  //////////////////////////////////////////////////
  //  UI UPDATE
  //////////////////////////////////////////////////

  function updateBox(fps){

    const mode =
      window.performanceMode;

    //////////////////////////////////////////////////
    //  COLORS
    //////////////////////////////////////////////////

    if(mode === "high"){

      box.style.color = "#00ff99";

    }

    else if(mode === "mid"){

      box.style.color = "#ffd500";

    }

    else{

      box.style.color = "#ff4444";

    }

    //////////////////////////////////////////////////
    //  TEXT
    //////////////////////////////////////////////////

    box.innerText =
      `FPS: ${fps} | ${mode.toUpperCase()}`;

  }

  //////////////////////////////////////////////////
  //  MAIN LOOP
  //////////////////////////////////////////////////

  function loop(now){

    frames++;

    //////////////////////////////////////////////////
    //  EVERY 1 SECOND
    //////////////////////////////////////////////////

    if(now - last >= 1000){

      const fps =
        Math.round(
          (frames * 1000) /
          (now - last)
        );

      //////////////////////////////////////////////////
      //  SAVE FPS
      //////////////////////////////////////////////////

      window.__FPS = fps;

      //////////////////////////////////////////////////
      //  UPDATE MODE
      //////////////////////////////////////////////////

      updateMode(fps);

      //////////////////////////////////////////////////
      //  UPDATE UI
      //////////////////////////////////////////////////

      updateBox(fps);

      //////////////////////////////////////////////////
      //  MODE CHANGED?
      //////////////////////////////////////////////////

      if(
        window.__LAST_MODE !==
        window.performanceMode
      ){

        console.log(
          " MODE:",
          window.__LAST_MODE,
          "",
          window.performanceMode
        );

        //////////////////////////////////////////////////
        //  SAVE LAST
        //////////////////////////////////////////////////

        window.__LAST_MODE =
          window.performanceMode;

        //////////////////////////////////////////////////
        //  APPLY ADAPTIVE
        //////////////////////////////////////////////////

        if(window.CURRENT_PAGE){

          window.applyAdaptive?.(
            window.CURRENT_PAGE
          );

        }

      }

      //////////////////////////////////////////////////
      //  RESET
      //////////////////////////////////////////////////

      frames = 0;

      last = now;

    }

    requestAnimationFrame(loop);

  }

  requestAnimationFrame(loop);

})();

//////////////////////////////////////////////////
//  ERROR LOGGER
//////////////////////////////////////////////////

window.addEventListener &&
window.addEventListener(
  "error",
  e => {

    console.log(
      " FPS ERROR:",
      e.filename,
      e.message
    );

  }
);