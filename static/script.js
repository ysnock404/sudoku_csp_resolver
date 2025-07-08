document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('sudoku-board');
    const easyBtn = document.getElementById('easy-btn');
    const mediumBtn = document.getElementById('medium-btn');
    const hardBtn = document.getElementById('hard-btn');
    const solveBtn = document.getElementById('solve-btn');
    const checkBtn = document.getElementById('check-btn'); // Botão Verificar
    const cells = [];
    let currentPuzzle = [];

    function createBoard() {
        boardElement.innerHTML = '';
        cells.length = 0; // Limpa o array de células
        for (let i = 0; i < 81; i++) {
            const cell = document.createElement('input'); // Mudar para input
            cell.classList.add('cell');
            cell.setAttribute('type', 'text');
            cell.setAttribute('maxlength', '1');
            cell.addEventListener('input', (e) => {
                // Permite apenas números de 1 a 9
                e.target.value = e.target.value.replace(/[^1-9]/g, '');
            });
            boardElement.appendChild(cell);
            cells.push(cell);
        }
    }

    function updateBoard(board) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cellIndex = i * 9 + j;
                const value = board[i][j];
                cells[cellIndex].value = value === 0 ? '' : value;
                if (value !== 0) {
                    cells[cellIndex].classList.add('fixed');
                    cells[cellIndex].disabled = true;
                } else {
                    cells[cellIndex].classList.remove('fixed');
                    cells[cellIndex].classList.add('editable');
                    cells[cellIndex].disabled = false;
                }
            }
        }
    }

    // Lê o tabuleiro da interface do usuário
    function readBoardFromUI() {
        const board = Array(9).fill(0).map(() => Array(9).fill(0));
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cellIndex = i * 9 + j;
                const value = cells[cellIndex].value;
                board[i][j] = value === '' ? 0 : parseInt(value, 10);
            }
        }
        return board;
    }

    async function sendGameStateToBackend(board) {
        try {
            const response = await fetch('/api/log_gamestate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ board }),
            });
            const data = await response.json();
            console.log('Resposta do Backend:', data);
        } catch (error) {
            console.error('Erro ao enviar o estado do jogo:', error);
        }
    }

    function generateNewPuzzle(difficulty) {
        currentPuzzle = window.sudokuGenerator.createPuzzle(difficulty);
        updateBoard(currentPuzzle);
        sendGameStateToBackend(currentPuzzle);
    }

    // Anima a solução passo a passo
    function animateSolution(steps) {
        let stepIndex = 0;
        function nextStep() {
            if (stepIndex >= steps.length) {
                // A animação pode terminar antes da solução final se houver backtracks
                updateBoard(steps[steps.length - 1]);
                return;
            };
            updateBoard(steps[stepIndex]);
            stepIndex++;
            setTimeout(nextStep, 50); // Ajuste o tempo para velocidade
        }
        nextStep();
    }

    easyBtn.addEventListener('click', () => generateNewPuzzle('easy'));
    mediumBtn.addEventListener('click', () => generateNewPuzzle('medium'));
    hardBtn.addEventListener('click', () => generateNewPuzzle('hard'));

    solveBtn.addEventListener('click', async () => {
        if (currentPuzzle.length === 0) {
            alert('Gere um novo quebra-cabeça primeiro!');
            return;
        }
        // Desabilita botões durante a resolução
        solveBtn.disabled = true;
        checkBtn.disabled = true;

        try {
            const response = await fetch('/api/solve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ board: currentPuzzle }),
            });
            const data = await response.json();
            if (data.status === 'success') {
                animateSolution(data.solution_steps);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Erro ao resolver o Sudoku:', error);
            alert('Ocorreu um erro ao tentar resolver o Sudoku.');
        } finally {
            // Reabilita os botões
            solveBtn.disabled = false;
            checkBtn.disabled = false;
        }
    });

    // Lógica do botão Verificar
    checkBtn.addEventListener('click', async () => {
        const userBoard = readBoardFromUI();
        try {
            const response = await fetch('/api/check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ board: userBoard }),
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error('Erro ao verificar a solução:', error);
            alert('Ocorreu um erro ao verificar a solução.');
        }
    });

    createBoard();
}); 