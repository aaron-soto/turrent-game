class Player {
	constructor(config) {
		this.range = config.range;
		this.size = 25;
		this.shootSpeed = 7;
		this.projectiles = [];
		this.damage = 1;
		this.isShooting = false;
		this.shotDelay = 50;
		this.shotDelayCount = 0;

		damageValueText.innerHTML = this.damage;
	}

	draw() {
		this.drawPlayerRange();
		this.drawPlayerBody();
		this.drawProjectiles();

		// draw shooting cooldown indicator
		c.save();
		c.fillStyle = Colors.Grey;
		c.fillRect(screenCenter.x - 25, screenCenter.y - this.size - 15, 50, 5);
		c.fillStyle = Colors.Red;
		c.fillRect(
			screenCenter.x - 25,
			screenCenter.y - this.size - 15,
			this.shotDelayCount * (50 / this.shotDelay),
			5
		);
		c.restore();
	}

	update() {
		if (this.isShooting) {
			if (this.shotDelayCount < this.shotDelay) {
				this.shotDelayCount += 1;
			} else {
				this.isShooting = false;
				this.shotDelayCount = 0;
			}
		}
		this.updateProjectiles();
	}

	shoot() {
		this.isShooting = true;
		// Only shoot every 500 frames
		if (this.shotDelayCount === 0 || this.shotDelayCount >= this.shotDelay) {
			let angle = Math.atan2(
				mouse.y - canvas.height / 2,
				mouse.x - canvas.width / 2
			);
			let velocity = {
				x: Math.cos(angle) * this.shootSpeed,
				y: Math.sin(angle) * this.shootSpeed,
			};

			this.projectiles.push(
				new Projectile(
					screenCenter.x,
					screenCenter.y,
					5,
					Colors.White,
					velocity
				)
			);
		}
	}

	drawProjectiles() {
		this.projectiles.forEach((p) => p.draw());
	}

	updateProjectiles() {
		this.projectiles.forEach((p, idx) => {
			p.update();

			if (
				p.x - p.radius < 0 ||
				p.x - p.radius > canvas.width ||
				p.y + p.radius < 0 ||
				p.y - p.radius > canvas.height
			) {
				this.projectiles.splice(idx, 1);
			}
		});
	}

	drawPlayerBody() {
		c.save();

		c.shadowColor = Colors.Green;
		c.shadowBlur = 6;
		c.strokeStyle = Colors.Green;
		c.beginPath();
		c.moveTo(
			screenCenter.x + this.size * Math.cos(0),
			screenCenter.y + this.size * Math.sin(0)
		);
		for (let side = 0; side < 7; side++) {
			c.lineTo(
				screenCenter.x + this.size * Math.cos((side * 2 * Math.PI) / 6),
				screenCenter.y + this.size * Math.sin((side * 2 * Math.PI) / 6)
			);
		}
		c.stroke();

		c.strokeStyle = Colors.Green;
		c.beginPath();
		c.moveTo(
			screenCenter.x + this.size * Math.cos(0),
			screenCenter.y + this.size * Math.sin(0)
		);

		for (let side = 0; side < 7; side++) {
			c.lineTo(
				screenCenter.x + this.size * Math.cos((side * 2 * Math.PI) / 6),
				screenCenter.y + this.size * Math.sin((side * 2 * Math.PI) / 6)
			);
		}
		c.stroke();

		c.strokeStyle = Colors.White;
		c.lineWidth = 1.5;
		c.beginPath();
		c.moveTo(
			screenCenter.x + this.size * Math.cos(0),
			screenCenter.y + this.size * Math.sin(0)
		);

		for (let side = 0; side < 7; side++) {
			c.lineTo(
				screenCenter.x + this.size * Math.cos((side * 2 * Math.PI) / 6),
				screenCenter.y + this.size * Math.sin((side * 2 * Math.PI) / 6)
			);
		}
		c.stroke();

		c.restore();
	}

	drawPlayerRange() {
		c.save();
		c.strokeStyle = Colors.Grey;
		c.lineWidth = 3;
		c.beginPath();
		c.arc(
			window.innerWidth / 2,
			window.innerHeight / 2,
			this.range,
			0,
			Math.PI * 2
		);
		c.fillStyle = 'rgba(30, 34, 102, 0.2)';
		c.fill();
		c.stroke();

		c.restore();
	}
}
