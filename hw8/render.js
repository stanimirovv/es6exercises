/*
 * Constants
 */
const attrX = 'data-x';
const attrY = 'data-y';

let game = new TicTacToeGame();

function initGameBoard() {
  // Add event listeners
  let gameBoard = document.getElementById('gameBoard');
  // Remove elements from last game, if any
  gameBoard.innerHTML = '';
  gameBoard.addEventListener('click', handlePressedButton);

  generateBoard(gameBoard);
}

function generateBoard(gameBoard){
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      console.log('Coordinates: ', i, ',', j); 
      let gameSquare = document.createElement("H1");
      gameSquare.setAttribute(attrX, i);
      gameSquare.setAttribute(attrY, j);
      gameSquare.className = 'square';
      gameSquare.innerHTML = '';
      gameBoard.appendChild(gameSquare);
    }
  }
}

function handlePressedButton(ev) {
  let square = ev.target;

  let x = square.getAttribute(attrX);
  let y = square.getAttribute(attrY);
  if (!x || !y) {
    console.log('Element is not playable field.');
    return;
  }

  const currentPlayer = game.getCurrentPlayerLabel();
  const roundStatus = game.playMove(x,y); 
  if ( roundStatus === null ) {
    return;
  }

  square.innerHTML = currentPlayer;

  if ( roundStatus.status === 'end' ) {
    alert(roundStatus.msg);
    initGameBoard();
  }
  console.log(game.board);
}
