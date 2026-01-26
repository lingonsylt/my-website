<script>
	const { data, params } = $props();

	console.log(data);

	let query = params.pokemon;
	let pokemon = data.response;

	console.log(query, pokemon);
</script>

{#await data.response}
	Loading...
{:then pokemon}
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
