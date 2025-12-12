<script>
	import { fade } from 'svelte/transition';
	let colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
	let onlyEven = $state(false);
	let minSize = 3;
	let maxSize = 8;
	let gridSize = $state(4);
	let items = $state([]);
	$effect(() => {
		console.log('generating');
		let newItems = [];
		for (let i = 0; i < gridSize ** 2; i++) {
			newItems.push({
				index: i,
				color: colors[i % colors.length],
				marked: false
			});
		}
		items = newItems;
	});
</script>

<div class="option">
	<input bind:checked={onlyEven} type="checkbox" id="even-check" />
	<label for="even-check">Visa endast jämna nummer</label>
</div>
<div class="option">
	<label for="size-slider">Rutnätsstorlek: </label>
	<input bind:value={gridSize} type="range" min={minSize} max={maxSize} id="size-slider" />
	<p class="size-display">{gridSize}x{gridSize}</p>
</div>
<div class="option">
	<button
		onclick={() => {
			let newSize = gridSize;
			while (newSize == gridSize) {
				newSize = Math.floor(Math.random() * (maxSize - minSize)) + minSize;
			}
			gridSize = newSize;
		}}>Slumpa storlek</button
	>
</div>
<div
	class="grid"
	style="grid-template: repeat({onlyEven
		? Math.ceil(gridSize / 2)
		: gridSize}, 1fr) / repeat({gridSize}, 1fr);"
>
	{#each items as item, i (item.index)}
		{#if !onlyEven || (i + 1) % 2 == 0}
			<button
				class="{item.marked ? 'marked' : ''} item"
				onclick={() => {
					items[i].marked = !items[i].marked;
				}}
				style="background-color: {item.color}"
				transition:fade
			>
				{i + 1}
			</button>
		{/if}
	{/each}
</div>

<style>
	.option {
		margin: 10px;
	}
	.size-display {
		display: inline;
	}
	.grid {
		width: 80vw;
		height: 80vw;
		display: grid;
		grid-gap: 10px;
		padding: 10px;
		background-color: lightgrey;
		border-radius: 20px;
	}
	.item {
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		font-size: 1.5em;
		border: none;
		border-radius: 10px;
	}
	.marked {
		border: 2px solid black;
		filter: invert();
	}
</style>
