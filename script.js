

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const getBoard = () => board;
  const setBoard = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    }
    return false;
  };
  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };
  return { resetBoard, getBoard, setBoard };
})();

function Player(name, marker) {
  this.name = name;
  this.marker = marker;
}

const player1 = new Player("Player 1", "X");
const player2 = new Player("Player 2", "O");

const gameController = (() => {
  let currentPlayer = player1;
  let gameOver = false;
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWin = () => {
    const board = gameBoard.getBoard();
    return winningConditions.some((condition) => {
      const [a, b, c] = condition;
      return (
        board[a] === currentPlayer.marker &&
        board[b] === currentPlayer.marker &&
        board[c] === currentPlayer.marker
      );
    });
  };

  const checkTie = () => {
    const board = gameBoard.getBoard();
    return board.every((spot) => spot !== "");
  };

  const playRound = (index) => {
    const markerPlaced = gameBoard.setBoard(index, currentPlayer.marker);
    console.log(`Current board: ${gameBoard.getBoard()}`);
    

    if (gameOver) {
      console.log("Game is over. Please reset the game to play again.");
      const userConfirmed = window.confirm("Do you want to play again?");
      if (userConfirmed) {
        gameBoard.resetBoard();
        gameOver = false;
        return;
      }
    }
    if (!markerPlaced) {
      console.log("Spot already taken! Choose another spot.");
      return;
    }

    if (checkWin()) {
      gameOver = true;
      console.log(`${currentPlayer.name} wins!`);
    } else if (checkTie()) {
      gameOver = true;
      console.log("It's a tie!");
    } else {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
  };

  return {
    playRound,
  };
})();

//winning conditions
