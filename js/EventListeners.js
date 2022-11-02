addEventListener('mousemove', (e) => {
	// set mouse position when mouse is moved
	mouse.x = e.clientX;
	mouse.y = e.clientY;
});

// addEventListener('click', (e) => {
// });

addEventListener('mousedown', (e) => {
	if (player.shotDelayCount === 0) {
		player.shoot();
	}
});
