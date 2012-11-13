var Paddle = function(obj){
	//private vars
	var ctx;
	var height, width;
	var x, y;
	
	//initialize private vars
	this.ctx = obj.ctx;
	this.height = obj.height || 100;
	this.width = obj.width || 10;
	this.x = obj.x || 15;
	this.y = obj.y || 15;
	
	//public getter and setters
	this.get_height = function(){ return this.height;};
	this.get_width = function(){ return this.width;};
	this.get_x = function(){ return this.x;};
	this.get_y = function(){ return this.y;};
	
	//public functions
	this.moveUp = function(){
		this.y -= 5;
	};
	
	this.moveDown = function(){
		this.y += 5;
	};
	
	this.draw = function(){
		this.ctx.beginPath();
		this.ctx.fillRect(this.x, this.y, this.width, this.height);
		this.ctx.closePath();
	};
	
	this.clear = function(){
		this.ctx.beginPath();
		this.ctx.fillStyle = '#fff';
		this.ctx.fillRect(this.x, 0, this.width, 300);
		this.ctx.closePath();
	};
};
