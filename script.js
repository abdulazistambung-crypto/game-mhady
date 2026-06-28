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
const checkBtnE1 = document.getElementById('check-btn');
const resetBtnE1 = document.getElementById('reset-btn');

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
checkBtnE1.addEventListener('click', () => {
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
javascript// 1. DATA SOALNYA TARUH SINI DULU BOS. NANTI KITA PISAH KE soal.json
const cluesData = {
  size: 15, // Ukuran grid 15x15. Ganti 20 kalo mau gede
  across: [
    { num: 1, row: 0, col: 0, answer: "JAKARTA", clue: "Ibukota Indonesia" },
    { num: 4, row: 2, col: 3, answer: "MANTAN", clue: "Bekas pacar" },
    { num: 5, row: 4, col: 0, answer: "KELASMIN", clue: "Kelas paling atas" }
  ],
  down: [
    { num: 2, row: 0, col: 0, answer: "JAMBU", clue: "Buah yang ada bijinya di luar" },
    { num: 3, row: 0, col: 4, answer: "KERTAS", clue: "Tempat nulis" }
  ]
};

const grid = document.getElementById('grid');
const cluesAcrossE1 = document.getElementById('clues-across');
const cluesDownE1 = document.getElementById('clues-down');
const checkBtnE1 = document.getElementById('check-btn');
const resetBtn = document.getElementById('reset-btn');
const size = cluesData.size;

function buildGrid() {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.innerHTML = '';
  const numberMap = new Map();
  
  [...cluesData.across, ...cluesData.down].forEach(c => {
    numberMap.set(`${c.row}-${c.col}`, c.num);
  });

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('cell');
      const key = `${r}-${c}`;
      
      let isUsed = false;
      [...cluesData.across, ...cluesData.down].forEach(clue => {
        if (r === clue.row && c >= clue.col && c < clue.col + clue.answer.length) isUsed = true;
        if (c === clue.col && r >= clue.row && r < clue.row + clue.answer.length) isUsed = true;
      });

      if (isUsed) {
        const input = document.createElement('input');
        input.maxLength = 1;
        input.dataset.row = r;
        input.dataset.col = c;
        cellDiv.appendChild(input);
        if (numberMap.has(key)) {
          const numSpan = document.createElement('span');
          numSpan.classList.add('number');
          numSpan.textContent = numberMap.get(key);
          cellDiv.appendChild(numSpan);
        }
      } else {
        cellDiv.classList.add('blocked');
      }
      grid.appendChild(cellDiv);
    }
  }
}

function buildClues() {
  cluesAcrossE1.innerHTML = '';
  cluesData.across.forEach(c => {
    const li = document.createElement('li');
    li.textContent = `${c.num}. ${c.clue}`;
    cluesAcrossE1.appendChild(li);
  });
  cluesDownE1.innerHTML = '';
  cluesData.down.forEach(c => {
    const li = document.createElement('li');
    li.textContent = `${c.num}. ${c.clue}`;
    cluesDownE1.appendChild(li);
  });
}

checkBtnE1.addEventListener('click', () => {
  document.querySelectorAll('.cell input').forEach(input => {
    const r = parseInt(input.dataset.row);
    const c = parseInt(input.dataset.col);
    let correctAnswer = '';
    cluesData.across.forEach(clue => {
      if (r === clue.row && c >= clue.col && c < clue.col + clue.answer.length) {
        correctAnswer = clue.answer[c - clue.col];
      }
    });
    cluesData.down.forEach(clue => {
      if (c === clue.col && r >= clue.row && r < clue.row + clue.answer.length) {
        correctAnswer = clue.answer[r - clue.row];
      }
    });
    if (input.value.toUpperCase() === correctAnswer) {
      input.style.backgroundColor = '#2ecc71'; // Hijau = bener
    } else {
      input.style.backgroundColor = '#e74c3c'; // Merah = salah
    }
  });
});

resetBtn.addEventListener('click', () => {
  document.querySelectorAll('.cell input').forEach(input => {
    input.value = '';
    input.style.backgroundColor = '';
  });
});

// Jalankan pertama kali
buildGrid();
buildClues();
