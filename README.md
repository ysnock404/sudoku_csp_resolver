# Sudoku CSP Solver 🧩

Uma aplicação web elegante e interativa para jogar e resolver quebra-cabeças de Sudoku. Este projeto utiliza um resolvedor baseado em **Problema de Satisfação de Restrições (CSP)** com heurísticas otimizadas para encontrar soluções de forma eficiente, e demonstra o processo de resolução passo a passo.

![image](https://github.com/user-attachments/assets/ee4cb0bd-63d9-4b6e-8c12-759b34a093a1)

---

## ✨ Funcionalidades

- **Design Moderno**: Interface limpa, responsiva e agradável, construída com HTML e CSS.
- **Gerador de Quebra-Cabeças**: Crie novos jogos com três níveis de dificuldade: Fácil, Médio e Difícil.
- **Jogo Interativo**: Células editáveis permitem que o usuário insira seus próprios números para tentar resolver o jogo.
- **Verificador de Solução**: Um botão para verificar se a solução inserida pelo usuário está correta.
- **Resolvedor Inteligente (CSP)**:
  - Utiliza um algoritmo de **backtracking**.
  - Otimizado com a heurística **MRV (Minimum Remaining Values)** para selecionar a próxima célula a ser preenchida, tornando a busca mais rápida.
- **Animação Passo a Passo**: Visualize o algoritmo resolvendo o quebra-cabeça em tempo real, com uma animação que mostra cada passo da busca pela solução.
- **Backend com Flask**: Um servidor leve em Python (Flask) gerencia a lógica do jogo e a resolução.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**:
  - HTML5
  - CSS3 (com Variáveis CSS e Flexbox/Grid)
  - JavaScript (ES6+, Fetch API)
- **Backend**:
  - Python 3
  - Flask
- **Algoritmo**:
  - Problema de Satisfação de Restrições (CSP)
  - Backtracking com Heurística MRV

---

## 🚀 Como Executar Localmente

Siga os passos abaixo para rodar o projeto em sua máquina.

**Pré-requisitos:**
- Python 3.x instalado
- `pip` (gerenciador de pacotes do Python)

**1. Clone o Repositório**
```bash
git clone https://github.com/ysnock404/sudoku_csp_resolver.git
```

**2. Crie e Ative um Ambiente Virtual (Recomendado)**
```bash
# Para Linux/macOS
python3 -m venv venv
source venv/bin/activate

# Para Windows
python -m venv venv
.\\venv\\Scripts\\activate
```

**3. Instale as Dependências**
```bash
pip install -r requirements.txt
```

**4. Inicie o Servidor Flask**
```bash
python app.py
```

**5. Abra no Navegador**
O servidor estará rodando! Abra seu navegador e acesse:
[http://127.0.0.1:7321](http://127.0.0.1:7321)

---

## 📡 Endpoints da API

A aplicação utiliza uma API REST simples para a comunicação entre o frontend e o backend:

- `POST /api/log_gamestate`: Recebe o estado atual do tabuleiro e o registra no console do servidor.
- `POST /api/solve`: Recebe um tabuleiro e o resolve usando o algoritmo CSP, retornando todos os passos da solução.
- `POST /api/check`: Recebe um tabuleiro preenchido pelo usuário e verifica se a solução é válida.

---
*Feito com ❤️ por Santiago Paquete* 
