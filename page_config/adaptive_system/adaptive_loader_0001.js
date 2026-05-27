window.ADAPTIVE =
window.ADAPTIVE || {};

window.ADAPTIVE["0001"] = {

  //////////////////////////////////////////////////
  // 🎨 HOME CSS
  //////////////////////////////////////////////////

  "home/home.css": {

    //////////////////////////////////////////////////
    // 🔻 LOW
    //////////////////////////////////////////////////

    low: {

      "nav-blur": 0,
      "avatar-shadow": 0,
      "hover-opacity": 0,
      "anim-speed": 0.05

    },

    //////////////////////////////////////////////////
    // ⚖️ MID
    //////////////////////////////////////////////////

    mid: {

      "nav-blur": 8,
      "avatar-shadow": 0.12,
      "hover-opacity": 0.08,
      "anim-speed": 0.2

    },

    //////////////////////////////////////////////////
    // 🚀 HIGH
    //////////////////////////////////////////////////

    high: {

      "nav-blur": 30,
      "avatar-shadow": 0.5,
      "hover-opacity": 0.3,
      "anim-speed": 1

    }

  },

  //////////////////////////////////////////////////
  // ⚡ HOME JS
  //////////////////////////////////////////////////

  "home/home.js": {

    //////////////////////////////////////////////////
    // 🔻 LOW
    //////////////////////////////////////////////////

    low: {

      maxPosts: 2,
      imageQuality: 0.3,
      animations: false,
      shadows: false,
      preloadImages: false,
      commentsEnabled: false,
      avatarQuality: 40,
      lazyLoadDistance: 0,
      useTransitions: false

    },

    //////////////////////////////////////////////////
    // ⚖️ MID
    //////////////////////////////////////////////////

    mid: {

      maxPosts: 4,
      imageQuality: 0.7,
      animations: true,
      shadows: true,
      preloadImages: false,
      commentsEnabled: true,
      avatarQuality: 80,
      lazyLoadDistance: 200,
      useTransitions: true

    },

    //////////////////////////////////////////////////
    // 🚀 HIGH
    //////////////////////////////////////////////////

    high: {

      maxPosts: 8,
      imageQuality: 1,
      animations: true,
      shadows: true,
      preloadImages: true,
      commentsEnabled: true,
      avatarQuality: 150,
      lazyLoadDistance: 1000,
      useTransitions: true

    }

  }

};