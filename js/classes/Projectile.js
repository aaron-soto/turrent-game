class Projectile {
	constructor(x, y, radius, color, velocity) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.velocity = velocity;
		this.damage = player.damage;
	}

	draw() {
		c.save();
		c.beginPath();
		c.fillStyle = this.color;
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fill();
		c.restore();
	}

	update() {
		this.x = this.x + this.velocity.x;
		this.y = this.y + this.velocity.y;
	}
}
