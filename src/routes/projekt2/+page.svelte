<script>
	import { onMount } from 'svelte';
	import { linear, quadInOut, quadOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';

	let stones = $state([
		{
			id: 0,
			position: [new Tween(700, { easing: quadOut }), new Tween(0, { easing: quadOut })],
			color: 'blue'
		}
	]);

	let lastId = 0;

	let turn = $state('red');
	let gameState = $state('ready');

	let powerInput = new Tween(0, {
		duration: 1000,
		easing: linear
	});
	let angleInput = new Tween(-0.5, {
		duration: 1500,
		easing: quadInOut
	});
	let setAngle = 0;
	function angleLoop() {
		if (angleInput.target > 0) {
			angleInput.target = -0.5;
		} else {
			angleInput.target = 0.5;
		}
		setTimeout(angleLoop, 1500);
	}
	angleLoop();

	function shoot(power, angle) {
		let newId = lastId + 1;
		lastId++;
		stones.push({
			id: lastId + 1,
			position: [
				new Tween(250, { easing: quadOut, duration: 2000 }),
				new Tween(950, { easing: quadOut, duration: 2000 })
			],
			color: turn
		});
		stones[newId].position[0].target += power * Math.sin(angle);
		stones[newId].position[1].target -= power * Math.cos(angle);
	}
	onMount(() => {
		window.addEventListener('keydown', (e) => {
			if (e.key == ' ' && gameState == 'ready') {
				setAngle = angleInput.current;
				powerInput.target = 1500;
				gameState = 'charging';
			}
		});
		window.addEventListener('keyup', (e) => {
			if (e.key == ' ' && gameState == 'charging') {
				shoot(powerInput.current, setAngle);
				powerInput.target = 0;
				gameState = 'shooting';
				setTimeout(() => {
					gameState = 'ready';
					if (turn == 'blue') {
						turn = 'red';
					} else {
						turn = 'blue';
					}
				}, 1000);
			}
		});
	});
</script>

<div class="container">
	<div class="sheet">
		<div class="rings">
			<div class="ring r1">
				<div class="ring r2">
					<div class="ring r3">
						<div class="ring r4"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="stones">
			{#each stones as stone (stone.id)}
				<div
					class="stone"
					style="background-color: {stone.color}; top: {stone.position[1].current -
						25}px; left: {stone.position[0].current - 25}px;"
				></div>
			{/each}
			<div class="stone placeholder" style:background-color={turn}>
				{#if gameState == 'charging'}
					<div class="input power" style="height: {powerInput.current / 10}px"></div>
				{:else if gameState == 'ready'}
					<div class=" input angle" style="left: {angleInput.current * 100 + 10}px;"></div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.stones {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.stone {
		position: absolute;
		width: 50px;
		height: 50px;
		border-radius: 25px;
		border: 6px solid grey;
	}
	.placeholder {
		top: 925px;
		left: 225px;
	}
	.input {
		position: absolute;
		margin-bottom: 10px;
		bottom: 100%;
		background-color: black;
	}
	.power {
		position: absolute;
		width: 100%;
		left: 0;
	}
	.angle {
		position: absolute;
		width: 10px;
		height: 50px;
	}
	.sheet {
		margin: auto;
		height: 1000px;
		width: 500px;
		background-color: ghostwhite;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.rings {
		width: 500px;
		height: 500px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.ring {
		border-radius: 100%;
		padding: 50px;
	}
	.r1 {
		background-color: red;
	}
	.r2 {
		background-color: white;
	}
	.r3 {
		background-color: blue;
	}
	.r4 {
		background-color: white;
	}
</style>
