class Enemy {
	constructor(x, y, width, damage, health, worth, velocity) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.damage = damage;
		this.health = health;
		this.color = Colors.Red;
		this.worth = worth;
		this.velocity = velocity;
	}

	draw() {
		c.save();
		c.strokeStyle = this.color;
		c.shadowColor = this.color;
		c.shadowBlur = 6;
		c.strokeRect(this.x, this.y, this.width, this.width);
		c.lineWidth = 1.5;
		c.strokeStyle = Colors.White;
		c.strokeRect(this.x, this.y, this.width, this.width);

		c.font = '15px Open Sans';
		c.textAlign = 'center';
		c.textBaseline = 'middle';
		c.fillStyle = Colors.White;
		c.fillText(this.health, this.x + this.width / 2, this.y + this.width / 2);
		c.restore();
	}

	update() {
		this.x = this.x + this.velocity.x;
		this.y = this.y + this.velocity.y;
	}

	hit(wave, damage, enemyIndex) {
		if (this.health <= damage) {
			for (let i = 0; i < 75; i++) {
				particles.push(
					new Particle(this.x + this.width / 2, this.y + this.width / 2)
				);
			}

			wave.enemies.splice(enemyIndex, 1);
			console.log('Enemy Killed');
			wave.enemiesKilled += 1;
			// deathMessages.push(new DeathMessage(this.x, this.y, this.worth));
			score += this.worth;
			scoreText.innerHTML = `${score}`;
		} else {
			this.health -= damage;
			for (let i = 0; i < 20; i++) {
				particles.push(
					new Particle(this.x + this.width / 2, this.y + this.width / 2)
				);
			}
		}
	}
}

class Wave {
	constructor(
		waveNumber,
		enemyCount,
		enemyHealth,
		enemyWorth,
		enemySpeed,
		delay
	) {
		this.waveNumber = waveNumber;
		this.enemyCount = enemyCount;
		this.enemyHealth = enemyHealth;
		this.enemyWorth = enemyWorth;
		this.enemySpeed = enemySpeed;
		this.delay = delay;
		this.enemiesKilled = 0;
		this.enemies = [];
	}

	startWave() {
		setRandomInterval(spawnEnemy, 1000, 4000, waveArr[currentWave].enemyCount);
	}

	draw() {
		this.enemies.forEach((e) => e.draw());
	}

	update() {
		this.enemies.forEach((e, eIdx) => {
			e.update();

			player.projectiles.forEach((projectile, projectileIndex) => {
				const distX = Math.abs(projectile.x - e.x - e.width / 2);
				const distY = Math.abs(projectile.y - e.y - e.width / 2);

				if (distX <= e.width / 2 && distY <= e.width / 2) {
					setTimeout(() => {
						player.projectiles.splice(projectileIndex, 1);
						e.hit(this, projectile.damage, eIdx);
					}, 0);
				}
			});
		});

		if (this.enemiesKilled === this.enemyCount) {
			currentWave = this.waveNumber += 1;
			waveText.innerHTML = currentWave + 1;

			setTimeout(() => {
				waveArr[currentWave].startWave();
			}, 3000);
		}
	}
}

const spawnEnemy = () => {
	let width = 30;
	let x;
	let y;
	let damage = 2;
	let health = waveArr[currentWave].enemyHealth;
	let worth = waveArr[currentWave].enemyWorth;

	if (Math.random() < 0.5) {
		x = Math.random() < 0.5 ? 0 - width : canvas.width + width;
		y = Math.random() * canvas.height;
	} else {
		x = Math.random() * canvas.width;
		y = Math.random() < 0.5 ? 0 - width : canvas.height + width;
	}
	const angle = Math.atan2(
		screenCenter.y - y - width / 2,
		screenCenter.x - x - width / 2
	);

	const velocity = {
		x: Math.cos(angle) * waveArr[currentWave].enemySpeed,
		y: Math.sin(angle) * waveArr[currentWave].enemySpeed,
	};

	waveArr[currentWave].enemies.push(
		new Enemy(x, y, width, damage, health, worth, velocity)
	);
};
