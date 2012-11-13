<html>
	<head>
		<script src="ball.js"></script>
		<script src="paddle.js"></script>
		<script src="screen.js"></script>
	</head>
	<body>
		<canvas id='cv' height='300' width='300' style='border: solid black'>
			Canvas not available.
		</canvas>
		<script>
			var pg;
			
			window.onload = function(){
				var ctx = document.getElementById('cv').getContext('2d');
				var cv_width = 300;
				var cv_height = 300;
				
				pg = {
					'cv_width' : cv_width,
					'cv_height' : cv_height,
					'ctx' : ctx,
					'screen' : new Screen({
						'ctx' : ctx,
						'width' : cv_width,
						'height' : cv_height
					}),
					'ball' : new Ball({
						'ctx' : ctx,
						'dx' : 2,
						'dy' : 2
					}),
					'p1_paddle' : new Paddle({
						'ctx' : ctx
					}),
					'p2_paddle' : new Paddle({
						'ctx' : ctx,
						'x' : 275,
						'y' : 15
					})
				};
				
				setInterval(render_loop, 10);
				setInterval(logic_loop, 1);
			};
			
			window.onkeydown = function(event){
				event.preventDefault();
				var keyCode = event.which;
				switch(keyCode){
					case 38:
						pg.p2_paddle.moveUp();
					break;
					case 40:
						pg.p2_paddle.moveDown();
					break;
					case 81:
						pg.p1_paddle.moveUp();
					break;
					case 65:
					 	pg.p1_paddle.moveDown();
					break;
				}
			}
			
			var render_loop = function(){
				//clearing methods
				/*pg.ball.clear();
				pg.p1_paddle.clear();
				pg.p2_paddle.clear();*/
				
				pg.screen.clear();
				
				//drawing methods
				pg.ball.draw();
				pg.p1_paddle.draw();
				pg.p2_paddle.draw();
			};
			
			var logic_loop = function(){
				//game logic
				pg.ball.move({
					'width' : pg.cv_width,
					'height' : pg.cv_height
				});
				
				//handle ball-paddle collisions
				//player 1 paddle
				if(pg.ball.get_x() - pg.ball.get_radius() == pg.p1_paddle.get_x() + pg.p1_paddle.get_width() &&
				   pg.ball.get_y() + pg.ball.get_radius() > pg.p1_paddle.get_y() &&
				   pg.ball.get_y() - pg.ball.get_radius() < pg.p1_paddle.get_y() + pg.p1_paddle.get_height()){
					pg.ball.reverse_x();
				}
				
				//player 2 paddle
				if(pg.ball.get_x() == pg.p2_paddle.get_x() - pg.p2_paddle.get_width() &&
				   pg.ball.get_y() + pg.ball.get_radius() > pg.p2_paddle.get_y() &&
				   pg.ball.get_y() - pg.ball.get_radius() < pg.p2_paddle.get_y() + pg.p2_paddle.get_height()){
					pg.ball.reverse_x();
				}
			}
		</script>
	</body>
</html>