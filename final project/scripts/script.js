// Based on tic-tac-toe by Alex Reinking
String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

var turn = 0;
var lastCellClicked = -1;
var specturn = true;
var squareswon = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

// set up blank board
var board  = "";
for (var i = 0; i < 9; i++)
	board += "         ";


// Set player symbols
var players = ['X', 'O'];

var sym = 'Y';
while (sym !== 'X' && sym !== 'O') {
	sym = prompt("Let's play! Player 1, X or O?")
}

if (sym === 'O')
	players = ['O', 'X'];


// function to show the updated board on the HTML
function renderBoard() {
    $("#turn").html("Player "+(1+turn%2)+"'s turn");
    for(var i = 0; i < 81; i++) {
        $("#subcell"+i).html(board[i]);
    }
}

// functions to check if a square has been won ()
// start must be in column 1
function rowWon(start, board) {
    return (board[start] !== " " && board[start] === board[start+1] && board[start] === board[start+2]);
}

// start must be in row 1
function colWon(start, board) {
    return (board[start] !== " " && board[start] === board[start+3] && board[start] === board[start+6]);
}

// start must be upper left square
function diagWon(start, board) {
    if (board[start] !== " " && board[start] === board[start+4] && board[start] === board[start+8])
        return true;
    else
        return (board[start+2] !== " " && board[start+2] === board[start+4] && board[start+2] === board[start+6]);
}

// start must be upper left square
function squareWon(start, board) {
    var res = false;
    res = res || diagWon(start, board);
    for (var i = 0; i < 3; i++)
        res = res || (rowWon(start+3*i, board) || colWon(start+i, board));
    return res;
}



// begin gameplay once the window loads
$(function () {
    renderBoard();

    // update board when clicked
    $(".subcell").click(function(e) {
        // find ID of subcell clicked
    	var c = e.target.id;
        var subcellClicked = c[c.length-1];
    	if (c[c.length-2] !== 'l')
    		subcellClicked = c[c.length-2] + subcellClicked;
        subcellClicked = Number(subcellClicked);

        // check that subcell was empty and replace
        if (board[subcellClicked] === " " &&
        (specturn || (9*(lastCellClicked%9) <= subcellClicked && subcellClicked < 9*((lastCellClicked%9)+1)))) {
            board = board.replaceAt(subcellClicked, players[turn%2]);

            renderBoard();
            // see if this square has been won (it cannot have been won previously)
            if (squareswon[Math.floor(subcellClicked/9)] === " " && squareWon(subcellClicked-(subcellClicked%9), board))
                squareswon[Math.floor(subcellClicked/9)] = players[turn%2];

            // see if the game has been won and reset/exit
            if (squareWon(0, squareswon)) {
                alert("Game over! Player "+(1+(turn%2))+" has won.");
                if(confirm("Play again? 'OK' for yes, 'Cancel' for no")) {
                    board = "";
                    for (var i = 0; i < 9; i ++)
                        board += "         ";
                    turn = 0;
                    lastCellClicked = -1;
                    specturn = true;
                    squareswon = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
                }
                else
                    close();
            }


            // set special turn to be true only for the special case when one sub-board is entirely full
            specturn = true;
            for (var i = 9*(subcellClicked%9); i < 9*((subcellClicked%9)+1); i++) {
                if (board[i] === " ")
                    specturn = false;
            }

            // update variables to reflect this turn
            turn++;
            lastCellClicked = subcellClicked;
            console.log("this turn: "+squareWon(subcellClicked-(subcellClicked%9), board));
            console.log("squares claimed: ");
            console.log(squareswon);
        }

        renderBoard();
    });


});