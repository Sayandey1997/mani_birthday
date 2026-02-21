# 💖 Mani's Birthday Website — Setup & Deployment Guide

A tech-themed romantic birthday surprise built with React + Vite + Framer Motion.

---

## 🗂 Folder Structure

```
mani-birthday/
├── index.html                  ← Entry HTML
├── package.json                ← Dependencies
├── vite.config.js              ← Vite config
├── README.md                   ← This file
└── src/
    ├── main.jsx                ← React root
    ├── App.jsx                 ← Main app + phase logic
    ├── styles/
    │   └── global.css          ← All styles
    └── components/
        ├── StarField.jsx       ← Animated canvas stars
        ├── TerminalBoot.jsx    ← Terminal typing boot screen
        ├── TechHero.jsx        ← Space hero section
        ├── FloatingHearts.jsx  ← Floating heart particles
        ├── CuteSection.jsx     ← Cute cats + birthday cards
        ├── PhotoReveal.jsx     ← Photo with magical reveal
        ├── BirthdayMessage.jsx ← Poem + confetti
        └── MusicPlayer.jsx     ← Background music toggle
```

---

## 🚀 Run Locally

### Step 1 — Install Node.js
Download from https://nodejs.org (LTS version recommended)

### Step 2 — Open terminal in this folder
```bash
cd mani-birthday
```

### Step 3 — Install dependencies
```bash
npm install
```

### Step 4 — Start development server
```bash
npm run dev
```

Open http://localhost:5173 in your browser. 🎉

---

## 🖼 Add Mani's Photo

1. Put Mani's photo in the `public/` folder, e.g. `public/mani.jpg`
2. Open `src/components/PhotoReveal.jsx`
3. Change line 7:
   ```js
   // FROM:
   const PHOTO_URL = 'https://images.unsplash.com/...'
   // TO:
   const PHOTO_URL = '/mani.jpg'
   ```

---

## 🎵 Add Custom Music

1. Put your MP3 in `public/`, e.g. `public/love-song.mp3`
2. Open `src/components/MusicPlayer.jsx`
3. Change line 7:
   ```js
   // FROM:
   const MUSIC_URL = 'https://cdn.pixabay.com/...'
   // TO:
   const MUSIC_URL = '/love-song.mp3'
   ```

---

## ☁️ Deploy to Vercel (Free, 5 Minutes)

### Step 1 — Build the project
```bash
npm run build
```
This creates a `dist/` folder with the production files.

### Step 2 — Install Vercel CLI
```bash
npm install -g vercel
```

### Step 3 — Login to Vercel
```bash
vercel login
```
(Creates a free account if you don't have one)

### Step 4 — Deploy!
```bash
vercel
```
Answer the prompts:
- **Set up and deploy?** → Y
- **Which scope?** → Your account
- **Link to existing project?** → N
- **Project name?** → `mani-birthday` (or anything)
- **Directory?** → `./` (press Enter)
- **Build command?** → `npm run build`
- **Output directory?** → `dist`
- **Development command?** → `npm run dev`

Vercel will give you a URL like `https://mani-birthday.vercel.app` 🚀

### Step 5 — Custom domain (optional)
In the Vercel dashboard → Settings → Domains → Add your domain.

---

## 🔄 Update After Changes

After editing any file:
```bash
vercel --prod
```
Your site updates in ~30 seconds.

---

## 📱 Features

- ✅ Fully responsive (mobile + desktop)
- ✅ Terminal boot animation
- ✅ Space/galaxy background with shooting stars
- ✅ Typing code animation
- ✅ Floating hearts (tech + romantic)
- ✅ Cute cat cards with messages
- ✅ Magical photo reveal with glowing ring
- ✅ Birthday poem with confetti explosion
- ✅ Background music with play/pause toggle
- ✅ Smooth scroll animations (Framer Motion)
- ✅ Shimmer gradient text effects

---

Made with 💖 for Mani
