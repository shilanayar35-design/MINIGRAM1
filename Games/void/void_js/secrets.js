// secrets.js

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
"WELCOME BACK"
);

playTone(
300,
0.4,
"triangle",
0.03
);

},3000);

}