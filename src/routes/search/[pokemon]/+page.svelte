<script>
	import { globalState } from '$lib/globalState.svelte';

	const { params, data } = $props();

	let pokemon = $derived(data.response);

	let sprites = $derived(
		Object.entries(pokemon.sprites)
			.map((sprite) => (typeof sprite[1] == 'string' ? { img: sprite[1], name: sprite[0] } : null))
			.filter((x) => x != null)
	);
	let currentSpriteIndex = $state(0);
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
			{#each sprites as sprite, i (sprite)}
				<img src={sprite.img} alt="Sprite [{sprite.name}]" />
			{/each}
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
		justify-content: space-between;
	}
	.image-display {
		position: relative;
		width: 50%;
	}
	.image-display img {
		position: absolute;
		width: 200px;
		background-color: gainsboro;
		border-radius: 10px;
		border: 2px solid black;
	}
</style>
