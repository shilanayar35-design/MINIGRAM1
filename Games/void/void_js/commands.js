function runCommand(cmd){

//////////////////////////////////////////////////
// LS
//////////////////////////////////////////////////

if(cmd==="ls"){

const items =
filesystem[currentPath];

if(items){

items.forEach(item=>{

addLine(item);

});

}

return;

}

//////////////////////////////////////////////////
// PWD
//////////////////////////////////////////////////

if(cmd==="pwd"){

addLine(currentPath);

return;

}

//////////////////////////////////////////////////
// CD
//////////////////////////////////////////////////

if(cmd.startsWith("cd ")){

const folder =
cmd.replace("cd ","").trim();

if(folder===".."){

const parts =
currentPath.split("/");

parts.pop();

currentPath =
parts.join("/");

updatePrompt();

return;

}

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

//////////////////////////////////////////////////
// NANO
//////////////////////////////////////////////////

if(cmd.startsWith("nano ")){

const file =
cmd.replace("nano ","").trim();

if(fileContents[file]){

openNano(file);

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
// CLEAR
//////////////////////////////////////////////////

if(cmd==="clear"){

document
.querySelectorAll(".line")
.forEach(el=>el.remove());

return;

}

addLine(
"unknown command",
"error"
);

}

input.addEventListener(
"keydown",
e=>{

if(e.key==="Enter"){

const cmd =
input.value.trim();

if(!cmd) return;

addLine(
symbol.innerText + " " + cmd,
"command"
);

runCommand(cmd);

input.value="";

}

}
);