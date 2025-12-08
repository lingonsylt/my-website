<script>
	import favicon from '$lib/assets/favicon.svg';
	const card_count = 12;
	let cards = [];
	for (let i = 0; i < card_count; i++) {
		cards.push({
			image: favicon,
			flipped: false,
			matched: false
		});
	}

	let bluePoints = $state(0);
	let redPoints = $state(0);
	let turn = 'blue';
</script>

<h1>Memory</h1>
<main>
	{#each cards as card, i (card)}
		<div class="card">
			<img src={card.image} alt="Kort nr {i}" class="card-img" />
			<img src={card.image} alt="Baksida nr {i}" class="card-back" />
		</div>
	{/each}
</main>
<aside class="blue-score">
	<p>{bluePoints}</p>
</aside>
<aside class="red-score">
	<p>{redPoints}</p>
</aside>
<aside class="turn-indicator {turn}-score"></aside>

<style>
	main {
		display: grid;
		grid-template: repeat(4, 100px) / repeat(3, 100px);
	}
	.card {
		position: relative;
		border: 1px solid black;
	}
	img {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	aside {
		width: 100px;
		height: 100px;
		position: fixed;
		bottom: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.blue-score {
		left: 10px;
		background-color: blue;
	}
	.red-score {
		right: 10px;
		background-color: red;
	}
	p {
		font-size: 30px;
	}
	.turn-indicator {
		background: none;
		box-shadow: 0 0 10px 10px yellowgreen;
		z-index: -1;
	}
</style>
