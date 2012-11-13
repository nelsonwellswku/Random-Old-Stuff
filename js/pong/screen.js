var Screen = function(obj){
	//private vars
	var ctx;
	var height, width;
	
	//initialize private vars
	this.ctx = obj.ctx;
	this.height = obj.height || 300;
	this.width = obj.width || 300;
	
	//public getter and setters
	this.get_ctx = function(){ return this.ctx;};
	this.get_height = function(){ return this.height;};
	this.get_width = function(){ return this.width;};
	
	//public functions
	this.clear = function(){
		var ctx = this.ctx;
		ctx.fillStyle = '#fff';
		ctx.fillRect(0, 0, this.get_width(), this.get_height());
	};
};
