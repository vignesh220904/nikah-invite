# ⚜️ Royal Nikah Digital Wedding Invitation ⚜️
### *Aiza Haniya & Hamza Idris*

A bespoke, luxury Islamic digital wedding invitation web experience designed in an elegant **9:16 portrait aspect ratio** with cinematic curtain opening, rich emerald & gold Mughal aesthetics, interactive canvas scratch-to-reveal card, couple photo slider, and live countdown timer.

Built with **pure Vanilla HTML5, CSS3, and JavaScript** — zero external frameworks, zero bulky dependencies.

---

## 📸 Preview & Highlights

- **Ratio**: 9:16 Portrait (optimized for mobile smartphones and centered with dark velvet backdrop on tablets/desktops)
- **Design Language**: Islamic Royal Luxury & Mughal Heritage
- **Color Palette**: Royal Emerald (`#03261d`), Imperial Dark Green (`#061a14`), Antique Champagne Gold (`#e0b868`), Warm Rose Cream (`#fdfbf7`), Soft Blush (`#f6ebe6`)
- **Typography**: Playfair Display, Cormorant Garamond, Cinzel Decorative, and Amiri Arabic Calligraphy

---

## ✨ Features

### 1. 🎭 Cinematic Curtain Reveal
- Tap-to-open entrance displaying `intro-curtain.jpg.png` with a pulsing golden seal button.
- Smoothly plays the 9:16 high-definition `curtain-open.mp4` parting animation (auto-seeking directly to the curtain parting sequence) before cross-fading gracefully into the wedding invitation.
- Palace audio atmosphere with procedural Web Audio API palace chime synthesizers and background audio control.

### 2. 📜 Authentic Islamic Elements
- Elegant **Bismillah Ar-Rahman Ar-Rahim** calligraphy in Arabic.
- Quranic verses from **Surah Ar-Rum (30:21)**: *"And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy."*
- Pure Quranic blessings & Dua for the union.

### 3. ✨ Interactive Canvas Scratch Card
- Real HTML5 Canvas overlay powered by `destination-out` composite blending.
- Scratching reveals the auspicious Nikah date: **Sunday, 18 October 2026**.
- Auto-completes at 50% scratched with golden celebratory confetti and sparkle particle bursts.

### 4. ⏳ Real-Time Countdown Timer
- Live countdown ticker tracking Days, Hours, Minutes, and Seconds until **October 18, 2026, 07:00 PM IST**.
- Updates every second with smooth flip/glow animation.

### 5. 🖼️ Couple Photo Showcase
- Smooth portrait photo slider featuring couple portraits (`couple-1.png` through `couple-4.png`).
- Auto-advances every 4.5 seconds with touch swipe support, manual prev/next navigation, and interactive indicator dots.

### 6. 📅 Wedding Itinerary & Timeline
- Step-by-step visual event schedule:
  - **06:30 PM**: Baraat Arrival & Welcome
  - **07:00 PM**: Holy Nikah Ceremony & Ijab-Qubool
  - **08:00 PM**: Royal Feast (Dawat-e-Walima)
  - **09:30 PM**: Rukhsati & Warm Blessings
- IntersectionObserver scroll reveal animations.

### 7. 📍 Venue & Map Navigation
- Highlighting **The Grand Ballroom, Hyatt Regency Chennai, Anna Salai, Teynampet**.
- One-click **Open Google Maps** button for direct GPS navigation.
- Add to Google Calendar / Apple Calendar integration button.

### 8. 👗 Royal Dress Code & Color Swatches
- Attire guidelines for guests: Modest Royal Attire & Traditional Elegance.
- Curated color swatches: Royal Emerald, Antique Gold, Champagne Cream, and Midnight Teal.

### 9. 💌 Instant WhatsApp RSVP
- Quick RSVP form allowing guests to confirm attendance and guest count.
- Generates a formatted WhatsApp invitation confirmation message ready to send with one click.

### 10. 🌸 Ambient Visual Effects
- Subtle floating golden particles and falling rose petals.
- Floating sound toggle button with interactive palace music synthesizer fallback.

---

## 📁 Project Structure

```
nikah-invite/
│
├── assets/
│   ├── couple-1.png          # Portrait photo 1
│   ├── couple-2.png          # Portrait photo 2
│   ├── couple-3.png          # Portrait photo 3
│   ├── couple-4.png          # Portrait photo 4
│   ├── curtain-open.mp4       # 9:16 Curtain opening video reveal
│   ├── floral-bottom.png      # Transparent footer floral garland
│   ├── floral-divider.png     # Ornate section separator
│   ├── floral-top.png         # Transparent header floral garland
│   ├── hero-bg.png            # Hero section palace backdrop
│   ├── intro-curtain.jpg.png  # Intro screen cover backdrop
│   ├── scratch-card.png       # Scratch card surface texture
│   └── venue.png              # Venue portrait photo (Hyatt Regency)
│
├── index.html                 # Semantic HTML5 invitation structure
├── style.css                  # Custom styling, 9:16 layout & animations
├── script.js                  # Audio, slider, scratch card, countdown logic
└── README.md                  # Project documentation
```

---

## 🚀 Getting Started & Local Preview

This project runs directly in any modern web browser without build tools or package managers.

### Option 1: VS Code Live Server (Recommended)
1. Open the folder in **Visual Studio Code**.
2. Install the **Live Server** extension by Ritwick Dey (if not already installed).
3. Right-click [`index.html`](file:///d:/portfolio/nikah-invite/index.html) and select **"Open with Live Server"**.

### Option 2: Python Built-in HTTP Server
Run from the project root:
```bash
# Python 3
python -m http.server 5500
```
Then navigate to `http://localhost:5500` in your web browser.

### Option 3: Node `serve`
```bash
npx serve .
```

---

## 🛠️ Customization Guide

1. **Bride & Groom Names**:
   Update the names and parentage in [`index.html`](file:///d:/portfolio/nikah-invite/index.html) inside `.hero-title` and `.couple-card`.

2. **Wedding Date & Time**:
   - Update the countdown target date in [`script.js`](file:///d:/portfolio/nikah-invite/script.js):
     ```javascript
     const weddingDate = new Date('October 18, 2026 19:00:00 GMT+0530').getTime();
     ```
   - Update the date badges and scratch card secret content in [`index.html`](file:///d:/portfolio/nikah-invite/index.html).

3. **RSVP WhatsApp Number**:
   - In [`script.js`](file:///d:/portfolio/nikah-invite/script.js), update the `phone` variable inside `initRSVP()` to your phone number:
     ```javascript
     const phone = '919876543210';
     ```

4. **Venue Information**:
   - Change venue text and Google Maps URL in [`index.html`](file:///d:/portfolio/nikah-invite/index.html) under `<section id="venue">`.

---

## 🌐 Browser Compatibility

- **Desktop**: Google Chrome, Mozilla Firefox, Microsoft Edge, Apple Safari.
- **Mobile**: Safari on iOS 14+, Chrome on Android 10+, Samsung Internet.
- Hardware-accelerated CSS animations (`transform`, `opacity`) for 60fps performance on mobile devices.

---

## 📜 License & Acknowledgments

Created with love for **Aiza Haniya & Hamza Idris**. All rights reserved.
For inquiries or customization requests, please contact through the repository.
