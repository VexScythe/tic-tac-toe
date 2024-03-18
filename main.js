const Player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker; 
    return {
      getName,
      getMarker
    };
};

const Gameboard = (() => {
    let board;
  
    const createBoard = () => {
        board = [];
        for (let i = 0; i < 3; i++){
            let row = [];
            for (let j = 0; j < 3; j++){
                row.push("");
            }
            board.push(row);
        }
    };
  
    const getBoard = () => board;
  
    const placeMarker = (row, col, marker) => {
      if (board[row][col] === "") {
        board[row][col] = marker;
        return true;
      } else {
        return false;
      }
    };

    const resetBoard = () => {
      createBoard();
    };
  
    createBoard();
  
    return {
      getBoard,
      placeMarker,
      resetBoard
    };
  })();
  