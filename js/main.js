mit.main = function() {

	// rAF
	window.requestAnimationFrame = function() {
		return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		function(f) {
			window.setTimeout(f,1e3/60);
		}
	}();

  	// cAF
  	window.cancelAnimationFrame = function() {
  		return window.cancelAnimationFrame ||
  		window.webkitCancelAnimationFrame ||
  		window.mozCancelAnimationFrame ||
  		window.msCancelAnimationFrame ||
  		window.oCancelAnimationFrame ||
  		function(f) {
  			window.setTimeout(f,1e3/60);
  		}
  	}();

	/*
 	* GameMaster initiation
 	*/
	var gamemaster = new GameMaster();
	/*
	* Canvas Initiation
	*/
	
	var canvas = document.querySelector('#game_canvas');
	var ctx = canvas.getContext('2d');

	var ui = {
		body: $('body'),
	};

	var W = canvas.width = ui.body.width();
  	var H = canvas.height = ui.body.height();

	// Width x Height capped to 1000 x 500
	if (canvas.width > 1000) {
		W = canvas.width = 1000;
	}
	if (canvas.height > 500) {
		H = canvas.height = 500;
	}

	// Resizing Width/Height
	if (canvas.height < 500) {
		canvas.width = canvas.height * 1000/500;
	}
	if (canvas.width < 1000) {
		canvas.height = canvas.width * 500/1000;
	}

	(function() {
		gamemaster.initializeMenu();
	}());
//Check out the speed of rendering
//Should code the loader
	var stop = false;
	var frameCount = 0;
	var $results = $("#results");
	var fps, fpsInterval, startTime, now, then, elapsed;


	// initialize the timer variables and start the animation

	function startAnimating(fps) {
	    fpsInterval = 1000 / fps;
	    then = Date.now();
	    startTime = then;
	    animate();
	};

	function animate() {
	    // request another frame
	    requestAnimationFrame(animate);

	    // calc elapsed time since last loop
	    now = Date.now();
	    elapsed = now - then;

	    // if enough time has elapsed, draw the next frame
	    if (elapsed > fpsInterval) {

	        // Get ready for next frame by setting then=now, but also adjust for your
	        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
	        then = now - (elapsed % fpsInterval);

	        // Put your drawing code here
	        ctx.clearRect(0, 0, W, H);
			/*
			*	Update every object sprite
			*/

			if (gamemaster.gameState === 'Menu') {
				gamemaster.updateMenu(ctx);
			} else {
				gamemaster.updateGame(ctx);
			}
	    }
	};

	startAnimating(30);
}()