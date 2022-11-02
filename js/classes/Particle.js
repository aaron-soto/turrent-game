class Particle {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.xv = Math.random() * 5;
		this.yv = Math.random() * 5;
		this.size = randInt(1, 3, true);
		this.hue = 346;
		this.saturation = 100;
		this.lightness = 50;
		this.lightness2 = 100;
	}

	draw() {
		c.save();
		c.shadowBlur = 10;
		c.shadowColor = `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
		c.beginPath();
		c.arc(this.x, this.y, this.size, Math.PI * 2, 0, false);
		c.closePath();
		c.strokeStyle = `hsl(10, ${this.saturation}%, ${this.lightness2}%)`;
		c.stroke();
		// c.fillStyle = `hsl(10, ${this.saturation}%, ${this.lightness2}%)`;
		// c.fill();
		c.restore();
	}

	update() {
		this.draw();
		this.x += Math.random() * this.xv;
		this.y += Math.random() * this.yv;
		this.size -= 0.1;
		this.saturation -= 3;
		this.lightness -= 1.5;
		this.lightness2 -= 1.5;
	}
}

function updateParticles() {
	// Updates all particles
	particles.forEach((particle, index) => {
		if (particle.size <= 2) {
			particles.splice(index, 1);
		}
		particle.update();
	});
}
