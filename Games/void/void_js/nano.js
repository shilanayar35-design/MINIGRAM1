function openNano(file){

const viewer =
document.getElementById(
"nanoViewer"
);

document.getElementById(
"nanoFileName"
).innerText = file;

document.getElementById(
"nanoContent"
).innerText =
fileContents[file];

//////////////////////////////////////////////////
// 🌌 OPEN
//////////////////////////////////////////////////

viewer.classList.add(
"active"
);

}

//////////////////////////////////////////////////
// 🌌 EXIT
//////////////////////////////////////////////////

document.addEventListener(
"keydown",
e=>{

if(
e.ctrlKey &&
e.key==="x"
){

document
.getElementById(
"nanoViewer"
)
.classList
.remove(
"active"
);

}

}
);