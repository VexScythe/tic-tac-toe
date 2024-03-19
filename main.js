const Player = (name, marker) => {
    return { name, marker };
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
  let currentPlayer;
  
  const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]              
  ];

  const startGame = () => {
    // Logic to start the game, initialize players, etc.
    // For simplicity, let's assume we have two players 'X' and 'O'
    currentPlayer = Player('Player 1', 'X');
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer.marker === 'X' ? Player('Player 2', 'O') : Player('Player 1', 'X');
  };

  const checkWinner = () => {
    const board = Gameboard.getBoard();
    for (let combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return currentPlayer; 
      }
    }

    if (board.every(cell => cell !== '')) {
      return 'tie'; 
    }

    return null; 
  };

  const playMove = (index) => {
    if (Gameboard.placeMarker(index, currentPlayer.marker)) {
      const winner = checkWinner();
      if (winner) {
        console.log(winner === 'tie' ? 'It\'s a tie!' : `${winner.name} wins!`);
      } else {
        switchPlayer();
      }
    } else {
      console.log('Spot already taken. Choose another spot.');
    }
  };



  return { startGame, playMove };
})();

