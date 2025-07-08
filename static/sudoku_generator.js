// sudoku_csp_resolver/static/sudoku_generator.js

class SudokuGenerator {
    constructor() {
        this.board = Array(9).fill(0).map(() => Array(9).fill(0));
    }

    // Gera um tabuleiro de Sudoku completo
    generate() {
        this.fillBoard(0, 0);
        return this.board;
    }

    // Preenche o tabuleiro usando backtracking
    fillBoard(row, col) {
        if (row === 9) {
            return true; // O tabuleiro está completo
        }

        const nextRow = (col === 8) ? row + 1 : row;
        const nextCol = (col === 8) ? 0 : col + 1;

        const nums = this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

        for (const num of nums) {
            if (this.isValid(row, col, num)) {
                this.board[row][col] = num;
                if (this.fillBoard(nextRow, nextCol)) {
                    return true;
                }
                this.board[row][col] = 0; // Backtrack
            }
        }
        return false;
    }

    // Verifica se um número é válido em uma determinada posição
    isValid(row, col, num) {
        // Verifica a linha
        for (let i = 0; i < 9; i++) {
            if (this.board[row][i] === num) {
                return false;
            }
        }

        // Verifica a coluna
        for (let i = 0; i < 9; i++) {
            if (this.board[i][col] === num) {
                return false;
            }
        }

        // Verifica o bloco 3x3
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.board[startRow + i][startCol + j] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    // Embaralha um array
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Remove números do tabuleiro completo para criar o quebra-cabeça
    removeNumbers(difficulty) {
        let cellsToRemove;
        switch (difficulty) {
            case 'easy':
                cellsToRemove = 40;
                break;
            case 'medium':
                cellsToRemove = 50;
                break;
            case 'hard':
                cellsToRemove = 60;
                break;
            default:
                cellsToRemove = 40;
        }

        let attempts = cellsToRemove;
        while (attempts > 0) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);

            if (this.board[row][col] !== 0) {
                this.board[row][col] = 0;
                attempts--;
            }
        }
    }

    // Cria um novo quebra-cabeça do zero
    createPuzzle(difficulty) {
        this.board = Array(9).fill(0).map(() => Array(9).fill(0));
        this.generate();
        this.removeNumbers(difficulty);
        return this.board;
    }
}

// Disponibiliza o gerador globalmente para que o script.js possa usá-lo
window.sudokuGenerator = new SudokuGenerator(); 