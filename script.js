// ===========================
// Configuration
// ===========================
const CONFIG = {
    password: 'iloveyou', // Change this to your special password
    defaultNotes: [
        "You are my today and all my tomorrows.",
        "Every love story is beautiful, but ours is my favorite.",
        "Forever isn't long enough with you.",
        "In you, I've found the love of my life and my closest, truest friend.",
        "You make every moment magical ✨"
    ],
    // PRE-LOAD IMAGES: Add your image paths here (optional)
    // If you want images to appear automatically, uncomment and edit these:
    preloadImages: [
        // { image: 'assets/photo1.jpg', caption: 'Our first date 💕' },
        // { image: 'assets/photo2.jpg', caption: 'Best day ever! 🌟' },
        // { image: 'assets/photo3.png', caption: 'Forever together ❤️' },
    ]
};

// ===========================
// Floating Hearts Background
// ===========================
function createFloatingHearts() {
    const heartsContainer = document.getElementById('heartsBackground');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💝', '💘'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 13000);
    }, 800);
}

// ===========================
// Password Lock System
// ===========================
function checkPassword() {
    const input = document.getElementById('passwordInput');
    const message = document.getElementById('lockMessage');
    const lockScreen = document.getElementById('lockScreen');
    const mainContent = document.getElementById('mainContent');
    
    if (input.value === CONFIG.password) {
        message.textContent = '✨ Unlocking our memories... ✨';
        message.style.color = '#fff';
        
        setTimeout(() => {
            lockScreen.classList.add('unlocked');
            mainContent.classList.add('unlocked');
            mainContent.style.display = 'block';
            initializeApp();
        }, 1000);
    } else {
        message.textContent = "Oops! That's not our special memory 💕 Try again.";
        message.style.color = '#ffcccc';
        input.value = '';
        input.style.animation = 'shake 0.5s';
        setTimeout(() => {
            input.style.animation = '';
        }, 500);
    }
}

// Allow Enter key to submit password
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }
});

// ===========================
// App Initialization
// ===========================
function initializeApp() {
    loadMemories();
    loadLoveNotes();
    initMusicPlayer();
    loadHighScore();
}

// ===========================
// Music Player
// ===========================
let isPlaying = false;
const audioPlayer = document.getElementById('audioPlayer');

function initMusicPlayer() {
    const volumeSlider = document.getElementById('volumeSlider');
    const musicUpload = document.getElementById('musicUpload');
    
    // Set initial volume
    audioPlayer.volume = volumeSlider.value / 100;
    
    // Volume control
    volumeSlider.addEventListener('input', (e) => {
        audioPlayer.volume = e.target.value / 100;
    });
    
    // Custom music upload
    musicUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            audioPlayer.src = url;
            if (isPlaying) {
                audioPlayer.play();
            }
        }
    });
    
    // Auto-play after unlock (some browsers may block this)
    setTimeout(() => {
        audioPlayer.play().then(() => {
            isPlaying = true;
            updateMusicButton();
        }).catch(() => {
            // Autoplay was blocked, user needs to click play
            console.log('Autoplay blocked. Click play to start music.');
        });
    }, 500);
}

function toggleMusic() {
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');
    
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
    } else {
        audioPlayer.play();
        isPlaying = true;
    }
    
    updateMusicButton();
}

function updateMusicButton() {
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');
    
    if (isPlaying) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline';
    } else {
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
    }
}

// ===========================
// Memories Section
// ===========================
function loadMemories() {
    let memories = JSON.parse(localStorage.getItem('memories')) || [];
    
    // Load pre-configured images on first visit (if any)
    if (memories.length === 0 && CONFIG.preloadImages && CONFIG.preloadImages.length > 0) {
        memories = CONFIG.preloadImages;
        localStorage.setItem('memories', JSON.stringify(memories));
    }
    
    const memoriesGrid = document.getElementById('memoriesGrid');
    memoriesGrid.innerHTML = '';
    
    memories.forEach((memory, index) => {
        const card = createMemoryCard(memory, index);
        memoriesGrid.appendChild(card);
    });
}

function createMemoryCard(memory, index) {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <img src="${memory.image}" alt="Memory" class="memory-img">
        <p class="memory-caption">${memory.caption}</p>
        <button class="delete-memory-btn" onclick="deleteMemory(${index})">×</button>
    `;
    
    card.querySelector('.memory-img').addEventListener('click', () => {
        openLightbox(memory.image, memory.caption);
    });
    
    return card;
}

// Image upload handler
document.addEventListener('DOMContentLoaded', () => {
    const imageUpload = document.getElementById('imageUpload');
    if (imageUpload) {
        imageUpload.addEventListener('change', handleImageUpload);
    }
});

function handleImageUpload(e) {
    const files = e.target.files;
    
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        
        reader.onload = (event) => {
            const caption = prompt('Add a caption for this memory:') || 'A beautiful moment';
            const memory = {
                image: event.target.result,
                caption: caption
            };
            
            saveMemory(memory);
        };
        
        reader.readAsDataURL(file);
    });
    
    e.target.value = ''; // Reset input
}

function saveMemory(memory) {
    const memories = JSON.parse(localStorage.getItem('memories')) || [];
    memories.push(memory);
    localStorage.setItem('memories', JSON.stringify(memories));
    loadMemories();
}

function deleteMemory(index) {
    if (confirm('Are you sure you want to delete this memory?')) {
        const memories = JSON.parse(localStorage.getItem('memories')) || [];
        memories.splice(index, 1);
        localStorage.setItem('memories', JSON.stringify(memories));
        loadMemories();
    }
}

// Lightbox functionality
function openLightbox(imageSrc, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    lightboxImg.src = imageSrc;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
}

// ===========================
// Love Notes Section
// ===========================
function loadLoveNotes() {
    let notes = JSON.parse(localStorage.getItem('loveNotes')) || [];
    
    // Add default notes if first time
    if (notes.length === 0) {
        notes = CONFIG.defaultNotes;
        localStorage.setItem('loveNotes', JSON.stringify(notes));
    }
    
    displayLoveNotes(notes);
}

function displayLoveNotes(notes) {
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = '';
    
    notes.forEach((note, index) => {
        const noteCard = document.createElement('div');
        noteCard.className = 'love-note';
        noteCard.style.animationDelay = `${index * 0.15}s`;
        
        noteCard.innerHTML = `
            <p class="note-text">${note}</p>
            ${index >= CONFIG.defaultNotes.length ? `<button class="delete-note-btn" onclick="deleteNote(${index})">Delete</button>` : ''}
        `;
        
        notesContainer.appendChild(noteCard);
    });
}

function addLoveNote() {
    const noteText = document.getElementById('newNoteText').value.trim();
    
    if (noteText) {
        const notes = JSON.parse(localStorage.getItem('loveNotes')) || [];
        notes.push(noteText);
        localStorage.setItem('loveNotes', JSON.stringify(notes));
        
        document.getElementById('newNoteText').value = '';
        loadLoveNotes();
    } else {
        alert('Please write a love note first! 💕');
    }
}

function deleteNote(index) {
    if (confirm('Delete this love note?')) {
        const notes = JSON.parse(localStorage.getItem('loveNotes')) || [];
        notes.splice(index, 1);
        localStorage.setItem('loveNotes', JSON.stringify(notes));
        loadLoveNotes();
    }
}

// ===========================
// Heart Catch Game
// ===========================
let gameActive = false;
let score = 0;
let basket = { x: 275, y: 350, width: 50, height: 20 };
let hearts = [];
let gameInterval;
let heartSpawnInterval;

function startGame() {
    const canvas = document.getElementById('gameCanvas');
    const startBtn = document.getElementById('startGameBtn');
    const gameMessage = document.getElementById('gameMessage');
    
    canvas.classList.add('active');
    startBtn.style.display = 'none';
    gameMessage.textContent = '';
    
    gameActive = true;
    score = 0;
    hearts = [];
    basket.x = 275;
    
    updateScore();
    
    // Start game loop
    gameInterval = setInterval(gameLoop, 1000 / 60); // 60 FPS
    
    // Spawn hearts
    heartSpawnInterval = setInterval(spawnHeart, 1000);
    
    // Game duration: 30 seconds
    setTimeout(endGame, 30000);
}

function spawnHeart() {
    if (!gameActive) return;
    
    const heart = {
        x: Math.random() * 560,
        y: -30,
        speed: Math.random() * 2 + 2,
        emoji: ['❤️', '💕', '💖', '💗'][Math.floor(Math.random() * 4)]
    };
    
    hearts.push(heart);
}

function gameLoop() {
    if (!gameActive) return;
    
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw basket
    ctx.fillStyle = '#ff6b9d';
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
    ctx.fillRect(basket.x - 5, basket.y + 20, basket.width + 10, 5);
    
    // Update and draw hearts
    hearts = hearts.filter(heart => {
        heart.y += heart.speed;
        
        // Check collision with basket
        if (heart.y + 20 >= basket.y && heart.y <= basket.y + basket.height &&
            heart.x + 15 >= basket.x && heart.x <= basket.x + basket.width) {
            score++;
            updateScore();
            return false; // Remove caught heart
        }
        
        // Remove hearts that fell off screen
        if (heart.y > canvas.height) {
            return false;
        }
        
        // Draw heart
        ctx.font = '30px Arial';
        ctx.fillText(heart.emoji, heart.x, heart.y);
        
        return true;
    });
}

function updateScore() {
    document.getElementById('gameScore').textContent = score;
}

function endGame() {
    gameActive = false;
    clearInterval(gameInterval);
    clearInterval(heartSpawnInterval);
    
    const canvas = document.getElementById('gameCanvas');
    const startBtn = document.getElementById('startGameBtn');
    const gameMessage = document.getElementById('gameMessage');
    
    // Update high score
    const highScore = parseInt(localStorage.getItem('highScore')) || 0;
    if (score > highScore) {
        localStorage.setItem('highScore', score.toString());
        loadHighScore();
        gameMessage.textContent = `🎉 New High Score! You caught ${score} hearts! 🎉`;
    } else {
        gameMessage.textContent = `You caught my heart forever 💘 Score: ${score}`;
    }
    
    startBtn.style.display = 'inline-block';
    
    setTimeout(() => {
        canvas.classList.remove('active');
    }, 3000);
}

function loadHighScore() {
    const highScore = localStorage.getItem('highScore') || '0';
    const highScoreElement = document.getElementById('highScore');
    if (highScoreElement) {
        highScoreElement.textContent = highScore;
    }
}

// Keyboard controls for game
document.addEventListener('keydown', (e) => {
    if (!gameActive) return;
    
    const speed = 20;
    
    if (e.key === 'ArrowLeft' && basket.x > 0) {
        basket.x -= speed;
    } else if (e.key === 'ArrowRight' && basket.x < 550) {
        basket.x += speed;
    }
});

// ===========================
// Surprise Modal
// ===========================
function showSurprise() {
    const modal = document.getElementById('surpriseModal');
    const heartBurst = document.getElementById('heartBurst');
    
    modal.classList.add('active');
    
    // Create heart burst animation
    heartBurst.innerHTML = '';
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.className = 'burst-heart';
        heart.textContent = '💖';
        
        const angle = (Math.PI * 2 * i) / 30;
        const distance = 200;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        heart.style.setProperty('--tx', `${tx}px`);
        heart.style.setProperty('--ty', `${ty}px`);
        heart.style.left = '50%';
        heart.style.top = '50%';
        
        heartBurst.appendChild(heart);
    }
}

function closeSurprise() {
    const modal = document.getElementById('surpriseModal');
    modal.classList.remove('active');
}

// ===========================
// Initialize on page load
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
});

// Add shake animation for wrong password
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);
