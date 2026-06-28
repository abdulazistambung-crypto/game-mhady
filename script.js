const gridData = [
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"]
];

// Gantilah array ini dengan 100 data pertanyaan Anda
const cluesAcross = [
    { number: 1, row: 0, col: 0, answer: "INDONESIA", clue: "Negara kepulauan terbesar di dunia" },
    { number: 3, row: 2, col: 2, answer: "JAKARTA", clue: "Ibukota negara Indonesia" },
    // Tambahkan pertanyaan mendatar lainnya di sini...
];

const cluesDown = [
    { number: 1, row: 0, col: 0, answer: "IKN", clue: "Pusat pemerintahan baru Indonesia" },
    { number: 2, row: 0, col: 4, answer: "KOMPUTER", clue: "Perangkat elektronik untuk mengetik" },
    // Tambahkan pertanyaan menurun lainnya di sini...
];

const board = document.getElementById('crossword-board');
const cluesAcrossEl = document.getElementById('clues-across');
const cluesDownEl = document.getElementById('clues-down');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const checkBtn = document.getElementById('check-btn');
const resetBtn = document.getElementById('reset-btn');

let score = 0;
let timerInterval;
let seconds = 0;

// Inisialisasi Game
function initGame() {
    createGrid();
    renderClues();
    startTimer();
}

function createGrid() {
    board.innerHTML = '';
    for (let r = 0; r < 15; r++) {
        for (let c = 0; c < 15; c++) {
            const cellWrapper = document.createElement('div');
            cellWrapper.classList.add('cell-wrapper');
            
            const cell = document.createElement('input');
            cell.setAttribute('maxlength', 1);
            cell.classList.add('cell');
            
            // Logika sederhana untuk menentukan cell mana yang bisa diisi (misal: bukan '*' di gridData)
            // Dalam implementasi nyata, ini disesuaikan dengan pola koordinat TTS Anda.
            cell.classList.add('blocked'); 
            
            cellWrapper.appendChild(cell);
            board.appendChild(cellWrapper);
        }
    }
}

function renderClues() {
    cluesAcrossEl.innerHTML = cluesAcross.map(c => 
        `<li>${c.number}. ${c.clue}</li>`
    ).join('');

    cluesDownEl.innerHTML = cluesDown.map(c => 
        `<li>${c.number}. ${c.clue}</li>`
    ).join('');
}

function startTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    timerInterval = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        timerEl.textContent = `${mins}:${secs}`;
    }, 1000);
}

// Interaksi tombol
checkBtn.addEventListener('click', () => {
    alert('Fitur periksa jawaban dapat dikonfigurasi dengan logika validasi disini!');
    score += 10;
    scoreEl.textContent = score;
});

resetBtn.addEventListener('click', () => {
    if(confirm("Apakah Anda ingin mengulang game dari awal?")) {
        initGame();
        score = 0;
        scoreEl.textContent = score;
    }
});

window.onload = initGame;
