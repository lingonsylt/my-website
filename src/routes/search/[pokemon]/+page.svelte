<script>
	let { data } = $props();
</script>

{#await data}
	<p>Searching the pokedex...</p>
{:then pokemon}
	<h1>{pokemon.response.name}</h1>
	<article>
		{#each Object.values(pokemon.response.sprites) as sprite, i (sprite)}
			{#if typeof sprite == 'string'}
				<img src={sprite} alt="Pokemon sprite {i + 1}" />
			{/if}
		{/each}
	</article>
	<section></section>
{/await}

<style>
	article {
		display: flex;
		flex-wrap: wrap;
		width: 90%;
		gap: 1em;
	}
</style>
