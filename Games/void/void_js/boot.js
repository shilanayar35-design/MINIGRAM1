// boot.js

updatePrompt();

input.addEventListener(

"keydown",

e=>{

if(e.key==="Enter"){

e.preventDefault();

const cmd =
input.value.trim();

if(!cmd) return;

playTone(
900,
0.05,
"square",
0.08
);

addLine(

document.querySelector(
".symbol"
).innerText +

" " +

cmd,

"command"

);

runCommand(cmd);

input.value = "";

}

}

);