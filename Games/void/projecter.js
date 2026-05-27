const scripts = [

"void_js/core.js",

"void_js/audio.js",

"void_js/filesystem.js",

"void_js/ui.js",

"void_js/nano.js",

"void_js/keyboard.js",

"void_js/commands.js",

"void_js/secrets.js",

"void_js/boot.js"

];

function loadScripts(i=0){

if(i >= scripts.length)
return;

const script =
document.createElement("script");

script.src = scripts[i];

script.onload = ()=>{

loadScripts(i+1);

};

document.body.appendChild(script);

}

loadScripts();