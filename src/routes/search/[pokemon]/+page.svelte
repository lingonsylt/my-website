<script>
	import { pokeColors } from '$lib/pokeColors.js';
	import { logSearch } from '$lib/searchHistory.svelte.js';

	const { data } = $props();

	console.log(data);

	let query = data.params.pokemon;
	let pokemon = data.response;

	let type = pokemon.types[0].type.name;

	logSearch(query, pokeColors[type]);
</script>

{#await data}
	Loading...
{:then data}
	<!-- Do something with the data -->
	<h1>{pokemon.name}</h1>
	<article>
		{#each Object.entries(pokemon.sprites) as sprite (sprite)}
			{#if typeof sprite[1] == 'string'}
				<img src={sprite[1]} alt="Sprite [{sprite[0]}]" />
			{/if}
		{/each}
	</article>
{/await}

<style>
	article {
		display: flex;
		flex-wrap: wrap;
		width: 90%;
		gap: 1em;
	}
</style>
