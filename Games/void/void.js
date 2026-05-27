// //////////////////////////////////////////////////
// 🌌 VOID TERMINAL ENGINE
// //////////////////////////////////////////////////

let currentPath =
"/storage/emulated/0/MINIGRAM1";

const terminal =
document.querySelector(".terminal");

const input =
document.querySelector("input");

//////////////////////////////////////////////////
// 🌌 AUDIO
//////////////////////////////////////////////////

const audioCtx =
new (
window.AudioContext ||
window.webkitAudioContext
)();

document.addEventListener(
"click",
() => {

if(audioCtx.state==="suspended"){

audioCtx.resume();

}

},
{ once:true }
);

function playTone(

freq,
duration=0.03,
type="square",
volume=0.05

){

const osc =
audioCtx.createOscillator();

const gain =
audioCtx.createGain();

osc.type = type;

osc.frequency.setValueAtTime(
freq,
audioCtx.currentTime
);

osc.connect(gain);

gain.connect(
audioCtx.destination
);

gain.gain.setValueAtTime(
volume,
audioCtx.currentTime
);

gain.gain.exponentialRampToValueAtTime(
0.0001,
audioCtx.currentTime + duration
);

osc.start();

osc.stop(
audioCtx.currentTime + duration
);

}

const filesystem = {

"/storage/emulated/0/MINIGRAM1":[

"Games",
"reels",
"main_js",
"page_config",
"auth.js",
"adaptive.bundle.js",
"signal.archive"

],

"/storage/emulated/0/MINIGRAM1/Games":[

"flappy",
"void"

],

"/storage/emulated/0/MINIGRAM1/main_js":[

"boot.js",
"core.js",
"pageLoader.js"

]

};

//////////////////////////////////////////////////
// 🌌 ADD TERMINAL LINE
//////////////////////////////////////////////////

function addLine(

text,
type="normal"

){

const line =
document.createElement("div");

line.className = "line";

if(type==="command"){

line.innerHTML = `

<span style="
color:#00ff88;
">

${text}

</span>

`;

}

else if(type==="error"){

line.innerHTML = `

<span style="
color:#ff5555;
">

${text}

</span>

`;

}

else{

line.innerHTML = `

<span style="
color:#d8ffe8;
">

${text}

</span>

`;

}

terminal.insertBefore(

line,

document.querySelector(
".input-line"
)

);

scrollBottom();

}

const fileContents = {

"auth.js":`

AUTH SYSTEM
------------

token bridge active

0xAFFF0112

`,

"signal.archive":`

ARCHIVE FOUND
--------------

signal unstable

03:14 AM

below zero

`,

"boot.js":`

MINIGRAM BOOT ENGINE

observer disabled

`

};

//////////////////////////////////////////////////
// 🌌 SCROLL
//////////////////////////////////////////////////

function scrollBottom(){

terminal.scrollTop =
terminal.scrollHeight;

}

//////////////////////////////////////////////////
// 🌌 COMMANDS
//////////////////////////////////////////////////

function runCommand(cmd){

//////////////////////////////////////////////////
// 🌌 HELP
//////////////////////////////////////////////////

if(cmd==="help"){

addLine(
"Commands:",
"normal"
);

addLine(
"ls  cd  clear  open  exit",
"normal"
);

return;

}

//////////////////////////////////////////////////
// 🌌 LS
//////////////////////////////////////////////////

if(cmd==="ls"){

const items =
filesystem[currentPath];

if(items){

items.forEach(item=>{

addLine(item);

});

}

else{

addLine(
"directory empty",
"error"
);

}

return;

}

//////////////////////////////////////////////////
// 🌌 CD
//////////////////////////////////////////////////

if(cmd.startsWith("cd ")){

const folder =
cmd.replace("cd ","").trim();

//////////////////////////////////////////////////
// BACK
//////////////////////////////////////////////////

if(folder===".."){

const parts =
currentPath.split("/");

if(parts.length > 3){

parts.pop();

currentPath =
parts.join("/");

updatePrompt();

}

return;

}

//////////////////////////////////////////////////
// NEW PATH
//////////////////////////////////////////////////

const newPath =
currentPath + "/" + folder;

if(filesystem[newPath]){

currentPath =
newPath;

updatePrompt();

}

else{

addLine(
"directory not found",
"error"
);

}

return;

}

if(cmd==="pwd"){

addLine(currentPath);

return;

}

//////////////////////////////////////////////////
// 🌌 OPEN
//////////////////////////////////////////////////

if(cmd.startsWith("open ")){

const file =
cmd.replace("open ","").trim();

if(fileContents[file]){

document.body
.classList
.add("glitch");

setTimeout(()=>{

document.body
.classList
.remove("glitch");

},120);

addLine(" ");

fileContents[file]
.split("\n")
.forEach(line=>{

addLine(line);

});

playTone(
1400,
0.04,
"sawtooth"
);

addLine(" ");

}

else{

addLine(
"file not found",
"error"
);

}

return;

}

//////////////////////////////////////////////////
// 🌌 CLEAR
//////////////////////////////////////////////////

if(cmd==="clear"){

document
.querySelectorAll(".line")
.forEach(el=>el.remove());

fileViewer
.classList
.add("hidden");

return;

}

//////////////////////////////////////////////////
// 🌌 EXIT
//////////////////////////////////////////////////

if(cmd==="exit"){

fileViewer
.classList
.add("hidden");

addLine(
"signal disconnected",
"normal"
);

return;

}

//////////////////////////////////////////////////
// 🌌 UNKNOWN
//////////////////////////////////////////////////

addLine(
"unknown command",
"error"
);

}

//////////////////////////////////////////////////
// 🌌 INPUT ENGINE
//////////////////////////////////////////////////

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
"root@void:~$ " + cmd,
"command"
);

runCommand(cmd);

input.value = "";

}

}

);

//////////////////////////////////////////////////
// 🌌 SECRET MEMORY
//////////////////////////////////////////////////

let opens =

localStorage.getItem(
"void_opens"
);

if(!opens) opens = 0;

opens++;

localStorage.setItem(
"void_opens",
opens
);

if(opens > 3){

setTimeout(()=>{

addLine(
"WELCOME BACK",
"normal"
);

playTone(
300,
0.4,
"triangle",
0.03
);

},3000);

}

function updatePrompt(){

document.querySelector(
".symbol"
).innerText =

`root@void:${currentPath} $`;

}