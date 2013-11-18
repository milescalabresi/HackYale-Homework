String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

var turn = 0;
var gameover = false;

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


// Define game over protocol
if(gameover) {
    alert(data.winner + ": " + data.message);
    board = "";
    for (var i = 0; i < 9; i ++)
    	board += "         ";
}


function renderBoard() {
    $("#turn").html("Player "+(1+turn%2)+"'s turn");
    for(var i = 0; i < 81; i++) {
        $("#subcell"+i).html(board[i]);
    }
}

// begin gameplay once the window loads
$(function () {
    renderBoard();
    // update board when clicked
    $(".subcell").click(function(e) {
    	var c = e.target.id;
        var subcellClicked = c[c.length-1];
    	if (c[c.length-2] !== 'l')
    		subcellClicked = c[c.length-2] + subcellClicked;
        board = board.replaceAt(Number(subcellClicked), players[turn%2]);
        turn++;
        renderBoard();
        //socket.emit('tictactoe', { board: board, cpu: opponent });
    });




});


