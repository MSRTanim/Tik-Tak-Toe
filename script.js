document.addEventListener("DOMContentLoaded", () => {
    const startGameBtn = document.getElementById("start-game");
    const restartGameBtn = document.getElementById("restart-game");
    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");
    const player1Name = document.getElementById("player1-name");
    const player2Name = document.getElementById("player2-name");
    const statusDisplay = document.getElementById("status");
    const gameBoard = document.querySelector(".game-board");
    const cells = document.querySelectorAll(".cell");
    let currentPlayer = "X";
    let boardState = Array(9).fill(null);
    let isGameActive = true;
  
    const startGame = () => {
      const p1 = player1Input.value || "Player 1";
      const p2 = player2Input.value || "Player 2";
      player1Name.textContent = p1;
      player2Name.textContent = p2;
      document.querySelector(".player-entry").classList.add("hidden");
      gameBoard.classList.remove("hidden");
      statusDisplay.textContent = `${p1}'s turn (X)`;
    };
  
    const restartGame = () => {
      boardState = Array(9).fill(null);
      isGameActive = true;
      currentPlayer = "X";
      cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("win");
      });
      statusDisplay.textContent = `${player1Name.textContent}'s turn (X)`;
      restartGameBtn.classList.add("hidden");
    };
  
    const launchConfetti = () => {
      const duration = 2 * 1000; // 2 seconds
      const end = Date.now() + duration;
  
      const colors = ["#bb0000", "#ffffff", "#00bb00", "#0000bb"];
  
      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });
  
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    };
  
    const checkWinner = () => {
      const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
          cells[a].classList.add("win");
          cells[b].classList.add("win");
          cells[c].classList.add("win");
          isGameActive = false;
          statusDisplay.textContent = `${currentPlayer === "X" ? player1Name.textContent : player2Name.textContent} wins! 🎉`;
          restartGameBtn.classList.remove("hidden");
  
          // Trigger the confetti celebration
          launchConfetti();
  
          return true;
        }
      }
  
      if (!boardState.includes(null)) {
        isGameActive = false;
        statusDisplay.textContent = "It's a tie!";
        restartGameBtn.classList.remove("hidden");
        return true;
      }
  
      return false;
    };
  
    const handleCellClick = (e) => {
      const cell = e.target;
      const index = Array.from(cells).indexOf(cell);
  
      if (boardState[index] || !isGameActive) return;
  
      boardState[index] = currentPlayer;
      cell.textContent = currentPlayer;
  
      if (!checkWinner()) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.textContent = `${currentPlayer === "X" ? player1Name.textContent : player2Name.textContent}'s turn (${currentPlayer})`;
      }
    };
  
    startGameBtn.addEventListener("click", startGame);
    restartGameBtn.addEventListener("click", restartGame);
    cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
  });
  