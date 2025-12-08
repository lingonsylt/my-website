<script>
	import { fade } from 'svelte/transition';

	let varor = $state([
		{
			name: 'Exempelvara',
			köpt: false,
			priority: 0
		},
		{
			name: 'Köpt exempel',
			köpt: true,
			priority: 0
		}
	]);
	// let pendingSort = null;
	$effect(() => {
		varor.sort((a, b) => b.priority - a.priority);
		// console.log('effect');
		// let sorted = varor.toSorted((a, b) => b.priority - a.priority);
		// if (pendingSort) {
		// 	pendingSort.clearTimeout();
		// }
		// console.log('previous');
		// pendingSort = setTimeout(() => {
		// 	varor = sorted;
		// }, 1000);
		// console.log('done');
	});

	let input = $state('');
	function handleAdd(event) {
		event.preventDefault();
		if (input.trim() != '') {
			varor.push({
				name: input.trim(),
				köpt: false,
				priority: 0
			});
		}
		input = '';
	}
	function removeVara(i) {
		varor.splice(i, 1);
	}
	function moveVara(i) {
		varor[i].köpt = !varor[i].köpt;
	}
	function clear(targetState) {
		varor = varor.filter((vara) => vara.köpt != targetState);
	}
	function moveAll(newState) {
		for (let vara of varor) {
			vara.köpt = newState;
		}
	}
</script>

<main class="container">
	<h1>Shopping List</h1>
	<div class="categories-container">
		<section>
			<h2>Varör att köpa</h2>
			<div class="util-container">
				<button
					class="util-button"
					onclick={() => {
						clear(false);
					}}>Rensa</button
				>
				<button
					class="util-button"
					onclick={() => {
						moveAll(true);
					}}>Flytta alla ></button
				>
			</div>

			<ol>
				{#each varor as vara, i (vara)}
					{#if !vara.köpt}
						<li transition:fade>
							{vara.name}
							<input class="priority" type="number" bind:value={vara.priority} />
							<button
								onclick={() => {
									removeVara(i);
								}}>X</button
							>
							<button
								onclick={() => {
									moveVara(i);
								}}>></button
							>
						</li>
					{/if}
				{/each}
			</ol>
			<form class="input" onsubmit={handleAdd}>
				<label for="name-fielt">Lägg till vara</label>
				<input id="name-field" type="text" bind:value={input} />
				<button type="submit">+</button>
			</form>
		</section>
		<section>
			<h2>Köpta varor</h2>
			<div class="util-container">
				<button
					class="util-button"
					onclick={() => {
						moveAll(false);
					}}
				>
					{'< Flytta alla'}</button
				>
				<button
					class="util-button"
					onclick={() => {
						clear(true);
					}}>Rensa</button
				>
			</div>
			<ul>
				{#each varor as vara, i (vara)}
					{#if vara.köpt}
						<li transition:fade>
							{vara.name}
							<button
								onclick={() => {
									removeVara(i);
								}}>X</button
							>
							<button
								onclick={() => {
									moveVara(i);
								}}>{'<'}</button
							>
						</li>
					{/if}
				{/each}
			</ul>
		</section>
	</div>
</main>

<style>
	.container {
		display: grid;
		grid-template-rows: 1fr 9fr 1fr;
		margin: auto;
		background-color: darkred;
		width: 60vw;
		height: 70vh;
		border-radius: 20px;
	}
	.container h1 {
		justify-self: center;
		background-color: red;
		border-radius: 10px;
		padding: 10px;
	}
	.categories-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-column-gap: 10px;
		height: 100%;
		background-color: red;
	}
	.categories-container section {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.categories-container section:nth-child(odd) {
		background-color: rgba(0, 0, 0, 0.1);
	}
	.categories-container section:nth-child(even) {
		background-color: rgba(0, 0, 0, 0.3);
	}
	section h2 {
		background-color: rgba(0, 0, 0, 0.1);
		font-size: 1.5em;
		text-align: center;
		margin: 10px 0;
		padding: 5px 0;
	}
	ol,
	ul {
		height: 100%;
		padding: 0;
		list-style-position: inside;
	}
	li {
		margin: 0 10px;
		padding: 5px 10px;
	}
	li:not(:last-child) {
		border-bottom: 1px solid rgba(255, 255, 255, 0.3);
	}
	.input {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px;
	}
	.util-container {
		margin: auto;
	}
	.priority {
		width: 40px;
	}
</style>
