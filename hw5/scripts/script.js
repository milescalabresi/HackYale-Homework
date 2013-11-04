var speed = 10;
var x = 100;
var y = 100;
var len = 1;
var dir = 39;
var score = 0;
var ht = 50;
var wd = 50;
var snake = [[50, 100], [0, 100]]; // the tail (the snake without the head) is represented as
                // a list of pairs of coordinates; the first pair is the
                // block closest to the head

function addToTail() {
    var x0, y0;
    var d = dir;
    if (snake.length === 0) {
        x0 = x;
        y0 = y;
    } else {
        x0 = snake[snake.length-1][0];
        y0 = snake[snake.length-1][1];
    }
    
    var effX = x0, effY = y0;
    if (snake.length > 1) {
        switch(snake[snake.length-1][0]-snake[snake.length-2][0]) {
            case wd: // snake WAS moving left
                d = 37;
                break;
            case -wd:
                d = 39;
                break;
            case 0:
                if ((snake[snake.length-1][1]-snake[snake.length-2][1]) > 0)
                    d = 38;
                else
                    d = 40;
                break;
            default:
                console.log("Error: bad difference", snake[snake.length-1][0]-snake[snake.length-2][0])
        }
    }
    switch(d) {
        case 37:
            effX += (wd-speed);
            break;
        case 38:
            effY += (ht-speed);
            break;
        case 39:
            effX -= (wd-speed);
            break;
        case 40:
            effY -= (ht-speed);
            break;
    }
    snake.push([effX, effY]);
}

$(document).ready(function() {
    var w = $(document).width();
    var h = $(document).height();
    
    // detect arrow keys pressed
    $(window).keydown(function(e) {
        if (e.which >= 37 && e.which <= 40)
            dir = e.which;
    });


    // change speed button
    $("#speed").click(function() {
        ns = 0;
        while (ns < 1 || ns > 10) {
            if (score !== 0) {
                alert("Can't update speed in the middle of a game.");
                break;
            }
            ns = prompt("What's the new speed? (1-10)");
            if (isNaN(ns))
                continue;
            else {
                ns = parseInt(ns);
                if (ns >= 1 && ns <= 10) {
                    speed = parseInt(ns);
                    break;
                }
            }
        }
    });


    // update the position of each section of the tail (if there are any)
    function updateTail(oldX, oldY) {

        for (var i = snake.length-1; i > 0; i++) {
            var effX = snake[i-1][0], effY = snake[i-1][1];
            switch(dir) {
                case 37:
                effX += (wd-speed);
                break;
                case 38:
                effY += (ht-speed);
                break;
                case 39:
                effX -= (wd-speed);
                break;
                case 40:
                effY -= (ht-speed);
                break;
            }
            snake[i] = [effX, effY];
        }

        if (snake.length > 0) {
            var effX = oldX, effY = oldY;
            snake.pop();
            switch(dir) {
                case 37:
                effX += (wd-speed);
                break;
                case 38:
                effY += (ht-speed);
                break;
                case 39:
                effX -= (wd-speed);
                break;
                case 40:
                effY -= (ht-speed);
                break;
            }
            snake.unshift([effX,effY]);
        }
    }

    // draw the tail (what's in the queue)
    function drawTail() {
        $(".tail").remove();
        for (var i = 0; i < snake.length; i++) {
            var div = $("<div class='tail'/>");
            div.css({left: snake[i][0], top: snake[i][1]});
            $("body").append(div);
        }
    }

    function updateDotPosition() {
        switch (dir) {
            case 37:
                x -= speed;
                break;
            case 38:
                y -= speed;
                break;
            case 39:
                x += speed;
                break;
            case 40:
                y += speed;
                break;
        }

        // Wrap around edges
        if (x < 0)
            x = x + w - wd;
        if ((x + wd) > w)
            x = x - w + wd;
        if (y < 0)
            y = y + h - ht;
        if ((y + ht) > h)
            y = y - h + ht;

        // update and draw position of the head
        $("#dot").css({left: x, top: y});
    }


    // check for self-collision (game over)
    function checkSelfCollision() {
        for (var i = 0; i < snake.length; i++) {
            if ((Math.abs(snake[i][0] - x) < wd) &&
                (Math.abs((snake[i][1] - y)) < ht)) {

                if(confirm("Game over! Your score is " + score + ".\nPlay again?")) {
                    snake = [];
                    x = 100;
                    y = 100;
                    score = 0;
                    location.reload();
                }
                else { // redundant for broswer compatability
                    close();
                    window.close();
                    self.close();
                    window.open('', '_self', '');
                    window.close();
                }

            }
        }
    }

    // increases score
    function eat() {
        // update food position (make sure it is away from the head)
        while ( (parseInt($("#food").css('left')) - x) < wd &&
                ((parseInt($("#food").css('top')) - y) < ht))   
            $("#food").css(
                {left: Math.random()*(w-parseInt($("#food").width())),
                 top: Math.random()*(h-parseInt($("#food").height()))});
        addToTail();
        score += speed;
    }


    // update the dot position continually
    setInterval(
        function() {
            document.getElementById("score").innerHTML = 'Score: '+ score;
            
            var oldX = x;
            var oldY = y;

            updateDotPosition();
            updateTail(oldX, oldY);
            drawTail();
            

            //checkSelfCollision();
            // check for collision with food and eat
            if ((Math.abs(parseInt($("#food").css('left')) - x) < 
                    parseInt(wd)) &&
                (Math.abs(parseInt($("#food").css('top' )) - y) <
                    parseInt(ht)))
                eat();
        },
        50);
});