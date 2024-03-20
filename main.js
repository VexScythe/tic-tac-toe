const Player = (name, marker) => {
    const changeName = () => this.name = name;

    return { name, marker, changeName };
};

const Gameboard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
  
    const getBoard = () => board;
  
    const placeMarker = (index, marker) => {
      if (board[index] === "") {
        board[index] = marker;
        console.log(getBoard())
        return true;
      } else {
        console.log(getBoard())
        return false;
      }
    };

    const resetBoard = () => {
      board = ['', '', '', '', '', '', '', '', ''];
    };
  
    return {
      getBoard,
      placeMarker,
      resetBoard
    };
})();

const GameState = (() => {
  let currentPlayer,
      gameIsOver = false;
  
  let board = Gameboard.getBoard();
  
  const player1Name = document.querySelector("#player1");
  const player2Name = document.querySelector("#player2");
  const startBtn = document.querySelector("#startgame");
  const cells = document.querySelectorAll('.cell');
  const playerTurn = document.getElementById("playerturn");
  const endScreen = document.querySelector(".displaywinner");
  const displayWinner = document.querySelector(".winner");
  const playAgainBtn = document.getElementById("playagain");

  const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]              
  ];

  startBtn.addEventListener ("click", () => {
    playerOne = Player(`${player1Name.value}`, `X`);
    playerTwo = Player(`${player2Name.value}`, `O`);
    startGame();
    player1Name.value = "";
    player2Name.value = "";
  },);

  playAgainBtn.addEventListener("click", () => {
    Gameboard.resetBoard();
    board = Gameboard.getBoard();
    gameIsOver = false;
    cells.forEach(cell => cell.textContent = "");
    endScreen.style.display = "none";
  });

  const startGame = () => {
    currentPlayer = playerOne;
    playerTurn.textContent = `It's ${playerOne.name} turn`
    cells.forEach((cell, index) => {
      cell.addEventListener('click', () => {
        if(!gameIsOver && cell.textContent === ""){
          cell.textContent = `${currentPlayer.marker}`;
          console.log(currentPlayer.marker);
          playMove(index);
        } else console.log("cell occupied")
      });
    });
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer.marker === 'X' ? playerTwo : playerOne;
    if(currentPlayer.marker === "X"){
      playerTurn.textContent = `It's ${playerOne.name} turn`
    } else playerTurn.textContent = `It's ${playerTwo.name} turn`
  };

  const checkWinner = () => {
    for (let combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        gameIsOver = true;
        endScreen.style.display = "flex";
        return currentPlayer; 
      }
    }

    if (board.every(cell => cell !== '')) {
      endScreen.style.display = "flex";
      return 'tie'; 
    }

    return null; 
  };

  const playMove = (index) => {
    if (Gameboard.placeMarker(index, currentPlayer.marker)) {
      const winner = checkWinner();
      if (winner) {
        displayWinner.textContent = (winner === 'tie' ? 'It\'s a tie!' : `${winner.name} wins!`);
      } else {
        switchPlayer();
      }
    } else {
      console.log('Spot already taken. Choose another spot.');
    }
  };

  return { startGame, playMove };
})();

