$(document).ready(function() {
	var speed = 2;
	var x = 100;
	var y = 100;
	var dir = 39;
	var w = $(window).width();
	var h = $(window).height();

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

		if (x < 0)
			x = x + w - $("#dot").width();
		if ((x + $("#dot").width) > w) {
			console.log("Here!");
			x = x - w + $("#dot").width();
		}
		if (y < 0)
			y = y + h - $("#dot").height();
		if ((y + $("#dot").height) > h)
			y = y - h + $("#dot").height();
		$("#dot").css({top: y, left: x});
	} // 0 --> 1314 1366

	$("#speed").click(function() {
		ns = 0;
		while (ns < 1 || ns > 10) {
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


  	$(window).keydown(function(e) {
  		if (e.which >= 37 && e.which <= 40)
    		dir = e.which;
  	});

	setInterval(
		function() {
    		updateDotPosition();
  			},
  		100);
});