<script>
	import { globalState } from '$lib/globalState.svelte';

	const { params, data } = $props();
</script>

{#await data.response}
	Loading...
{:then pokemon}
	{(globalState.titleText = params.pokemon ? '' : '')}
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
