<script>
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { previousSearches } from '$lib/searchHistory.svelte';

	const { data, children } = $props();

	let inputActive = $state(true);
	let currentQuery = $state('');
	let availableQueries = $state(data.available);
	let searchPredictions = $derived(
		[
			...previousSearches.map((s) => s.query),
			...availableQueries.filter((q) => !previousSearches.some((p) => p.query == q))
		]
			.filter((q) => currentQuery == '' || q.includes(currentQuery))
			.toSorted((a, b) => a.indexOf(currentQuery) - b.indexOf(currentQuery))
	);

	function handleSearch(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const query = formData.get('query');
		if (query == '') {
			return;
		}
		let formattedQuery = query.toLowerCase();
		goto(resolve('/search/' + formattedQuery));
	}
</script>

<main>
	<form action="" onsubmit={handleSearch}>
		<input
			onfocus={() => (inputActive = true)}
			onblur={() => {
				inputActive = false;
			}}
			bind:value={currentQuery}
			type="text"
			name="query"
			placeholder="Sök upp en pokemon"
		/>
		<button type="submit">Search</button>
		{#if inputActive}
			<div class="predictions">
				{#each searchPredictions as query (query)}
					<button
						onclick={() => {
							goto(resolve('/search/' + query));
						}}>{query}</button
					>
				{/each}
			</div>
		{/if}
	</form>
	{@render children?.()}
	<footer>
		{#if previousSearches.length > 0}
			<h3>Previous Searches</h3>
		{/if}
		<div>
			{#each previousSearches as query (query)}
				<button
					onclick={() => {
						goto(resolve('/search/' + query.query));
					}}
					style="background: linear-gradient(120deg, {query.colors.join(',')});"
					>{query.query}</button
				>
			{/each}
		</div>
	</footer>
</main>
<div class="backdrop"></div>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		width: 80vw;
		height: 80vh;
		background-color: rgba(255, 255, 255, 0.8);
		margin: 5vh auto;
		border-radius: 20px;
		border: 2px solid skyblue;
	}
	form {
		position: relative;
		display: flex;
		margin: 10px;
		padding: 5px;
		gap: 5px;
		align-self: stretch;
		border-radius: 10px;
		background-color: rgba(0, 0, 0, 0.2);
	}
	form * {
		padding: 10px;
		border-radius: 5px;
		border: none;
		background-color: rgba(0, 0, 0, 0.3);
		font: inherit;
		font-size: 1em;
		color: white;
	}
	form input {
		width: 100%;
		transition: background-color 0.2s ease;
		outline: none;
	}
	form input:hover,
	form input:focus {
		background-color: rgba(0, 0, 0, 0.4);
	}
	form input::placeholder {
		color: gainsboro;
	}
	form button {
		background-color: rgba(0, 0, 0, 0.5);
		box-sizing: border-box;
		transition: transform 0.5s ease;
	}
	form button:hover {
		transform: scale(1.1);
	}
	form button:active {
		transition: transform 0.2s ease;
		transform: scale(0.9);
	}

	.predictions {
		position: absolute;
		top: 100%;
		left: 0;
		margin-top: 5px;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	footer {
		align-self: stretch;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin: 10px;
		gap: 5px;
		align-self: stretch;
	}
	footer h3 {
		margin: 0;
	}
	footer div {
		display: flex;
		gap: 10px;
	}
	footer button {
		padding: 0.5em;
		background-color: black;
		padding: 10px;
		border-radius: 10px;
		border: none;
		transition: transform 0.5s ease;
		color: white;
		font: inherit;
		text-decoration: none;
	}
	footer button:hover {
		transform: scale(1.1);
	}
	footer button:active {
		transition: transform 0.2s ease;
		transform: scale(0.9);
	}

	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
		width: 100vw;
		height: 100vh;
		background-image: url('https://imageio.forbes.com/specials-images/imageserve/604202ff091b6539cb90fcbc/The-backs-of-a-number-of-Pok-mon-cards-/960x0.jpg?format=jpg&width=960');
		background-size: cover;
		filter: blur(5px);
	}
</style>
