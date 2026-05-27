console.log("🔥 FUNCTIONS SYSTEM READY");

window.FUNCTIONS = {

  initProfile: async () => {
    console.log("⚡ initProfile trigger");

    if(window.initProfile){
      await window.initProfile();
    } else {
      console.error("❌ initProfile NOT FOUND");
    }
  },

  initReels: async () => {
    if(window.initReels){
      await window.initReels();
    }
  },

  initChat: async () => {
    if(window.initChat){
      await window.initChat();
    }
  },

  initNotifications: async () => {
    if(window.initNotifications){
      await window.initNotifications();
    }
  },

  initSearchPage: async () => {
    if(window.initSearchPage){
      await window.initSearchPage();
    }
  },

  initStories: async () => {
    if(window.initStories){
      await window.initStories();
    }
  },

  destroyReels: () => {
    if(window.destroyReels){
      window.destroyReels();
    }
  }

};
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
