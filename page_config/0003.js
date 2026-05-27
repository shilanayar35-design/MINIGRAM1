registerPageConfig("profile", {

  //////////////////////////////////////////////////
  //  HTML
  //////////////////////////////////////////////////

  html: "profile/profile.html",

  //////////////////////////////////////////////////
  //  CSS
  //////////////////////////////////////////////////

  css: [

    //  CORE
    "profile/profile_css/base.css",
    "profile/profile_css/appbar.css",

    //  LAYOUT
    "profile/profile_css/profile-layout.css",

    //  HEADER
    "profile/profile_css/profile-header.css",

    //  ACTIONS
    "profile/profile_css/actions.css",

    //  TABS
    "profile/profile_css/tabs.css",

    //  POSTS
    "profile/profile_css/posts.css",

    //  ANIMATIONS
    "profile/profile_css/animations.css"

  ],

  //////////////////////////////////////////////////
  //  JS
  //////////////////////////////////////////////////

  js: [

    "profile/profile.js"

  ],

  //////////////////////////////////////////////////
  //  INIT FUNCTION
  //////////////////////////////////////////////////

  init: "initProfile",

  //////////////////////////////////////////////////
  //  LAYOUT CONTROL
  //////////////////////////////////////////////////

  layout: {

    appbar: false,
    bottomNav: true

  }

});

//////////////////////////////////////////////////
//  GLOBAL ERROR LOGGER
//////////////////////////////////////////////////

window.addEventListener?.("error", e => {

  console.log(
    " ERROR IN FILE:",
    e.filename,
    e.message
  );

});