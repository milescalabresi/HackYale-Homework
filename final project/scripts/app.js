/* Borrowed in part from Alex Reinking with permission */
//io = require('socket.io').listen(5349);
//exec = require('child_process').exec;

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

function select(board, set) {
    var ret = "";
    for(var i in set) {
        ret += board[set[i]];
    }
    return ret;
}

function freq(str, ch) {
    var f = 0;
    for(var i = 0; i < str.length; i++)
        if(str[i] === ch)
            f++;
    return f;
}

function opponent(player) {
    return (player === 'X') ? 'O' : 'X';
}

var groups = [[0,1,2], [3,4,5], [6,7,8], //rows
              [0,3,6], [1,4,7], [2,5,8], //cols
              [0,4,8], [2,4,6]];         //diags

function possibleMoves(board) {
    var moves = [];
    for(var i = 0; i < board.length; i++)
        if(board[i] === ' ')
            moves.push(i);
    return moves;
}

function scoreForPlayer(board, player) {
    var score = 0;
    var opp = opponent(player);
    var none = ' ';

    for(var i = 0; i < groups.length; i++) {
        var group = select(board, groups[i]);
        if(freq(group, player) === 3) {
           score += 100;
        } else if(freq(group, player) === 2 && freq(group, none) === 1) {
           score += 10;
        } else if(freq(group, player) === 1 && freq(group, none) === 2) {
           score += 1;
        } else if(freq(group, opp) === 3) {
           score -= 100;
        } else if(freq(group, opp) === 2 && freq(group, none) === 1) {
           score -= 10;
        } else if(freq(group, opp) === 1 && freq(group, none) === 2) {
           score -= 1;
        }
    }

    return score;
}

function minimax(board, depth, player, me)
{
    var moves = possibleMoves(board);
    var bestScore = (player === me) ? -Infinity : Infinity;
    var currentScore;
    var bestPos = -1;
    
    if(moves.length === 0 || depth === 0) {
        bestScore = scoreForPlayer(board, me);
    } else {
        for(var i = 0; i < moves.length; i++) {
            board = board.replaceAt(moves[i], player);
            if(player === me) {
                currentScore = minimax(board, depth - 1, opponent(me), me).score;
                if(currentScore > bestScore) {
                    bestScore = currentScore;
                    bestPos = moves[i];
                }
            } else {
                currentScore = minimax(board, depth - 1, me, me).score;
                if(currentScore < bestScore) {
                    bestScore = currentScore;
                    bestPos = moves[i];
                }
            }
            board = board.replaceAt(moves[i], ' ');
        }
    }

    return { score: bestScore, move: bestPos };
}

/*socket.on('tictactoe', function(data) {
    var board = data.board;
    var player = data.cpu;

    if(/^[XO ]{9}$/.exec(board) == null) {
        socket.emit('error', { message: 'Invalid board "' + board + '"' });
        return;
    }

    var ai = minimax(board, 2, player, player);
    if(ai.move >= 0 && ai.move <= 8) {
        board = board.replaceAt(ai.move, player);
        socket.emit('move', { board: board, score: ai.score, start: data.spot });
    }
});*/

function move(board, player) {
    var ai = minimax(board, 2, player, player);
    if(ai.move >= 0 && ai.move <= 8) {
        board = board.replaceAt(ai.move, player);
    }
    return board

}