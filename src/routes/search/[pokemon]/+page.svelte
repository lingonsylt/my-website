<script>
	import { globalState } from '$lib/globalState.svelte';
	import chevronLeft from '$lib/assets/chevron-left.svg';
	import chevronRight from '$lib/assets/chevron-right.svg';

	const { params, data } = $props();

	let pokemon = $derived(data.response);

	let sprites = $derived(
		Object.entries(pokemon.sprites)
			.map((sprite) => (typeof sprite[1] == 'string' ? { img: sprite[1], name: sprite[0] } : null))
			.filter((x) => x != null)
	);
	let currentSpriteIndex = $state(0);
	$effect(() => {
		if (currentSpriteIndex < 0) {
			currentSpriteIndex = sprites.length - 1;
		} else if (currentSpriteIndex > sprites.length - 1) {
			currentSpriteIndex = 0;
		}
		globalState.highestSpriteZ = Math.max(sprites.length - currentSpriteIndex);
	});
	$inspect(pokemon);
</script>

{#if pokemon}
	{(globalState.titleText = params.pokemon ? '' : '')}
	<h1>{pokemon.name}</h1>
	<article>
		<div class="info-container">
			<h2>{pokemon.name}</h2>
			<p>ID: {pokemon.id}</p>
			<p>Weight: {pokemon.weight}kg?</p>
		</div>
		<div class="image-display">
			<div class="image-reel">
				{#each sprites as sprite, i (sprite)}
					<img
						class:current={i == currentSpriteIndex}
						src={sprite.img}
						alt="Sprite [{sprite.name}]"
						style="transform: scale({Math.abs(
							0.9 ** Math.abs(i - currentSpriteIndex)
						)}) translateX({30 * (i - currentSpriteIndex)}px); z-index: {sprites.length -
							Math.abs(i - currentSpriteIndex)}; opacity: {0.8 ** Math.abs(i - currentSpriteIndex)}"
					/>
				{/each}
			</div>
			<div class="reel-buttons">
				<button
					onclick={() => {
						currentSpriteIndex--;
					}}
				>
					<img src={chevronLeft} alt="" />
				</button>
				<button
					onclick={() => {
						currentSpriteIndex++;
					}}
				>
					<img src={chevronRight} alt="" />
				</button>
			</div>
		</div>
	</article>
{:else}
	<p>Search for a pokemon to see its information here!</p>
{/if}

<style>
	article {
		width: 90%;
		height: 100%;
		display: flex;
		gap: 200px;
	}
	.image-display {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.image-reel {
		position: relative;
		width: 200px;
		height: 200px;
		overflow: hidden;
		background-color: rgba(0, 0, 0, 0.4);
		border-radius: 10px;
	}
	.image-reel img {
		position: absolute;
		width: 200px;
		transition:
			transform 0.2s ease,
			opacity 0.2s ease;
	}
	.reel-buttons {
		display: flex;
		background-color: rgba(0, 0, 0, 0.4);
		gap: 50px;
		align-self: center;
		border-radius: 1em;
	}

	.reel-buttons button {
		background: none;
		border: none;
		padding: 0;
		border-radius: 1em;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		transition: background-color 0.2s ease;
	}
	.reel-buttons button:hover {
		background-color: rgba(0, 0, 0, 0.2);
	}
	.reel-buttons button:active {
		background-color: rgba(0, 0, 0, 0.4);
	}

	.reel-buttons button img {
		height: 2em;
	}
</style>
