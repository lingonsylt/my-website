<script>
	import { onMount } from 'svelte';
	import { linear } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ';
	const GRID_SIZE = 7;
	let SEED = $state(1);

	function newSeed() {
		SEED++;
	}

	let gridScroll = $state({ x: 0, y: 0 });
	let gridCells = $state([]);
	let selectedCells = $state([]);
	let currentWord = $derived(selectedCells.map((cell) => cell.char).join(''));
	let drawing = $state(false);

	function pseudoRandom(x, y, seed = 0) {
		let n = (x * 374761393 + y * 668265263 + seed * 982451653) | 0;
		n = (n ^ (n >>> 13)) >>> 0;
		n = (n * 1274126177) >>> 0;
		n = n ^ (n >>> 16);
		return (n >>> 0) / 4294967296;
	}

	function generateLetter(x, y) {
		const rand = pseudoRandom(x, y, SEED);
		return chars[Math.floor(rand * chars.length)];
	}

	function updateGrid() {
		const newCells = [];
		for (let row = 0; row < GRID_SIZE; row++) {
			for (let col = 0; col < GRID_SIZE; col++) {
				const worldX = col + gridScroll.x;
				const worldY = row + gridScroll.y;

				newCells.push({
					x: worldX,
					y: worldY,
					char: generateLetter(worldX, worldY)
				});
			}
		}
		gridCells = newCells;
	}

	$effect(() => {
		if (SEED && gridScroll) updateGrid();
	});

	function moveGrid(dx, dy) {
		gridScroll = {
			x: gridScroll.x + dx,
			y: gridScroll.y + dy
		};
	}

	// Start drawing a word
	function startDrawing(cell) {
		drawing = true;
		selectedCells = [cell];
	}

	// Extend drawing (only allow neighbors: 8 directions)
	function extendDrawing(cell) {
		if (!drawing) return;
		const last = selectedCells[selectedCells.length - 1];
		const dx = Math.abs(cell.x - last.x);
		const dy = Math.abs(cell.y - last.y);

		// Only allow straight or diagonal neighbor
		if (dx <= 1 && dy <= 1 && !selectedCells.find((c) => c.x === cell.x && c.y === cell.y)) {
			selectedCells.push(cell);
		}
	}

	// Finish drawing
	function endDrawing() {
		drawing = false;
		console.log('Word drawn:', currentWord);
	}

	onMount(() => {
		window.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowUp') moveGrid(0, -1);
			if (e.key === 'ArrowDown') moveGrid(0, 1);
			if (e.key === 'ArrowLeft') moveGrid(-1, 0);
			if (e.key === 'ArrowRight') moveGrid(1, 0);
			if (e.key === ' ' && skillCheckActive) {
				e.preventDefault();
				checkSkillCheck();
			}
		});
	});

	const LINE_DURATION = 750;
	const HIT_SIZE = 0.1;
	let skillCheckActive = $state(false);
	let linePosition = tweened(0, {
		duration: LINE_DURATION,
		easing: linear
	});

	function runSkillCheck() {
		if (skillCheckActive) return;
		if (currentWord == '') {
			alert('Enter a name');
			return;
		}
		skillCheckActive = true;
		linePosition.set(1);
		setTimeout(() => {
			linePosition.set(0);
			if (skillCheckActive) {
				failSkillCheck();
			}
		}, LINE_DURATION);
	}
	function checkSkillCheck() {
		console.log($linePosition);
		if (Math.abs(0.5 - $linePosition) <= HIT_SIZE / 2) {
			skillCheckActive = false;
			alert('Logged in as' + currentWord);
		} else {
			failSkillCheck();
		}
	}
	function failSkillCheck() {
		skillCheckActive = false;
		selectedCells = [];
		newSeed();
	}
</script>

<main>
	<h1>Login</h1>
	<section>
		<h2>Username: {currentWord}</h2>
		<p>[{gridScroll.x},{gridScroll.y}]</p>
		<div class="name-grid">
			{#each gridCells as cell (cell.x + ',' + cell.y)}
				<button
					class="grid-cell"
					class:selected={selectedCells.find((c) => c.x === cell.x && c.y === cell.y)}
					onmousedown={() => startDrawing(cell)}
					onmouseenter={() => extendDrawing(cell)}
					onmouseup={endDrawing}
				>
					{cell.char}
				</button>
			{/each}
		</div>
	</section>
	<button class="login" onclick={runSkillCheck}>Login</button>
</main>
{#if skillCheckActive}
	<div class="skill-check-container">
		<div class="skill-check">
			<div class="hit" style="width: {HIT_SIZE * 100}%;"></div>
			<div class="line" style="left: {$linePosition * 100}%;"></div>
		</div>
	</div>
{/if}

<style>
	main {
		margin: auto;
		background-color: lightgrey;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 2em;
		padding: 2em;
		gap: 2em;
		max-width: 800px;
	}
	.name-grid {
		position: relative;
		display: grid;
		grid-template: repeat(7, 40px) / repeat(7, 40px);
		grid-gap: 10px;
		user-select: none;
	}
	.grid-cell {
		background: none;
		border: none;
		font: inherit;
		font-size: 1.5em;
	}
	.grid-cell.selected {
		background-color: yellow;
		border-radius: 25px;
		text-align: center;
	}
	.login {
		width: 100%;
		height: 50px;
	}
	.skill-check-container {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.skill-check {
		position: relative;
		background-color: white;
		display: flex;
		justify-content: center;
		background-color: darkslategrey;
		height: 100px;
		width: 500px;
	}
	.skill-check .hit {
		background-color: green;
	}
	.skill-check .line {
		position: absolute;
		top: -10%;
		width: 5px;
		bottom: -10%;
		background-color: white;
	}
</style>
