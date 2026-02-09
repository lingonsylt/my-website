<script>
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	async function generateLetter(x, y, seed) {
		return new Promise((resolve) => {
			const rand = pseudoRandom(x, y, seed);
			const char = chars[Math.floor(rand * chars.length)];
			resolve(char);
		});
	}
	function pseudoRandom(x, y, seed = 0) {
		// Convert inputs to 32-bit integers
		let n = (x * 374761393 + y * 668265263 + seed * 982451653) | 0;

		// Simple bit-mixing (32-bit)
		n = (n ^ (n >>> 13)) >>> 0;
		n = (n * 1274126177) >>> 0;
		n = n ^ (n >>> 16);

		// Return a float in [0, 1)
		return (n >>> 0) / 4294967296;
	}
	const GRID_SIZE = 8;
	let gridScroll = $state([0, 0]);
	let gridCells = $state([]);
	let currentSequence = $state([]);
	$effect(() => {
		if (gridScroll) {
			updateGrid();
		}
	});
	function updateGrid() {
		let newCells = [];
		for (let i = 0; i < GRID_SIZE; i++) {
			for (let j = 0; j < GRID_SIZE; j++) {
				newCells.push([i, j]);
			}
		}
		gridCells = newCells;
	}
</script>

<main>
	<div
		class="name-grid"
		onscroll={(e) => {
			gridScroll = [e.target.scrollX, e.target.scrollY];
		}}
	>
		{#each gridCells as cell (cell)}
			<div class="grid-cell" style="position: absolute; top: {cell[1] * 50}px;">
				{#await generateLetter(cell[0], cell[1])}
					<img src="" alt="" />
				{:then letter}
					<p>{letter}</p>
				{/await}
			</div>
		{/each}
	</div>
</main>

<style>
	main {
		margin: auto;
		width: 500px;
		height: 500px;
		background-color: lightblue;
	}
	.name-grid {
		position: relative;
		overflow: auto;
	}
	.grid-cell {
		position: absolute;
	}
</style>
