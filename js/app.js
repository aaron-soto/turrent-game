const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

c.scale(2, 2);

let score = 0;
const scoreText = document.querySelector('#score');
scoreText.innerHTML = '0';

let currentWave = 0;
const waveText = document.querySelector('#wave');
waveText.innerHTML = currentWave + 1;

const damageValueText = document.querySelector('#damage-value');
const damageCostText = document.querySelector('#damage-cost');
const damageCostBtn = document.querySelector('#damage-cost-btn');

let damageCost = 5;
damageCostText.innerHTML = damageCost;

canvas.height = innerHeight;
canvas.width = innerWidth;

const player = new Player({ range: 250 });

damageCostBtn.addEventListener('click', (e) => {
	if (score >= damageCost) {
		score -= damageCost;

		player.damage += 1;
		damageValueText.innerHTML = player.damage;

		damageCost += 5;
		damageCostText.innerHTML = damageCost;
	}
});

const screenCenter = {
	x: window.innerWidth / 2,
	y: window.innerHeight / 2,
};

const mouse = {
	x: undefined,
	y: undefined,
	draw() {
		c.save();
		c.fillStyle = Colors.Red;
		c.beginPath();
		c.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
		c.fill();
		c.restore();
	},
};

let waveArr = [];
let particles = [];

waves.forEach((wave, idx) => {
	waveArr.push(
		new Wave(
			idx,
			wave.enemies,
			wave.enemyHealth,
			wave.enemyWorth,
			wave.enemySpeed,
			wave.enemyColor,
			wave.delay
		)
	);
});

waveArr[currentWave].startWave();

function animate() {
	requestAnimationFrame(animate);
	c.fillStyle = Colors.Black;
	c.fillRect(0, 0, window.innerWidth, window.innerHeight);

	// draw and update player and projectiles

	player.update();
	player.draw();
	mouse.draw();

	waveArr[currentWave].draw();
	waveArr[currentWave].update();

	updateParticles();
}

resizeCanvas();
animate();
