    class TicTacToeGame {
      constructor() {
        // constants
        this.emptyCell = 0;
        this.xVal = 1;
        this.oVal = 2;
        this.currentRound = 0;
    
        // init game
        this.board = [
                       [this.emptyCell,this.emptyCell,this.emptyCell],
                       [this.emptyCell,this.emptyCell,this.emptyCell],
                       [this.emptyCell,this.emptyCell,this.emptyCell]
                     ];
        this.currentPlayer = this.xVal;
      }

      playMove(x,y) {
         if ( this.board[x][y] != this.emptyCell ) {
           console.log('cell is not empty')
           return null;
         } 

         this.board[x][y] = this.currentPlayer;

         let endGameMsg = this.computeGameOver();
         if ( endGameMsg != null ) {
           return { status : 'end', msg: endGameMsg};
         }
         
         this.currentPlayer = this.currentPlayer === this.oVal ? this.xVal : this.oVal;
         return { status : 'ok'};
      } 

      computeGameOver() {
        if (this.computeGameOverPlayer( this.xVal )) {
            return 'Player X wins!';
        } 

        if (this.computeGameOverPlayer( this.oVal )) {
            return 'Player O wins!';
        } 
        this.currentRound++;
        if (this.currentRound === 9) {
          return "Cat's game!";
        }
        return null;    
      }

      computeGameOverPlayer(player) {
        // rows
        let isFirstRow = this.board[0][0] === player && this.board[0][1] === player && this.board[0][2] === player; 
        let isSecondRow = this.board[1][0] === player && this.board[1][1] === player && this.board[1][2] === player;
        let isThirdRow = this.board[2][0] === player && this.board[2][1] === player && this.board[2][2] === player;

        // columns
        let isFirstCol = this.board[0][0] === player && this.board[1][0] === player && this.board[2][0] === player; 
        let isSecondCol = this.board[0][1] === player && this.board[1][1] === player && this.board[2][1] === player;
        let isThirdCol = this.board[0][2] === player && this.board[1][2] === player && this.board[2][2] === player;

        // diagonals  
        let isFirstDiagonal = this.board[0][0] === player && this.board[1][1] === player && this.board[2][2] === player; 
        let isSecondDiagonal = this.board[0][2] === player && this.board[1][1] === player && this.board[2][0] === player; 

        let isRowWin = isFirstRow || isSecondRow || isThirdRow;
        let isColWin = isFirstCol || isSecondCol || isThirdCol;
        let isDiagonalWin = isFirstDiagonal || isSecondDiagonal;
        if (isRowWin || isColWin || isDiagonalWin) {
            return true;
        }
      }

      getCurrentPlayerLabel() {
         return this.currentPlayer === this.oVal ? '<span style="color:black"> O</span>' : '<span style="color:red"> X</span>';
      }
    }
