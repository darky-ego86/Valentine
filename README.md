# 💖 Valentine's Day Special Website 💖

A beautiful, romantic website with password protection, music player, photo memories, love notes, a heart-catching game, surprise animations, and countdown timer!

## ✨ Features

- 🔐 **Romantic Password Lock** - Beautiful animated lock screen
- 🎵 **Music Player** - Fixed player with play/pause, volume control, and custom music upload
- 📸 **Photo Memories** - Upload images with captions, stored in browser LocalStorage
- 💌 **Love Notes** - Pre-loaded romantic quotes + add your own custom notes
- 🎮 **Heart Catch Game** - Fun mini-game with score tracking
- 💝 **Surprise Animation** - Heart burst effect with romantic message
- 💕 **Floating Hearts** - Animated background hearts throughout

## 🚀 Quick Start

### Option 1: Simple (Double-click to open)
1. Extract all files to a folder
2. Double-click `index.html` to open in your browser
3. Enter password: **iloveyou** (change this in `script.js`)
4. Enjoy! 💖

### Option 2: Local Server (Recommended)
```bash
# If you have Python installed:
python -m http.server 8000

# Or with Node.js:
npx serve

# Then open: http://localhost:8000
```

## 🎨 Customization Guide

### 1️⃣ Change the Password
Edit `script.js`, line 6:
```javascript
password: 'iloveyou', // Change to your special password
```

### 2️⃣ Add Default Love Notes
Edit `script.js`, lines 5-11:
```javascript
defaultNotes: [
    "Your custom note here",
    "Another romantic message",
    // Add as many as you want!
]
```

### 3️⃣ Change Colors
Edit `style.css`, lines 6-12 (CSS Variables):
```css
--rose-petal: #ffc9d9;
--blush-pink: #ff9eb7;
--deep-rose: #ff6b9d;
/* Change these hex codes to your preferred colors */
```

### 4️⃣ Add Background Music
1. Add your music file to the `assets/` folder
2. Rename it to `romantic-music.mp3` (or update the path in `index.html`)
3. Or use the upload button in the music player to change songs on the fly!

## 📁 Project Structure

```
valentine-website/
│
├── index.html          # Main HTML file
├── style.css           # All styling and animations
├── script.js           # All functionality
├── README.md           # This file
│
└── assets/             # Place your music and initial images here
    └── romantic-music.mp3 (optional - add your own)
```

## 💾 Storage Information

All data is stored in **browser LocalStorage**:
- 📸 Uploaded memories (images + captions)
- 💌 Custom love notes
- 🏆 Game high score

**Important:** 
- Data persists only in the same browser
- Clearing browser data will erase memories
- No server or database needed!

## 🎮 How to Play the Game

1. Click "Start Game 💖"
2. Use **←** and **→** arrow keys to move the basket
3. Catch falling hearts to increase your score
4. Game lasts 30 seconds
5. Beat your high score!

## 🎵 Music Player Features

- ▶️ Play/Pause
- 🔊 Volume control
- 📁 Upload custom music (supports MP3, WAV, etc.)
- Music continues playing while navigating sections

## 📱 Responsive Design

Fully responsive and works on:
- 💻 Desktop
- 📱 Mobile phones
- 📱 Tablets

## 🌐 Browser Compatibility

Works on all modern browsers:
- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅

## 🎨 Design Features

- Soft pink/red romantic gradient backgrounds
- Elegant serif fonts (Playfair Display, Crimson Pro, Cormorant Garamond)
- Smooth animations and transitions
- Floating hearts background
- Hover effects on all interactive elements
- Beautiful lightbox for viewing photos

## 💡 Tips & Tricks

1. **Change fonts:** Replace Google Fonts links in `index.html`
2. **Add more sections:** Copy existing section structure in HTML
3. **Modify animations:** Edit keyframes in `style.css`
4. **Add more default memories:** Pre-load images in the assets folder and modify script
5. **Theme change:** Modify CSS variables for instant color scheme change

## 🐛 Troubleshooting

**Music won't play automatically?**
- Some browsers block autoplay. Just click the play button!

**Images too large?**
- Consider resizing images before upload for better performance

**Data disappeared?**
- Check if browser data was cleared
- Make sure you're using the same browser

## 🔒 Privacy & Security

- No data leaves your device
- No cookies, tracking, or analytics
- Password is stored in plain text in JavaScript (frontend only)
- For real security, add backend authentication

## 📝 License

Free to use and customize for personal romantic purposes! 💕

## 💝 Made With Love

Created with HTML5, CSS3, and vanilla JavaScript.
No frameworks, no dependencies, just pure love and code! ❤️

---

## 🎁 Bonus: Optional Enhancements

Want to add more? Try these ideas:

1. **Background Video:** Add romantic background video
2. **More Games:** Add quiz game or memory matching
3. **Slideshow:** Auto-playing memory slideshow
4. **Animations:** More canvas animations with hearts
5. **Voice Messages:** Use Web Audio API for voice notes
6. **Map:** Add "places we've been" with embedded map
7. **Timeline:** Interactive relationship timeline
8. **Guest Book:** Add messages from friends

## ❤️ Support

Having issues or want to share your version? 
Feel free to customize and make it your own!

**Enjoy your romantic website! 💕✨**
