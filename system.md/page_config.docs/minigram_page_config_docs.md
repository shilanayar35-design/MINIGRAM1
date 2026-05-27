# MINIGRAM PAGE CONFIG SYSTEM DOCS

## 1. Overview
The Page Config System in Minigram is a dynamic architecture that loads and manages page-specific configurations (HTML, CSS, JS, plugins, adaptive settings) at runtime.

It allows each page (like home, chat, profile) to be independently controlled, optimized, and updated without changing core engine code.

---

## 2. Core Idea

Instead of hardcoding page logic, Minigram uses:

- `registerPageConfig()` → registers page config
- `PAGE_CONFIG` → global storage
- `manifest.json` → maps page → config file number
- `ensurePageConfig()` → loads config dynamically
- `loadConfigFile()` → injects config JS file

---

## 3. Folder Structure Role

Each page config file exists like:

```
page_config/
 ├── 0001.js
 ├── 0002.js
 ├── manifest.json
```

Each file contains:

```js
registerPageConfig("home", { ... });
```

---

## 4. Flow (How It Works)

### Step 1: Boot starts
boot.js loads core engine and calls:

→ ensurePageConfig("home")

---

### Step 2: Manifest loads
config_loader.js fetches:

page_config/manifest.json

Example:
```json
{
  "home": "0001",
  "chat": "0002"
}
```

---

### Step 3: Config file loads
Then system loads:

page_config/0001.js

---

### Step 4: Registration
File executes:

```js
registerPageConfig("home", config);
```

Now stored in:
```js
window.PAGE_CONFIG.home
```

---

### Step 5: Usage
Page system uses config:

- HTML path
- CSS files
- JS modules
- post engine settings
- adaptive system
- scroll engine
- layout control

---

## 5. Example Config Structure

```js
registerPageConfig("home", {
  html: "home/home.html",

  css: ["home/home.css"],

  js: ["home/home.js"],

  post: {
    enabled: true,
    realtime: false,
    fallback: true,
    optimizer: true,
    preload: true
  },

  adaptive: "0001",

  init: "initHome",

  scroll: {
    enabled: true,
    config: "0001"
  },

  layout: {
    appbar: true,
    bottomNav: true
  }
});
```

---

## 6. Adaptive System Connection

Each page can use:

```js
adaptive: "0001"
```

This connects to:

window.ADAPTIVE["0001"]

It dynamically changes:
- CSS variables
- performance mode (low/mid/high)
- animations
- rendering speed

---

## 7. Benefits

### 🚀 Performance
- Lazy loading system
- Idle loading for heavy modules
- Adaptive rendering modes

### 🧠 Scalability
- Add new pages without touching core engine
- Modular architecture

### ⚡ Maintainability
- Each page is independent
- Easy debugging

### 🔥 Optimization
- Post optimizer
- Scroll engine virtual loading
- Image lazy loading

---

## 8. How to Add New Page

### Step 1: Create config file
page_config/0003.js

### Step 2: Add to manifest.json
```json
{
  "profile": "0003"
}
```

### Step 3: Register config
```js
registerPageConfig("profile", {...});
```

Done.

---

## 9. Best Practices

✔ Keep configs modular  
✔ Avoid heavy logic in config files  
✔ Use adaptive system for performance tuning  
✔ Keep manifest clean  
✔ Use lazy loading for JS/CSS  

---

## 10. Architecture Summary

Minigram uses:

- Boot Loader → loads core system
- Config Loader → loads page configs
- Page Config → defines page behavior
- Adaptive Engine → optimizes performance
- Scroll Engine → infinite feed control
- Post Engine → data + fallback system

---

## FINAL RESULT

This system turns Minigram into:

👉 A mini framework  
👉 A modular social engine  
👉 A dynamic UI runtime system  
