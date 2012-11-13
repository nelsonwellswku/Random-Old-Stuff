function Burst(obj) {
  var obj = obj || {};
  this.num_particles = obj.num_particles || 10;
  this.particles = [];

  for (var i = 0; i <= this.num_particles; i++) {
    this.particles.push(new Particle
      ({
        x: obj.x || 0,
        y: obj.y || 0,
        angle: i * (360 / this.num_particles)
      })
    ); 
  }
}

Burst.prototype.run = function(ctx) {
  var i = 0;
  particles = this.particles;
  draw = this.draw;
  var step = function() {
    for each (var particle in particles) {
      particle.move(); 
    }
    i++;

    if(i == 20) {
      clearInterval(int_id);
    }

    draw(ctx);

    if(i == 20) {
      ctx.clearRect(0, 0, 800, 600);
    }
  };

  var int_id = setInterval(step, 10);
};

Burst.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, 800, 600);
  ctx.fillStyle = "rgb(125,125,125)";
  for each ( var particle in this.particles) {
    console.log("Filling rect with x = " + particle.x + " and y = " + particle.y);
    ctx.fillRect(particle.x, particle.y, 5, 5);
  } 
};
