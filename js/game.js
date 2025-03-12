const emojis = ['❤️', '💕', '💝', '💖', '💗', '💓', '💞', '💘'];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let gameTimer;
let seconds = 0;

function startNewGame() {
    // Reset game state
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    seconds = 0;
    clearInterval(gameTimer);
    
    // Update display
    document.getElementById('moves').textContent = moves;
    document.getElementById('time').textContent = '00:00';
    
    // Create and shuffle cards
    const gameEmojis = [...emojis, ...emojis];
    gameEmojis.sort(() => Math.random() - 0.5);
    
    // Generate game board
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    
    gameEmojis.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'aspect-square bg-pink-100 rounded-lg cursor-pointer flex items-center justify-center text-3xl transform transition-transform hover:scale-105';
        card.innerHTML = '<div class="card-inner hidden">' + emoji + '</div>';
        card.dataset.index = index;
        card.onclick = () => flipCard(card);
        cards.push(card);
        gameBoard.appendChild(card);
    });
    
    // Start timer
    gameTimer = setInterval(updateTimer, 1000);
}

function flipCard(card) {
    if (flippedCards.length === 2 || flippedCards.includes(card) || card.classList.contains('matched')) {
        return;
    }
    
    // Show emoji
    card.querySelector('.card-inner').classList.remove('hidden');
    card.classList.add('bg-white');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        moves++;
        document.getElementById('moves').textContent = moves;
        
        // Check for match
        const [card1, card2] = flippedCards;
        const match = card1.querySelector('.card-inner').innerHTML === 
                     card2.querySelector('.card-inner').innerHTML;
        
        if (match) {
            matchedPairs++;
            flippedCards.forEach(card => card.classList.add('matched'));
            flippedCards = [];
            
            if (matchedPairs === emojis.length) {
                clearInterval(gameTimer);
                setTimeout(() => {
                    alert(`Congratulations! You won in ${moves} moves and ${seconds} seconds!`);
                }, 500);
            }
        } else {
            setTimeout(() => {
                flippedCards.forEach(card => {
                    card.querySelector('.card-inner').classList.add('hidden');
                    card.classList.remove('bg-white');
                });
                flippedCards = [];
            }, 1000);
        }
    }
}

function updateTimer() {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    document.getElementById('time').textContent = 
        `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Start a new game when the page loads
window.addEventListener('load', startNewGame);