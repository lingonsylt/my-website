<script>
	let { data } = $props();
</script>

{#await data}
	<p>Searching the pokedex...</p>
{:then pokemon}
	<article>
		{#each Object.values(pokemon.response.sprites) as sprite, i (sprite)}
			{#if typeof sprite == 'string'}
				<img src={sprite} alt="Pokemon sprite {i + 1}" />
			{/if}
		{/each}
	</article>
	<h1>{pokemon.response.name}</h1>
	<section></section>
{/await}
