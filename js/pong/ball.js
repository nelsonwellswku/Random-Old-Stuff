var Ball = function(obj) {
	//private vars
	var ctx;
	var x, y;
	var dx, dy;
	var radius;
	
	//initialize private vars
	this.ctx = obj.ctx;
	this.x = obj.x || 75;
	this.y = obj.y || 75;
	this.dx = obj.dx || 5;
	this.dy = obj.dy || 5;
	this.radius = obj.radius || 10;
	
	//public getter and setters
	this.get_x = function(){ return this.x;};
	this.get_y = function(){ return this.y;};
	this.get_radius = function(){ return this.radius;};
	this.get_ctx = function(){ return this.ctx;};
	
	//public functions
	this.move = function(obj){
		if(this.x - this.radius  <= 0 || this.x + this.radius >= obj.width ){
			//this.reverse_x();
			this.x = 75;
			this.y = 75;
		}
		
		if(this.y - this.radius <= 0 || this.y + this.radius >= obj.height ){
			this.reverse_y();
		}
		
		this.x += this.dx;
		this.y += this.dy;
	};
	
	this.reverse_x = function(){
		this.dx = -this.dx;
	};
	
	this.reverse_y = function(){
		this.dy = -this.dy;
	};
	
	this.clear = function(){
		var ctx = this.ctx;

		//draw the circle
		ctx.beginPath();
		ctx.fillStyle = '#fff';
		ctx.arc(this.get_x(), this.get_y(), this.get_radius() + 1, Math.PI*2, 0, true);
		ctx.closePath();
		ctx.fill();
	};
	
	this.draw = function(){
		var ctx = this.ctx;

		//draw the circle
		ctx.beginPath();
		ctx.fillStyle = '#000';
		ctx.arc(this.get_x(), this.get_y(), this.get_radius(), Math.PI*2, 0, true);
		ctx.closePath();
		ctx.fill();
	};
};
