function Particle(obj) {
  this.x = obj.x || 0;
  this.y = obj.y || 0;
  this.angle = obj.angle || 0;
  this.speed = obj.speed || 5;
};

Particle.prototype.move = function() {
  
  this.x += this.speed * Math.cos(this.angle);
  this.y += this.speed * Math.sin(this.angle); 
  
};

