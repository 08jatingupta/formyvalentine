// Create floating hearts
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💘'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 15000);
    }, 800);
}

// Envelope interaction
let envelopeOpened = false;
const envelope = document.getElementById('envelope');

envelope.addEventListener('click', () => {
    if (!envelopeOpened) {
        envelope.classList.add('open');
        envelopeOpened = true;
        
        setTimeout(() => {
            nextSection('letter');
        }, 1000);
    }
});

// Section navigation
function nextSection(sectionId) {
    const currentSection = document.querySelector('.section.active, .landing-section.active');
    const nextSection = document.getElementById(sectionId);
    
    if (currentSection) {
        currentSection.classList.remove('active');
        currentSection.classList.add('hidden');
    }
    
    nextSection.classList.remove('hidden');
    setTimeout(() => {
        nextSection.classList.add('active');
    }, 50);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Quiz - Moving No Button
let noButtonMoves = 0;
const noBtn = document.getElementById('noBtn');

function moveNoButton() {
    noButtonMoves++;
    
    const messages = [
        "Are you sure? 🥺",
        "Really? 💔",
        "Think again! 😢",
        "Please? 🙏",
        "One more chance? 💕",
        "You're breaking my heart! 😭"
    ];
    
    if (noButtonMoves < messages.length) {
        noBtn.textContent = messages[noButtonMoves];
    }
    
    // Random position
    const maxX = window.innerWidth - noBtn.offsetWidth - 100;
    const maxY = window.innerHeight - noBtn.offsetHeight - 100;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

// Yes button handler
function handleYes() {
    // Create confetti effect
    createConfetti();
    
    setTimeout(() => {
        nextSection('final');
    }, 1000);
}

// Confetti effect
function createConfetti() {
    const colors = ['#ff1744', '#ff4081', '#f50057', '#ffd700'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.borderRadius = '50%';
        
        document.body.appendChild(confetti);
        
        const fall = confetti.animate([
            { 
                transform: `translateY(0px) rotate(0deg)`,
                opacity: 1 
            },
            { 
                transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`,
                opacity: 0 
            }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        fall.onfinish = () => confetti.remove();
    }
}

// Restart function
function restart() {
    // Reset all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
        section.classList.add('hidden');
    });
    
    // Reset landing section
    const landing = document.getElementById('landing');
    landing.classList.remove('hidden');
    landing.classList.add('active');
    
    // Reset envelope
    envelope.classList.remove('open');
    envelopeOpened = false;
    
    // Reset no button
    noButtonMoves = 0;
    noBtn.textContent = 'No';
    noBtn.style.position = 'relative';
    noBtn.style.left = 'auto';
    noBtn.style.top = 'auto';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Music toggle (optional - you can add your own audio file)
const musicToggle = document.getElementById('musicToggle');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        musicToggle.innerHTML = '<span class="music-icon">🔊</span>';
        // If you want to add music, create an audio element here
        // const audio = new Audio('your-music-file.mp3');
        // audio.loop = true;
        // audio.play();
    } else {
        musicToggle.innerHTML = '<span class="music-icon">🔇</span>';
        // audio.pause();
    }
});

// Create fireworks effect on final page
function createFireworks() {
    const fireworksContainer = document.querySelector('.fireworks');
    if (!fireworksContainer) return;
    
    setInterval(() => {
        const firework = document.createElement('div');
        firework.style.position = 'absolute';
        firework.style.left = Math.random() * 100 + '%';
        firework.style.top = Math.random() * 100 + '%';
        firework.style.width = '5px';
        firework.style.height = '5px';
        firework.style.borderRadius = '50%';
        firework.style.backgroundColor = ['#ff1744', '#ffd700', '#ff4081'][Math.floor(Math.random() * 3)];
        
        fireworksContainer.appendChild(firework);
        
        const burst = firework.animate([
            { transform: 'scale(1)', opacity: 1 },
            { transform: 'scale(20)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });
        
        burst.onfinish = () => firework.remove();
    }, 500);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    
    // Add observer for final section to start fireworks
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.id === 'final' && mutation.target.classList.contains('active')) {
                createFireworks();
            }
        });
    });
    
    const finalSection = document.getElementById('final');
    if (finalSection) {
        observer.observe(finalSection, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
});

// Add sparkle effect on hover for important elements
document.querySelectorAll('.next-btn, .quiz-btn, .restart-btn').forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const sparkle = document.createElement('span');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.left = e.offsetX + 'px';
        sparkle.style.top = e.offsetY + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.fontSize = '20px';
        
        this.style.position = 'relative';
        this.appendChild(sparkle);
        
        const float = sparkle.animate([
            { transform: 'translateY(0px)', opacity: 1 },
            { transform: 'translateY(-30px)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });
        
        float.onfinish = () => sparkle.remove();
    });
});

// Add typing effect to letter (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Easter egg - Konami code for extra hearts
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        // Trigger heart explosion
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '❤️';
                heart.style.position = 'fixed';
                heart.style.left = '50%';
                heart.style.top = '50%';
                heart.style.fontSize = '30px';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '9999';
                
                document.body.appendChild(heart);
                
                const angle = (Math.PI * 2 * i) / 50;
                const velocity = 200;
                
                const animation = heart.animate([
                    { 
                        transform: 'translate(-50%, -50%)',
                        opacity: 1 
                    },
                    { 
                        transform: `translate(calc(-50% + ${Math.cos(angle) * velocity}px), calc(-50% + ${Math.sin(angle) * velocity}px))`,
                        opacity: 0 
                    }
                ], {
                    duration: 2000,
                    easing: 'ease-out'
                });
                
                animation.onfinish = () => heart.remove();
            }, i * 20);
        }
    }
});
