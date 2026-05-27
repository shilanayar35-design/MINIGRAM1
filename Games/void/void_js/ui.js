function addLine(

text,
type="normal"

){

const line =
document.createElement("div");

line.className =
"line";

line.innerText =
text;

terminal.insertBefore(
line,
document.querySelector(
".input-line"
)
);

scrollBottom();

}

function scrollBottom(){

terminal.scrollTop =
terminal.scrollHeight;

}

function updatePrompt(){

const shortPath =
currentPath.replace(
"/storage/emulated/0/MINIGRAM1",
"~"
);

symbol.innerText =
`root@void:${shortPath} $`;

}