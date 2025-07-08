# sudoku_csp_resolver/csp_solver.py

def find_empty(board):
    """Encontra uma célula vazia (representada por 0) no tabuleiro."""
    for i in range(9):
        for j in range(9):
            if board[i][j] == 0:
                return (i, j)
    return None

def is_valid(board, num, pos):
    """Verifica se um número é válido em uma determinada posição."""
    row, col = pos

    # Verifica a linha
    for i in range(9):
        if board[row][i] == num and col != i:
            return False

    # Verifica a coluna
    for i in range(9):
        if board[i][col] == num and row != i:
            return False

    # Verifica o bloco 3x3
    box_x = col // 3
    box_y = row // 3
    for i in range(box_y * 3, box_y * 3 + 3):
        for j in range(box_x * 3, box_x * 3 + 3):
            if board[i][j] == num and (i, j) != pos:
                return False

    return True

def get_possible_values(board, row, col):
    """Obtém todos os valores possíveis para uma célula."""
    if board[row][col] != 0:
        return []
    
    possibilities = set(range(1, 10))
    
    # Remove valores da linha e coluna
    for i in range(9):
        possibilities.discard(board[row][i])
        possibilities.discard(board[i][col])
        
    # Remove valores do bloco 3x3
    start_row, start_col = 3 * (row // 3), 3 * (col // 3)
    for r in range(start_row, start_row + 3):
        for c in range(start_col, start_col + 3):
            possibilities.discard(board[r][c])
            
    return list(possibilities)

def select_variable_mrv(board):
    """Seleciona a variável (célula) com o Mínimo de Valores Restantes (MRV)."""
    min_len = 10
    best_var = None
    for r in range(9):
        for c in range(9):
            if board[r][c] == 0:
                num_possibilities = len(get_possible_values(board, r, c))
                if num_possibilities < min_len:
                    min_len = num_possibilities
                    best_var = (r, c)
    return best_var

def solve_with_csp(board):
    """Função principal que resolve o Sudoku usando backtracking e MRV."""
    
    steps = []
    current_board = [row[:] for row in board]

    def backtrack(b):
        var = select_variable_mrv(b)
        if not var:
            return True  # Resolvido
        
        row, col = var
        
        possible_values = get_possible_values(b, row, col)

        for num in possible_values:
            b[row][col] = num
            steps.append([row[:] for row in b]) # Adiciona uma cópia do passo

            if backtrack(b):
                return True

            b[row][col] = 0  # Backtrack
            steps.append([row[:] for row in b]) # Adiciona o passo de backtrack

        return False

    if backtrack(current_board):
        return steps
    else:
        return None

def check_solution(board):
    """Verifica se um tabuleiro de Sudoku está completo e correto."""
    for r in range(9):
        for c in range(9):
            if board[r][c] == 0:
                return False # Incompleto
            
            # Temporariamente esvazia a célula para validar o resto
            num = board[r][c]
            board[r][c] = 0 
            if not is_valid(board, num, (r, c)):
                board[r][c] = num # Restaura o número
                return False
            board[r][c] = num # Restaura o número
    return True

def solve_sudoku(board):
    """Função de entrada para o resolvedor."""
    return solve_with_csp(board) 