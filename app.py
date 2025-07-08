from flask import Flask, render_template, request, jsonify
from csp_solver import solve_sudoku, check_solution

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/log_gamestate', methods=['POST'])
def log_gamestate():
    game_state = request.json
    # Aqui é onde o "log" é impresso no console do servidor
    print("Estado do jogo recebido:")
    print(game_state)
    return jsonify({"status": "success", "message": "Estado do jogo registrado"}), 200

@app.route('/api/solve', methods=['POST'])
def solve_puzzle():
    data = request.json
    board = data.get('board')

    if not board:
        return jsonify({"status": "error", "message": "Nenhum tabuleiro fornecido"}), 400
    
    solution_steps = solve_sudoku(board)

    if solution_steps:
        return jsonify({"status": "success", "solution_steps": solution_steps})
    else:
        return jsonify({"status": "error", "message": "Nenhuma solução encontrada"})

@app.route('/api/check', methods=['POST'])
def check_puzzle():
    data = request.json
    board = data.get('board')

    if not board:
        return jsonify({"status": "error", "message": "Nenhum tabuleiro fornecido"}), 400

    if check_solution(board):
        return jsonify({"status": "success", "message": "Solução correta!"})
    else:
        return jsonify({"status": "error", "message": "Incorreto ou incompleto. Tente novamente."})


if __name__ == '__main__':
    app.run(port=7321, debug=True) 