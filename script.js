/**
 * ROYAL NIKAH INVITATION - MASTER JAVASCRIPT
 * Aiza Haniya & Hamza Idris
 * Modular Vanilla Implementation with Cinematic Video & Royal Ambient Audio
 */

document.addEventListener('DOMContentLoaded', () => {
  initIntro();
  initMusic();
  initScratchCard();
  initGallery();
  initCountdown();
  initScrollAnimations();
  initTimeline();
  initMaps();
  initPetals();
});

/* ===================================================
   STATE MANAGEMENT
   =================================================== */
const state = {
  isOpened: false,
  isMusicPlaying: false,
  isAudioFileAvailable: false,
  audioContext: null,
  synthInterval: null,
  isScratchCompleted: false,
  currentSlide: 0,
  totalSlides: 4,
  touchStartX: 0,
  touchEndX: 0,
  isDragging: false
};

/* ===================================================
   1. INTRO CONTROLLER & VIDEO REVEAL (initIntro, openInvitation)
   =================================================== */
function initIntro() {
  const openBtn = document.getElementById('openInviteBtn');
  const curtainVideo = document.getElementById('curtainVideo');

  if (!openBtn) return;

  // Pre-warm the video so it starts instantly on tap
  if (curtainVideo) {
    curtainVideo.load();
  }

  openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (state.isOpened) return;
    openInvitation();
  });
}

function openInvitation() {
  state.isOpened = true;
  const intro = document.getElementById('intro');
  const videoLayer = document.getElementById('curtainVideoLayer');
  const curtainVideo = document.getElementById('curtainVideo');
  const musicToggle = document.getElementById('musicToggle');

  // Activate and play curtain video
  if (videoLayer && curtainVideo) {
    videoLayer.classList.add('playing');
    curtainVideo.currentTime = 0;
    
    const playPromise = curtainVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Video autoplay notice:', err);
      });
    }

    // When the curtain opening reaches its glorious reveal (around 3.8s)
    let hasCrossfaded = false;
    const triggerTransition = () => {
      if (hasCrossfaded) return;
      hasCrossfaded = true;

      if (intro) {
        intro.classList.add('fade-out');
      }

      if (musicToggle) {
        musicToggle.classList.add('visible');
      }

      // Staggered cascade of Hero elements
      triggerHeroCascade();

      setTimeout(() => {
        if (intro) intro.style.display = 'none';
        if (curtainVideo) curtainVideo.pause();
      }, 1500);
    };

    // Transition after 3.8s when curtains are fully parted in the video
    setTimeout(triggerTransition, 3800);

    // Fallback if video ends earlier
    curtainVideo.addEventListener('ended', triggerTransition);
  } else {
    // Graceful fallback if video element is absent
    if (intro) intro.classList.add('fade-out');
    if (musicToggle) musicToggle.classList.add('visible');
    triggerHeroCascade();
    setTimeout(() => {
      if (intro) intro.style.display = 'none';
    }, 1200);
  }

  // Start royal music
  startRoyalMusic();
}

function triggerHeroCascade() {
  const heroItems = document.querySelectorAll('#hero .reveal-item');
  heroItems.forEach((item) => {
    const delay = parseInt(item.getAttribute('data-delay') || '0', 10);
    setTimeout(() => {
      item.classList.add('visible');
    }, delay);
  });
}

/* ===================================================
   2. ROYAL AUDIO SYSTEM (initMusic, toggleMusic)
   Plays MP3 if present, or synthesizes royal palace ambient chords via Web Audio API!
   =================================================== */
function initMusic() {
  const audio = document.getElementById('backgroundMusic');
  const toggleBtn = document.getElementById('musicToggle');

  if (!toggleBtn) return;

  if (audio) {
    audio.addEventListener('canplaythrough', () => {
      state.isAudioFileAvailable = true;
    });
    audio.addEventListener('error', () => {
      state.isAudioFileAvailable = false;
    });
  }

  toggleBtn.addEventListener('click', () => {
    toggleMusic();
  });
}

function startRoyalMusic() {
  const audio = document.getElementById('backgroundMusic');
  const toggleBtn = document.getElementById('musicToggle');
  const musicIcon = document.getElementById('musicIcon');

  if (state.isAudioFileAvailable && audio) {
    audio.play().then(() => {
      state.isMusicPlaying = true;
      if (toggleBtn) toggleBtn.classList.add('playing');
      if (musicIcon) musicIcon.textContent = '♪';
    }).catch(() => {
      playSynthChimeChord();
    });
  } else {
    // Synthesize enchanting ambient royal acoustic chimes via Web Audio API
    playSynthChimeChord();
  }
}

function toggleMusic() {
  const audio = document.getElementById('backgroundMusic');
  const toggleBtn = document.getElementById('musicToggle');
  const musicIcon = document.getElementById('musicIcon');

  if (state.isMusicPlaying) {
    // Pause
    state.isMusicPlaying = false;
    if (toggleBtn) toggleBtn.classList.remove('playing');
    if (musicIcon) musicIcon.textContent = 'Ⅱ';

    if (state.isAudioFileAvailable && audio) {
      audio.pause();
    }
    if (state.synthInterval) {
      clearInterval(state.synthInterval);
      state.synthInterval = null;
    }
  } else {
    // Play
    state.isMusicPlaying = true;
    if (toggleBtn) toggleBtn.classList.add('playing');
    if (musicIcon) musicIcon.textContent = '♪';

    if (state.isAudioFileAvailable && audio) {
      audio.play().catch(() => {});
    } else {
      playSynthChimeChord();
    }
  }
}

/**
 * Royal palace acoustic chime synthesizer (Web Audio API)
 * Plays soothing pentatonic sitar/harp intervals in D major: D, F#, A, B, C#
 */
function playSynthChimeChord() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    if (!state.audioContext) {
      state.audioContext = new AudioCtx();
    }
    if (state.audioContext.state === 'suspended') {
      state.audioContext.resume();
    }

    const notes = [293.66, 369.99, 440.00, 493.88, 587.33, 739.99]; // D4, F#4, A4, B4, D5, F#5
    let noteIdx = 0;

    const playSingleNote = (freq, delayTime = 0) => {
      setTimeout(() => {
        if (!state.isMusicPlaying || !state.audioContext) return;
        const ctx = state.audioContext;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 3.0);
      }, delayTime);
    };

    // Initial arpeggio
    notes.forEach((freq, idx) => {
      playSingleNote(freq, idx * 300);
    });

    state.isMusicPlaying = true;
    const toggleBtn = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');
    if (toggleBtn) toggleBtn.classList.add('playing');
    if (musicIcon) musicIcon.textContent = '♪';

    // Repeating gentle chime phrase
    if (state.synthInterval) clearInterval(state.synthInterval);
    state.synthInterval = setInterval(() => {
      if (!state.isMusicPlaying) return;
      const f1 = notes[Math.floor(Math.random() * notes.length)];
      const f2 = notes[Math.floor(Math.random() * notes.length)];
      playSingleNote(f1, 0);
      playSingleNote(f2, 400);
    }, 4000);

  } catch (e) {
    console.warn('Synth notice:', e);
  }
}

/* ===================================================
   3. SCRATCH CARD (initScratchCard)
   Real HTML5 Canvas Scratch Mechanics
   =================================================== */
function initScratchCard() {
  const canvas = document.getElementById('scratchCanvas');
  const stage = document.querySelector('.scratch-stage');
  if (!canvas || !stage) return;

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) {
    canvas.style.display = 'none';
    return;
  }

  let isDrawing = false;
  let lastPoint = null;
  let checkThrottle = null;

  function resizeCanvas() {
    const rect = stage.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    drawGoldSurface(rect.width, rect.height);
  }

  function drawGoldSurface(w, h) {
    // Radiant metallic gold foil gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#B8860B');
    grad.addColorStop(0.2, '#E5C158');
    grad.addColorStop(0.4, '#FFF1A8');
    grad.addColorStop(0.6, '#AA7A1E');
    grad.addColorStop(0.8, '#F3D573');
    grad.addColorStop(1, '#8B6508');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Fine brushed gold shimmer lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
    ctx.lineWidth = 1;
    for (let y = 0; y < h; y += 5) {
      ctx.beginPath();
      ctx.moveTo(0, y + (Math.random() * 3 - 1.5));
      ctx.lineTo(w, y + (Math.random() * 3 - 1.5));
      ctx.stroke();
    }

    // Filigree inner frame
    ctx.strokeStyle = 'rgba(255, 245, 210, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(14, 14, w - 28, h - 28);

    // Scratch message
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.font = 'bold 13px Cinzel, serif';
    ctx.fillStyle = '#4A0812';
    ctx.fillText('✦ SCRATCH TO REVEAL ✦', w / 2, h / 2 - 12);

    ctx.font = 'italic 16px Cormorant Garamond, serif';
    ctx.fillStyle = '#2B040A';
    ctx.fillText('Our Auspicious Nikah Date', w / 2, h / 2 + 14);
  }

  function getCoords(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  function scratch(x, y) {
    if (state.isScratchCompleted) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 42;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    if (lastPoint) {
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(x, y);
    } else {
      ctx.arc(x, y, 21, 0, Math.PI * 2);
    }
    ctx.stroke();

    lastPoint = { x, y };
    spawnScratchSparkle(x, y);

    if (!checkThrottle) {
      checkThrottle = setTimeout(() => {
        checkPercentage();
        checkThrottle = null;
      }, 120);
    }
  }

  function checkPercentage() {
    if (state.isScratchCompleted) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const sw = Math.floor(rect.width * dpr);
    const sh = Math.floor(rect.height * dpr);

    const imgData = ctx.getImageData(0, 0, sw, sh);
    const pix = imgData.data;
    const total = sw * sh;
    let transparent = 0;

    const step = 16;
    for (let i = 3; i < pix.length; i += step * 4) {
      if (pix[i] < 128) {
        transparent++;
      }
    }

    const pct = (transparent / (total / step)) * 100;
    if (pct >= 50) {
      finishScratch();
    }
  }

  function finishScratch() {
    if (state.isScratchCompleted) return;
    state.isScratchCompleted = true;

    canvas.classList.add('fade-revealed');
    burstSparkles();

    setTimeout(() => {
      canvas.style.display = 'none';
    }, 850);
  }

  function spawnScratchSparkle(x, y) {
    const overlay = document.getElementById('sparklesOverlay');
    if (!overlay) return;

    const sp = document.createElement('div');
    sp.className = 'sparkle-burst';
    sp.style.left = `${x + (Math.random() * 18 - 9)}px`;
    sp.style.top = `${y + (Math.random() * 18 - 9)}px`;
    overlay.appendChild(sp);

    setTimeout(() => sp.remove(), 850);
  }

  function burstSparkles() {
    const overlay = document.getElementById('sparklesOverlay');
    if (!overlay) return;

    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const x = Math.random() * canvas.offsetWidth;
        const y = Math.random() * canvas.offsetHeight;
        spawnScratchSparkle(x, y);
      }, i * 25);
    }
  }

  // Mouse Listeners
  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    const p = getCoords(e);
    lastPoint = p;
    scratch(p.x, p.y);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    const p = getCoords(e);
    scratch(p.x, p.y);
  });

  window.addEventListener('mouseup', () => {
    isDrawing = false;
    lastPoint = null;
  });

  // Touch Listeners (prevent page scrolling during active scratch)
  canvas.addEventListener('touchstart', (e) => {
    isDrawing = true;
    const p = getCoords(e);
    lastPoint = p;
    scratch(p.x, p.y);
    if (e.cancelable) e.preventDefault();
  }, { passive: false });

  canvas.addEventListener('touchmove', (e) => {
    if (!isDrawing) return;
    const p = getCoords(e);
    scratch(p.x, p.y);
    if (e.cancelable) e.preventDefault();
  }, { passive: false });

  canvas.addEventListener('touchend', () => {
    isDrawing = false;
    lastPoint = null;
  });

  // Initial draw
  setTimeout(resizeCanvas, 80);
  window.addEventListener('resize', () => {
    if (!state.isScratchCompleted) resizeCanvas();
  });
}

/* ===================================================
   4. PHOTO SLIDER / CAROUSEL (initGallery, initSwipe)
   =================================================== */
function initGallery() {
  const track = document.getElementById('sliderTrack');
  const prevBtn = document.getElementById('sliderPrevBtn');
  const nextBtn = document.getElementById('sliderNextBtn');
  const dots = document.querySelectorAll('#sliderDots .slider-dot');

  if (!track) return;

  function updateSlide(idx) {
    if (idx < 0) idx = state.totalSlides - 1;
    if (idx >= state.totalSlides) idx = 0;

    state.currentSlide = idx;
    track.style.transform = `translateX(-${state.currentSlide * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === state.currentSlide);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => updateSlide(state.currentSlide - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => updateSlide(state.currentSlide + 1));
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index') || '0', 10);
      updateSlide(idx);
    });
  });

  initSwipe(updateSlide);
}

function initSwipe(updateSlideCallback) {
  const viewport = document.getElementById('sliderViewport');
  if (!viewport) return;

  viewport.addEventListener('touchstart', (e) => {
    state.touchStartX = e.touches[0].clientX;
  }, { passive: true });

  viewport.addEventListener('touchend', (e) => {
    state.touchEndX = e.changedTouches[0].clientX;
    handleGesture(updateSlideCallback);
  }, { passive: true });

  viewport.addEventListener('mousedown', (e) => {
    state.isDragging = true;
    state.touchStartX = e.clientX;
  });

  window.addEventListener('mouseup', (e) => {
    if (!state.isDragging) return;
    state.isDragging = false;
    state.touchEndX = e.clientX;
    handleGesture(updateSlideCallback);
  });

  function handleGesture(cb) {
    const diff = state.touchEndX - state.touchStartX;
    if (Math.abs(diff) > 35) {
      if (diff < 0) {
        cb(state.currentSlide + 1);
      } else {
        cb(state.currentSlide - 1);
      }
    }
  }
}

/* ===================================================
   5. COUNTDOWN TIMER (initCountdown)
   Target: October 18, 2026, 07:00 PM IST (UTC+05:30)
   =================================================== */
function initCountdown() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const finishedEl = document.getElementById('countdownFinished');
  const gridEl = document.getElementById('countdownGrid');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const target = new Date('2026-10-18T19:00:00+05:30').getTime();

  function update() {
    const now = Date.now();
    const distance = target - now;

    if (distance <= 0) {
      if (gridEl) gridEl.style.display = 'none';
      if (finishedEl) finishedEl.style.display = 'block';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ===================================================
   6. SCROLL ANIMATIONS (initScrollAnimations)
   =================================================== */
function initScrollAnimations() {
  const revealItems = document.querySelectorAll('.reveal-item:not(#hero .reveal-item)');
  if (!('IntersectionObserver' in window)) {
    revealItems.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -30px 0px'
  });

  revealItems.forEach((el) => observer.observe(el));
}

/* ===================================================
   7. TIMELINE ANIMATIONS (initTimeline)
   =================================================== */
function initTimeline() {
  const timelineEntries = document.querySelectorAll('.reveal-timeline');
  if (!('IntersectionObserver' in window)) {
    timelineEntries.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  timelineEntries.forEach((el) => observer.observe(el));
}

/* ===================================================
   8. GOOGLE MAPS CONTROLLER (initMaps)
   =================================================== */
function initMaps() {
  const mapLinks = document.querySelectorAll('a[href*="google.com/maps"]');
  mapLinks.forEach((link) => {
    link.setAttribute('rel', 'noopener noreferrer');
    link.setAttribute('target', '_blank');
  });
}

/* ===================================================
   9. ROSE PETAL EFFECT (initPetals)
   =================================================== */
function initPetals() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const container = document.getElementById('petalsContainer');
  if (!container) return;

  const PETAL_COUNT = 14;

  for (let i = 0; i < PETAL_COUNT; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';

    const randLeft = Math.random() * 100;
    const randDuration = 8 + Math.random() * 8;
    const randDelay = Math.random() * 9;
    const randScale = 0.65 + Math.random() * 0.45;

    petal.style.left = `${randLeft}%`;
    petal.style.animationDuration = `${randDuration}s`;
    petal.style.animationDelay = `${randDelay}s`;
    petal.style.transform = `scale(${randScale})`;

    container.appendChild(petal);

    petal.addEventListener('animationiteration', () => {
      petal.style.left = `${Math.random() * 100}%`;
    });
  }
}
