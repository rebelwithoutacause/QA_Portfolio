// ===================================
// 404 Secret Room - Interactive Script
// ===================================

document.addEventListener('DOMContentLoaded', function() {

    // ===================================
    // Configuration & State
    // ===================================

    const state = {
        secretsFound: 0,
        totalSecrets: 3,
        candleClicks: 0,
        riddleSolved: false,
        gamePlayed: false,
        codeSequence: [],
        secretCode: ['Q', 'A', 'T', 'E', 'S', 'T'], // Secret code: QATEST
        discoveries: []
    };

    const riddles = [
        {
            question: "I find what others miss, I see what others ignore. I break what seems perfect. What am I?",
            answer: "bug",
            alternates: ["bugs", "a bug", "defect", "error", "tester", "qa"]
        },
        {
            question: "I have no life, yet I can die. I have no mouth, yet I can be fed. What am I?",
            answer: "test",
            alternates: ["tests", "a test", "testing", "test case"]
        },
        {
            question: "What gets more valuable the more it breaks?",
            answer: "software",
            alternates: ["code", "program", "application", "system"]
        }
    ];

    console.log('%c💡 RIDDLE HINT: The first riddle answer is "bug" or "tester"', 'color: #4ade80; font-size: 12px;');

    let currentRiddle = null;
    let gameTimer = null;
    let bugsCaught = 0;
    let totalBugs = 8;
    let gameLevel = 1;
    let bugSpeed = 3000;

    // ===================================
    // Initialize Particles Background
    // ===================================

    function initParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (10 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // ===================================
    // Progress Tracker
    // ===================================

    function updateProgress() {
        document.getElementById('secretsFound').textContent = state.secretsFound;
        document.getElementById('totalSecrets').textContent = state.totalSecrets;

        const progressPercentage = (state.secretsFound / state.totalSecrets) * 100;
        document.getElementById('progressFill').style.width = progressPercentage + '%';

        // Check if all secrets found
        if (state.secretsFound >= state.totalSecrets) {
            setTimeout(() => {
                revealFinalMessage();
            }, 1000);
        }
    }

    function addDiscovery(text) {
        state.discoveries.push(text);

        const discoveryList = document.getElementById('discoveryList');
        const li = document.createElement('li');
        li.textContent = text;
        discoveryList.appendChild(li);

        const discoveriesBox = document.getElementById('discoveries');
        discoveriesBox.classList.remove('hidden');
    }

    function incrementSecrets(discoveryText) {
        state.secretsFound++;
        addDiscovery(discoveryText);
        updateProgress();
    }

    // ===================================
    // Candle Interaction
    // ===================================

    const candle = document.getElementById('candle1');

    candle.addEventListener('click', function() {
        state.candleClicks++;

        const clicks = state.candleClicks;
        const clueText = document.getElementById('clueText');

        if (clicks === 1) {
            clueText.textContent = "The flame flickers... Keep clicking.";
            this.classList.add('glow');
            setTimeout(() => this.classList.remove('glow'), 500);
        } else if (clicks === 3) {
            clueText.textContent = "The candle grows brighter! Something awakens...";
            const flame = this.querySelector('.flame');
            flame.style.transform = 'scale(1.5)';
            flame.style.boxShadow = '0 0 40px #ff6600, 0 0 80px #ff6600';
        } else if (clicks === 5) {
            clueText.textContent = "🔥 The candle reveals a riddle in its light!";
            showRiddle();
            incrementSecrets("🕯️ Ignited the Ancient Candle");

            // Also show the game immediately
            setTimeout(() => {
                document.getElementById('bugHuntGame').classList.remove('hidden');
                document.getElementById('bugHuntGame').scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 2000);
        }
    });

    // ===================================
    // Riddle System
    // ===================================

    function showRiddle() {
        if (state.riddleSolved) return;

        const riddleBox = document.getElementById('riddleBox');
        const riddleText = document.getElementById('riddleText');

        currentRiddle = riddles[Math.floor(Math.random() * riddles.length)];
        riddleText.textContent = currentRiddle.question;

        riddleBox.classList.remove('hidden');
        riddleBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    document.getElementById('riddleSubmit').addEventListener('click', function() {
        checkRiddleAnswer();
    });

    document.getElementById('riddleAnswer').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkRiddleAnswer();
        }
    });

    function checkRiddleAnswer() {
        if (state.riddleSolved) return;

        const answer = document.getElementById('riddleAnswer').value.toLowerCase().trim();
        const feedback = document.getElementById('riddleFeedback');

        const isCorrect = answer === currentRiddle.answer ||
                         currentRiddle.alternates.includes(answer);

        if (isCorrect) {
            feedback.textContent = "✓ Correct! You have the mind of a true tester!";
            feedback.className = 'riddle-feedback correct';
            state.riddleSolved = true;

            document.getElementById('riddleAnswer').disabled = true;
            document.getElementById('riddleSubmit').disabled = true;

            setTimeout(() => {
                document.getElementById('clueText').textContent = "💡 Try typing the secret code: Q-A-T-E-S-T";
            }, 1000);

            incrementSecrets("🧩 Solved the Mysterious Riddle");

        } else {
            feedback.textContent = "✗ Not quite. Think like a QA tester...";
            feedback.className = 'riddle-feedback incorrect';
        }
    }


    // ===================================
    // Bug Hunt Mini-Game
    // ===================================

    const startGameButton = document.getElementById('startGame');
    const gameArea = document.getElementById('gameArea');

    startGameButton.addEventListener('click', function() {
        if (state.gamePlayed) {
            resetGame();
        }
        startBugHunt();
    });

    function startBugHunt() {
        bugsCaught = 0;
        let timeLeft = 45;
        gameLevel = 1;
        bugSpeed = 3000;

        document.getElementById('bugsCount').textContent = `${bugsCaught}/${totalBugs}`;
        document.getElementById('gameTimer').textContent = timeLeft;

        startGameButton.disabled = true;
        startGameButton.textContent = '🎯 Hunting...';

        gameArea.innerHTML = '';
        gameArea.style.backgroundColor = 'rgba(10, 10, 10, 0.8)';

        // Display level
        showLevelMessage('Level 1: Easy Bugs');

        // Spawn bugs with increasing difficulty
        for (let i = 0; i < totalBugs; i++) {
            setTimeout(() => {
                // Increase difficulty every 3 bugs
                if (i === 3) {
                    gameLevel = 2;
                    bugSpeed = 2000;
                    showLevelMessage('Level 2: Faster Bugs!');
                }
                if (i === 6) {
                    gameLevel = 3;
                    bugSpeed = 1500;
                    showLevelMessage('Level 3: Elite Bugs!');
                    gameArea.style.backgroundColor = 'rgba(30, 10, 10, 0.9)';
                }
                spawnBug(i);
            }, i * 1500);
        }

        // Start timer
        gameTimer = setInterval(() => {
            timeLeft--;
            document.getElementById('gameTimer').textContent = timeLeft;

            // Warning when time is low
            if (timeLeft === 10) {
                document.getElementById('gameTimer').style.color = '#f87171';
                document.getElementById('gameTimer').style.fontSize = '1.5rem';
            }

            if (timeLeft <= 0) {
                endGame(false);
            }
        }, 1000);
    }

    function showLevelMessage(message) {
        const levelMsg = document.createElement('div');
        levelMsg.className = 'level-message';
        levelMsg.textContent = message;
        levelMsg.style.position = 'absolute';
        levelMsg.style.top = '50%';
        levelMsg.style.left = '50%';
        levelMsg.style.transform = 'translate(-50%, -50%)';
        levelMsg.style.fontSize = '2rem';
        levelMsg.style.fontWeight = 'bold';
        levelMsg.style.color = '#fbbf24';
        levelMsg.style.textShadow = '0 0 10px rgba(251, 191, 36, 0.8)';
        levelMsg.style.zIndex = '100';
        levelMsg.style.pointerEvents = 'none';
        levelMsg.style.animation = 'fade-in-out 2s ease';

        gameArea.appendChild(levelMsg);
        setTimeout(() => levelMsg.remove(), 2000);
    }

    function spawnBug(index) {
        const bug = document.createElement('div');
        bug.className = 'bug';

        // Different bug types based on level
        const bugTypes = ['🐛', '🐞', '🦗', '🪲', '🕷️'];
        const bugType = bugTypes[gameLevel - 1] || '🐛';
        bug.textContent = bugType;

        // Random position
        bug.style.left = Math.random() * (gameArea.offsetWidth - 50) + 'px';
        bug.style.top = Math.random() * (gameArea.offsetHeight - 50) + 'px';

        // Add difficulty-based styling
        if (gameLevel === 2) {
            bug.style.fontSize = '1.8rem';
            bug.style.filter = 'hue-rotate(90deg)';
        } else if (gameLevel === 3) {
            bug.style.fontSize = '1.5rem';
            bug.style.filter = 'hue-rotate(180deg) brightness(1.2)';
            bug.style.animation = `bug-crawl ${bugSpeed / 1000}s linear infinite, bug-spin 0.5s linear infinite`;
        }

        // Movement animation with varying speed
        const moveInterval = setInterval(() => {
            const currentLeft = parseInt(bug.style.left);
            const currentTop = parseInt(bug.style.top);

            const newLeft = currentLeft + (Math.random() - 0.5) * 60;
            const newTop = currentTop + (Math.random() - 0.5) * 60;

            // Keep within bounds
            bug.style.left = Math.max(0, Math.min(gameArea.offsetWidth - 50, newLeft)) + 'px';
            bug.style.top = Math.max(0, Math.min(gameArea.offsetHeight - 50, newTop)) + 'px';
        }, bugSpeed);

        bug.addEventListener('click', function() {
            clearInterval(moveInterval);
            bugsCaught++;
            document.getElementById('bugsCount').textContent = `${bugsCaught}/${totalBugs}`;

            // Different death animations
            const deathEffects = ['💥', '⚡', '💫', '✨', '🔥'];
            this.textContent = deathEffects[Math.floor(Math.random() * deathEffects.length)];
            this.style.transform = 'scale(2) rotate(360deg)';
            this.style.transition = 'all 0.4s ease';

            // Particle explosion effect
            createBugExplosion(this.offsetLeft, this.offsetTop);

            setTimeout(() => this.remove(), 400);

            // Victory sound effect (visual)
            if (bugsCaught >= totalBugs) {
                endGame(true);
            } else {
                // Show combo if catching bugs quickly
                showComboText(bug.offsetLeft, bug.offsetTop);
            }
        });

        gameArea.appendChild(bug);

        // Auto-remove bug after some time if not caught
        setTimeout(() => {
            if (bug.parentElement) {
                clearInterval(moveInterval);
                bug.style.opacity = '0';
                setTimeout(() => bug.remove(), 500);
            }
        }, bugSpeed * 3);
    }

    function createBugExplosion(x, y) {
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.textContent = '•';
            particle.style.position = 'absolute';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.color = '#4ade80';
            particle.style.fontSize = '1rem';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '99';

            const angle = (Math.PI * 2 * i) / 6;
            const distance = 30;
            const targetX = x + Math.cos(angle) * distance;
            const targetY = y + Math.sin(angle) * distance;

            gameArea.appendChild(particle);

            setTimeout(() => {
                particle.style.transition = 'all 0.5s ease';
                particle.style.left = targetX + 'px';
                particle.style.top = targetY + 'px';
                particle.style.opacity = '0';
            }, 10);

            setTimeout(() => particle.remove(), 600);
        }
    }

    function showComboText(x, y) {
        const combo = document.createElement('div');
        combo.textContent = '+1 🎯';
        combo.style.position = 'absolute';
        combo.style.left = x + 'px';
        combo.style.top = (y - 20) + 'px';
        combo.style.color = '#4ade80';
        combo.style.fontWeight = 'bold';
        combo.style.fontSize = '1.2rem';
        combo.style.pointerEvents = 'none';
        combo.style.zIndex = '99';
        combo.style.animation = 'float-up 1s ease';

        gameArea.appendChild(combo);
        setTimeout(() => combo.remove(), 1000);
    }

    function endGame(won) {
        clearInterval(gameTimer);
        startGameButton.disabled = false;

        // Clear all bugs
        const remainingBugs = gameArea.querySelectorAll('.bug');
        remainingBugs.forEach(bug => bug.remove());

        // Reset timer color
        document.getElementById('gameTimer').style.color = '#4ade80';
        document.getElementById('gameTimer').style.fontSize = '1rem';

        if (won) {
            startGameButton.textContent = '🏆 Victory! Play Again?';
            document.getElementById('clueText').textContent = `🎉 All ${totalBugs} bugs squashed! You're a QA legend!`;

            // Victory animation
            gameArea.style.backgroundColor = 'rgba(10, 50, 10, 0.9)';
            showLevelMessage('🏆 VICTORY! 🏆');

            if (!state.gamePlayed) {
                state.gamePlayed = true;
                incrementSecrets("🐛 Mastered the Bug Hunt");
            }
        } else {
            startGameButton.textContent = '⏱️ Time Up! Try Again?';
            const escaped = totalBugs - bugsCaught;
            document.getElementById('clueText').textContent = `⏱️ Time's up! ${escaped} bugs escaped. A real QA never gives up!`;

            // Failure animation
            gameArea.style.backgroundColor = 'rgba(50, 10, 10, 0.9)';
            showLevelMessage('💔 TIME UP 💔');
        }
    }

    function resetGame() {
        bugsCaught = 0;
        gameLevel = 1;
        bugSpeed = 3000;
        document.getElementById('bugsCount').textContent = `0/${totalBugs}`;
        document.getElementById('gameTimer').textContent = '45';
        document.getElementById('gameTimer').style.color = '#4ade80';
        document.getElementById('gameTimer').style.fontSize = '1rem';
        startGameButton.textContent = '🐛 Start Hunt';
        gameArea.innerHTML = '';
        gameArea.style.backgroundColor = 'rgba(10, 10, 10, 0.8)';
    }

    // ===================================
    // Secret Keyboard Code
    // ===================================

    document.addEventListener('keydown', function(e) {
        // Ignore if typing in an input field or textarea
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        // Ignore special keys
        if (e.key.length > 1) {
            // Allow only letter keys (ignore Enter, Backspace, Arrow keys, etc.)
            return;
        }

        const key = e.key.toUpperCase();

        // Only add if it's a letter
        if (/^[A-Z]$/.test(key)) {
            // Add key to sequence
            state.codeSequence.push(key);

            // Keep only last 6 keys
            if (state.codeSequence.length > 6) {
                state.codeSequence.shift();
            }

            // Display code sequence
            const codeDisplay = document.getElementById('codeDisplay');
            codeDisplay.innerHTML = '';

            state.codeSequence.forEach(k => {
                const keyDiv = document.createElement('div');
                keyDiv.className = 'code-key';
                keyDiv.textContent = k;
                codeDisplay.appendChild(keyDiv);
            });

            // Check if correct sequence
            if (state.codeSequence.join('') === state.secretCode.join('')) {
                document.getElementById('clueText').textContent = "🎊 SECRET CODE ACTIVATED! You've unlocked all mysteries!";

                // Mark all remaining secrets as found
                if (state.secretsFound < state.totalSecrets) {
                    while (state.secretsFound < state.totalSecrets) {
                        incrementSecrets("🔑 Master Code Discovered");
                    }
                }

                // Visual feedback
                codeDisplay.style.border = '3px solid #4ade80';
                codeDisplay.style.boxShadow = '0 0 30px rgba(74, 222, 128, 0.8)';
            }
        }
    });

    // ===================================
    // Final Message Reveal
    // ===================================

    function revealFinalMessage() {
        const hiddenMessage = document.getElementById('hiddenMessage');
        hiddenMessage.classList.remove('hidden');

        // Play sound effect if available
        const clickSound = document.getElementById('clickSound');
        if (clickSound) {
            clickSound.play().catch(e => console.log('Audio play prevented'));
        }

        // Confetti effect (simple version)
        createConfetti();
    }

    function createConfetti() {
        const colors = ['#B00020', '#fbbf24', '#4ade80', '#60a5fa', '#a78bfa'];
        const confettiCount = 50;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.zIndex = '10000';
            confetti.style.opacity = '1';
            confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';

            document.body.appendChild(confetti);

            // Animate falling
            const duration = 2000 + Math.random() * 2000;
            const xMovement = (Math.random() - 0.5) * 200;

            confetti.animate([
                { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight}px) translateX(${xMovement}px) rotate(720deg)`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });

            setTimeout(() => confetti.remove(), duration);
        }
    }

    // ===================================
    // Easter Eggs & Additional Secrets
    // ===================================

    // Double-click anywhere to get a hint
    let clickTimeout = null;
    let clickCount = 0;

    document.body.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || e.target.tagName === 'A') {
            return;
        }

        clickCount++;

        if (clickTimeout) {
            clearTimeout(clickTimeout);
        }

        if (clickCount === 2) {
            giveHint();
            clickCount = 0;
        } else {
            clickTimeout = setTimeout(() => {
                clickCount = 0;
            }, 300);
        }
    });

    function giveHint() {
        const hints = [
            "Try clicking the candle multiple times...",
            "The book might have something interesting to say...",
            "Have you tried the orb?",
            "Look at the safe carefully...",
            "Maybe there's a keyboard sequence?",
            "Double-click anywhere for hints!",
            "The answer to quality is in the testing..."
        ];

        const randomHint = hints[Math.floor(Math.random() * hints.length)];
        document.getElementById('clueText').textContent = "💡 Hint: " + randomHint;
    }

    // Time-based Easter egg
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 6) {
        document.querySelector('.subtitle').textContent = "Working late? That's dedication...";
    }

    // Console Easter eggs
    console.log('%c404 Secret Room', 'color: #B00020; font-size: 24px; font-weight: bold;');
    console.log('%cYou found the developer console! +10 QA points', 'color: #4ade80; font-size: 14px;');
    console.log('%cSecret tip: The code is related to QA testing...', 'color: #a0a0a0; font-size: 12px;');

    // ===================================
    // Initialize Everything
    // ===================================

    initParticles();
    updateProgress();

    // Welcome message
    setTimeout(() => {
        document.getElementById('clueText').textContent = "💡 Start by clicking the candle 5 times...";
    }, 2000);

});
