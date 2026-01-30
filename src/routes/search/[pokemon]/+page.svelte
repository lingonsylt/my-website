<script>
	import { globalState } from '$lib/globalState.svelte';

	const { params, data } = $props();

	let pokemon = data.response;

	let sprites = $derived(
		Object.entries(pokemon.sprites).map((sprite) => {
			typeof sprite[1] == 'string' ? { img: sprite[1], name: sprite[0] } : null;
		})
	);
</script>

{#if pokemon}
	{(globalState.titleText = params.pokemon ? '' : '')}
	<h1>{pokemon.name}</h1>
	<article>
		{#each sprites as sprite (sprite)}
			<img src={sprite.img} alt="Sprite [{sprite.name}]" />
		{/each}
	</article>
	<div class="image-display"></div>
{/if}

<style>
	article {
		display: flex;
		flex-wrap: wrap;
		width: 90%;
		gap: 1em;
	}
</style>
