// === DATA TTS 15x15 MADRASAH ===
const gridData = [
  ["#","#","#","#","#","#","#","#","#","#","#","#","#","#","#"],
  ["#","1",".","#","#","#","#","#","#","#","#","#","#","#","#"],
  ["#",".","#","#","#","#","#","#","#","#","#","#","#","#","#"],
  ["#",".","#","#","#","#","#","#","#","#","#","#","#","#","#"],
  ["#",".","#","#","#","#","#","#","#","#","#","#","#","#","#"],
  ["#",".","#","#","#","#","#","#","#","#","#","#","#","#","#"],
  ["#",".","#","#","#","#","#","#","#","#","#","#","#","#","#"],
  ["#",".","#","#","#","#","#","#","#","#","#","#","#","#","#"],
  ["#",".","#","#","#","#","#","#","#","#","#","#","#","#","#"],
  ["#",".","#","#","#","#","#","#","#","#","#","#","#","#","#"],
  ["#",".","#","#","#","#","#","#","#","#","#","#","#","#","#"],
  ["#",".","#","#","#","#","#","#","#","#","#","#","#","#","#"],
  ["#",".","#","#","#","#","#","#","#","#","#","#","#","#","#"],
  ["#","25",".","#","#","#","#","#","#","#","#","#","#"],
  ["#","#","#","#","#","#","#","#","#","#","#","#","#","#","#"],
];
];
const cluesAcross = {
 1: "Nama malaikat pencatat amal baik",
 4: "Nabi yang dibelah lautnya",
 6: "Kitab suci umat Islam",
 9: "Arah kiblat umat Islam",
 12: "Puasa bulan...",
 15: "Rukun Islam ke-2",
 18: "Tempat ibadah umat Islam",
 23: "Nabi terakhir"
};
const cluesDown = {
 2: "Malaikat pencabut nyawa",
 3: "Jumlah rakaat sholat Maghrib",
 5: "Hari raya umat Islam",
 7: "Bulan lahir Nabi Muhammad",
 8: "Nabi yang bisa bicara hewan",
 10: "Sujud di luar sholat",
 11: "Nabi yang diuji kesabarannya",
 13: "Kota suci umat Islam",
 14: "Malam 1000 bulan",
 16: "Zakat fitrah",
 17: "Nabi yang sabar",
 19: "Rukun Islam ke-5",
 20: "Tempat Nabi Adam diturunkan",
 21: "Nama surga tertinggi",
 22: "Nabi yang ditelan ikan",
 24: "Doa sebelum makan"
};
// === AKHIR DATA ===

const crosswordGridEl = document.getElementById('crossword-grid');
const cluesAcrossEl = document.getElementById('clues-across');
const cluesDownEl = document.getElementById('clues-down');
const checkBtnEl = document.getElementById('check-btn');
const resetBtnEl = document.getElementById('reset-btn');
const messageEl = document.getElementById('message');

const gridSize = 15;
let currentFocus = { row: 0, col: 0 };

function initCrossword() {
  crosswordGridEl.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  crosswordGridEl.innerHTML = '';
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (gridData[r][c] === '#') {
        cell.classList.add('black');
      } else {
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 1;
        input.dataset.row = r;
        input.dataset.col = c;
        cell.appendChild(input);
        if (typeof gridData[r][c] === 'string' && gridData[r][c] !== '.') {
          const number = document.createElement('span');
          number.classList.add('cell-number');
          number.textContent = gridData[r][c];
          cell.appendChild(number);
        }
        input.addEventListener('input', (e) => handleInput(e, r, c));
        input.addEventListener('keydown', (e) => handleKeydown(e, r, c));
      }
      crosswordGridEl.appendChild(cell);
    }
  }
  displayClues();
  focusFirstCell();
}

function displayClues() {
  cluesAcrossEl.innerHTML = '';
  cluesDownEl.innerHTML = '';
  for (const num in cluesAcross) {
    const li = document.createElement('li');
    li.textContent = `${num}. ${cluesAcross[num]}`;
    cluesAcrossEl.appendChild(li);
  }
  for (const num in cluesDown) {
    const li = document.createElement('li');
    li.textContent = `${num}. ${cluesDown[num]}`;
    cluesDownEl.appendChild(li);
  }
}

function handleInput(e, r, c) {
  const input = e.target;
  input.value = input.value.toUpperCase();
  if (input.value && c < gridSize - 1) {
    const nextInput = document.querySelector(`input[data-row="${r}"][data-col="${c + 1}"]`);
    if (nextInput) nextInput.focus();
  }
}

function handleKeydown(e, r, c) {
  if (e.key === 'Backspace' && !e.target.value && c > 0) {
    const prevInput = document.querySelector(`input[data-row="${r}"][data-col="${c - 1}"]`);
    if (prevInput) prevInput.focus();
  }
}

function focusFirstCell() {
  const firstInput = document.querySelector('#crossword-grid input');
  if (firstInput) firstInput.focus();
}

function checkAnswers() {
  messageEl.textContent = 'Jawaban dicek!';
  messageEl.style.color = 'var(--secondary-color)';
}

function resetGrid() {
  document.querySelectorAll('#crossword-grid input').forEach(input => input.value = '');
  messageEl.textContent = '';
  focusFirstCell();
}

checkBtnEl.addEventListener('click', checkAnswers);
resetBtnEl.addEventListener('click', resetGrid);
document.addEventListener('DOMContentLoaded', initCrossword);
