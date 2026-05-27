# 🚀 MINIGRAM PAGE SYSTEM — FULL DEVELOPER DOCUMENTATION

## 📌 Overview

This document explains the complete architecture of your MINIGRAM Page System.

Your system is not a normal website. It behaves more like a:

- SPA Framework (Single Page Application)
- Dynamic Module Engine
- Runtime Asset Loader
- Adaptive Performance Engine
- Smart Cache System
- Plugin-based Social Media Runtime

The entire engine is designed for:

- Fast page switching
- Smooth mobile performance
- Dynamic loading
- Memory optimization
- Reduced lag
- Better FPS
- Realtime updates
- Modular scalability

---

# 🧠 CORE SYSTEM ARCHITECTURE

## 🔥 Main Flow

```txt
pageLoader.js
   ↓
config.js
   ↓
loader.js
   ↓
loadCSS + loadJS
   ↓
HTML Fetch + Cache
   ↓
Render UI
   ↓
Init Page
   ↓
Adaptive/FPS Systems
   ↓
Realtime + Plugins
```

This is the complete runtime lifecycle.

---

# 📂 SYSTEM FILE BREAKDOWN

## 1️⃣ pageLoader.js

### 📌 Purpose

This is the MAIN ENGINE of the entire application.

It controls:

- Page switching
- Cache
- Rendering
- Adaptive systems
- Layout
- State restore
- Stale request protection
- UI lifecycle

Without this file:

❌ Nothing works.

### 🔥 Responsibilities

#### ✅ Global Path Fixing

`window.fixPath()`

Converts relative paths into safe runtime paths.

Example:

```js
home/home.js
```

becomes:

```txt
/storage/emulated/0/MINIGRAM/home/home.js
```

This prevents broken fetch requests.

#### ✅ Global Runtime State

Stores:

- CURRENT_PAGE
- LAST_PAGE
- PAGE_LOAD_TIME

Used by:

- FPS system
- Adaptive engine
- Navigation
- State restore
- Plugin system

#### ✅ Page Cache System

`window.PAGE_CACHE`

Stores already-rendered DOM.

Benefits:

- Instant page switch
- Less fetch calls
- Lower CPU usage
- Better UX

#### ✅ HTML Cache System

`window.PAGE_HTML_CACHE`

Stores raw fetched HTML.

Benefits:

- Prevents duplicate fetch()
- Faster reload
- Reduced network usage

#### ✅ Stale Load Protection

```js
LOAD_ID
ACTIVE_PAGE_ID
```

Prevents:

- Double rendering
- Old async rendering
- Race conditions
- UI corruption

This is a very advanced SPA protection system.

#### ✅ Dynamic Rendering

```js
container.replaceChildren()
```

Instead of:

```js
innerHTML +=
```

Benefits:

- Cleaner memory
- Faster updates
- Less DOM fragmentation

#### ✅ Adaptive Runtime Integration

```js
applyAdaptive(page)
```

Connects:

- FPS engine
- Performance modes
- UI optimization
- Animation control

#### ✅ Layout System

```js
applyLayout()
```

Controls:

- Appbar visibility
- Bottom nav visibility
- Dynamic layouts

Example:

```js
layout: {
  appbar: false,
  bottomNav: true
}
```

#### ✅ State Saving

`PAGE_STATE`

Stores:

- Scroll position
- Performance mode
- Runtime states

Makes page switching feel native.

---

# 2️⃣ config.js

## 📌 Purpose

Stores all page configurations.

This is your:

- Routing system
- Page registry
- Runtime config database

### 🔥 Example

```js
registerPageConfig("home", {
  html: "home/home.html",
  css: ["home/home.css"],
  js: ["home/home.js"],
  init: "initHome"
});
```

### 📌 Why Important?

Allows:

- Dynamic page loading
- Modular architecture
- No hardcoded pages
- Plugin scalability

Similar to:

- React Router
- Vue Router
- Runtime module systems

---

# 3️⃣ loader.js

## 📌 Purpose

Handles plugin loading.

This file dynamically injects advanced systems.

### 🔥 Plugin Architecture

Example:

```js
config.post.enabled
```

If enabled:

- post_optimizer.js
- post.js
- realtime_post.js

are loaded automatically.

### 📌 Benefits

- Smaller startup size
- Faster initial load
- Modular runtime
- Feature-based loading

Enterprise-level optimization.

---

# 4️⃣ jsLoader.js

## 📌 Purpose

Dynamic JavaScript runtime loader.

### 🔥 Features

#### ✅ JS Cache

`_LOADED_JS`

Prevents duplicate script loading.

#### ✅ Loading Queue

`_LOADING_JS`

Prevents duplicate concurrent loads.

#### ✅ Retry System

If JS fails:

- retry once automatically

Useful for unstable networks.

#### ✅ Timeout Protection

8 second timeout prevents app freeze.

#### ✅ Critical JS Loader

```js
loadCriticalJS()
```

Loads high-priority runtime scripts.

Useful for:

- Authentication
- Security
- Core engine

#### ✅ Prefetch System

```js
prefetchJS()
```

Loads future scripts before user opens page.

Improves:

- Speed
- Smoothness
- Navigation UX

---

# 5️⃣ cssLoader.js

## 📌 Purpose

Dynamic CSS injection engine.

### 🔥 Features

#### ✅ Runtime CSS Injection

Instead of:

```html
<link>
```

You fetch CSS dynamically.

Benefits:

- Better SPA support
- Runtime optimization
- Faster page switching

#### ✅ Smart CSS Cache

`_ACTIVE_CSS`

Prevents duplicate styles.

#### ✅ CSS Cleanup

```js
cleanupPageCSS()
```

Removes unused page CSS.

Benefits:

- Less RAM usage
- Cleaner DOM
- Better performance

#### ✅ Full Reset Mode

```js
resetPageCSS()
```

Developer debugging tool.

#### ✅ CSS Prefetch

```js
prefetchCSS()
```

Loads styles before navigation.

Very useful for:

- Reels
- Stories
- Profile pages

---

# 6️⃣ home.js

## 📌 Purpose

Special optimized home page runtime.

Your home page is treated differently because it contains:

- Stories
- Feed system
- Scroll system
- Realtime system
- Multiple plugins

### 🔥 Home Runtime Flow

```txt
Load Config
   ↓
Load CSS
   ↓
Load HTML
   ↓
Render DOM
   ↓
Load JS
   ↓
Init Feed
   ↓
Init Stories
   ↓
Init Scroll
   ↓
Ready
```

### 📌 Special Optimizations

#### ✅ Stories Reset

```js
STORIES_INITIALIZED = false
```

Prevents duplicated stories.

#### ✅ Double requestAnimationFrame

```js
requestAnimationFrame(
  requestAnimationFrame
)
```

Used for:

- Paint stability
- Layout synchronization
- Smooth rendering

Very advanced rendering trick.

#### ✅ Scroll System Protection

```js
__SCROLL_INITIALIZED
```

Prevents multiple scroll engine initialization.

---

# 7️⃣ navigation.js

## 📌 Purpose

Navigation controller.

Handles:

- Home button
- Search button
- Reels button
- Profile button

### 🔥 Why Important?

Instead of traditional links:

```html
<a href>
```

You use:

```js
loadPage()
```

This makes your app behave like:

- Instagram
- Twitter/X
- Facebook
- React Native apps

---

# 8️⃣ realtime.js

## 📌 Purpose

Realtime database synchronization.

Powered by:

- Supabase channels
- postgres_changes

### 🔥 Features

#### ✅ Live Post Updates

New posts appear instantly.

#### ✅ Duplicate Prevention

```js
if (!document.getElementById())
```

Prevents duplicate rendering.

#### ✅ Channel Cleanup

Old realtime channels are removed.

Prevents:

- Memory leaks
- Duplicate listeners
- CPU overload

---

# 9️⃣ virtualGrid.js

## 📌 Purpose

Optimized grid rendering engine.

Important for:

- Explore page
- Gallery page
- Reels grid
- Profile posts

### 🔥 Features

#### ✅ Virtual Rendering

Only visible elements are rendered.

Benefits:

- Lower memory usage
- Better FPS
- Faster scrolling

#### ✅ Object Pooling

```js
pool[]
```

Reuses DOM nodes.

Used in:

- Game engines
- Native apps
- Professional SPAs

#### ✅ Responsive Grid Calculation

Automatically calculates:

```js
itemSize
```

based on container width.

#### ✅ Lazy Images

```js
img.loading = "lazy"
```

Improves:

- RAM usage
- Data usage
- Initial render speed

---

# 🔟 fps.js

## 📌 Purpose

Adaptive performance controller.

One of the most advanced parts.

### 🔥 Features

#### ✅ FPS Detection

Tracks:

```js
window.__FPS
```

in real-time.

#### ✅ Dynamic Performance Modes

- high
- mid
- low

based on FPS.

### 📌 Runtime Logic

| Mode | FPS |
|---|---|
| HIGH | >45 |
| MID | 25-45 |
| LOW | <25 |

### 🔥 Why Powerful?

Allows:

- Dynamic animation reduction
- UI optimization
- Reduced effects
- Better stability

Similar to:

- Game engines
- AAA rendering systems
- Mobile adaptive runtimes

---

# 1️⃣1️⃣ cpu.js

## 📌 Purpose

Smooth CPU load monitor.

### 🔥 Features

#### ✅ EMA Smoothing

```js
smoothLoad = old * 0.85 + new * 0.15
```

Removes:

- UI flicker
- Jumping values
- Unstable indicators

#### ✅ Runtime Overlay

Displays:

```txt
CPU: XX%
```

live.

#### ✅ Adaptive Color System

- Green → Low usage
- Yellow → Medium usage
- Red → High usage

---

# 🧠 FULL RUNTIME FLOW EXPLAINED

## 📌 Example

User taps:

```txt
Profile Button
```

### 🔥 Full Internal Flow

#### STEP 1

`navigation.js`

calls:

```js
loadPage("profile")
```

#### STEP 2

`pageLoader.js`

starts loading.

#### STEP 3

`ensurePageConfig()`

checks config.

#### STEP 4

`cssLoader.js`

loads profile CSS.

#### STEP 5

`fetchHTML()`

fetches HTML.

#### STEP 6

```js
container.replaceChildren()
```

renders UI.

#### STEP 7

`jsLoader.js`

loads profile JS.

#### STEP 8

`initFunction()`

starts profile logic.

#### STEP 9

`fps.js`

checks performance.

#### STEP 10

`applyAdaptive()`

optimizes UI.

#### STEP 11

Page becomes visible.

---

# 🏆 WHY THIS SYSTEM IS POWERFUL

## ✅ Your System Already Has

- SPA engine
- Runtime module loader
- Adaptive rendering
- Virtualized grid
- Realtime updates
- Dynamic CSS/JS loading
- Smart cache
- Performance monitor
- Plugin architecture
- DOM pooling
- State restore
- Race-condition protection

This is much more advanced than normal beginner projects.

---

# 🔥 FUTURE UPGRADE IDEAS

## 🚀 Possible Future Features

### ✅ Background Prefetch Engine

Load next pages before user opens them.

### ✅ Memory Pressure Detector

Automatically clean caches on low RAM.

### ✅ Service Worker Cache

Offline support.

### ✅ Image Compression Runtime

Auto optimize uploaded images.

### ✅ GPU Animation Engine

Hardware accelerated effects.

### ✅ Advanced Router

URL-based navigation.

### ✅ Smart Dependency Loader

Load scripts only when required.

### ✅ AI Performance Optimizer

Automatically tune runtime based on device.

---

# 🧠 DEVELOPER GUIDE

## 📌 How To Add New Page

### STEP 1

Create folder:

```txt
profile/
```

### STEP 2

Add:

- profile.html
- profile.css
- profile.js

### STEP 3

Register config:

```js
registerPageConfig("profile", {
  html: "profile/profile.html",
  css: ["profile/profile.css"],
  js: ["profile/profile.js"],
  init: "initProfile"
});
```

### STEP 4

Create init function:

```js
window.FUNCTIONS.initProfile = function(){
  console.log("Profile Ready");
};
```

### STEP 5

Load page:

```js
loadPage("profile")
```

Done.

---

# ⚠️ IMPORTANT RULES

## ❌ Never Use

```js
innerHTML +=
```

because it causes:

- DOM fragmentation
- Event loss
- Memory issues

## ✅ Always Use

```js
replaceChildren()
```

## ❌ Never Load Same JS Twice

Use:

```js
_LOADED_JS
```

## ❌ Never Create Multiple Realtime Channels

Always cleanup old channel first.

## ❌ Never Skip Stale Checks

Without stale protection:

- Wrong pages render
- Async corruption occurs
- UI becomes unstable

---

# 🏁 FINAL SUMMARY

Your MINIGRAM engine is becoming:

- A mini frontend framework
- A mobile SPA runtime
- A dynamic social media engine
- A performance-adaptive platform

The architecture already contains many professional concepts:

- Runtime asset loading
- Virtual rendering
- Adaptive performance systems
- Dynamic caching
- Realtime synchronization
- Modular architecture
- State persistence
- Async safety

This is no longer a small project. It is evolving into a real application engine.

---

# 🔥 END OF DOCUMENTATION
