<script>
	import favicon from '$lib/assets/favicon.svg';
	let cardBackURL =
		'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.bKAWEVqJT2nep1zID5WtkgHaKX%3Fpid%3DApi&sp=1765802805T944a6c6f2d94512778e11dc415edcdd0b0244f235c4d7e93c3a997443de7e815';
	let cardPairs = [favicon];
	const card_count = 12;
	let cards = $state([]);
	for (let i = 0; i < card_count; i++) {
		cards.push({
			id: Math.floor(i / 2),
			image: favicon,
			flipped: false,
			matched: false
		});
	}
	let points = $state({
		blue: 0,
		red: 0
	});
	let turn = $state('blue');

	let cooldownActive = false;
	function getFlipped() {
		return cards.filter((c) => !c.matched && c.flipped);
	}

	function flip(i) {
		if (cooldownActive || cards[i].flipped || getFlipped().length > 2) {
			return;
		}
		cards[i].flipped = !cards[i].flipped;
		if (getFlipped().length != 2) {
			return;
		}
		let flippedCards = getFlipped();
		if (flippedCards[0].id == flippedCards[1].id) {
			flippedCards.forEach((c) => {
				c.matched = true;
			});
			points[turn]++;
		}
		cooldownActive = true;
		setTimeout(() => {
			cards.forEach((c) => {
				c.flipped = c.matched;
			});
			cooldownActive = false;
			turn = turn == 'blue' ? 'red' : 'blue';
		}, 1000);
	}
</script>

<h1>Memory</h1>
<main>
	{#each cards as card, i (card)}
		<div
			class="card"
			role="button"
			tabindex="0"
			class:flipped={card.flipped}
			onclick={() => {
				flip(i);
			}}
			onkeypress={(e) => {
				if (e.key == 'Enter') {
					flip(i);
				}
			}}
		>
			<img src={cardBackURL} alt="Baksida nr {i}" class="card-back" />
			<img src={card.image} alt="Kort nr {i}" class="card-front" />
		</div>
	{/each}
</main>
<aside class="blue-score">
	<p>{points.blue}</p>
</aside>
<aside class="red-score">
	<p>{points.red}</p>
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
		transition: transform 0.5s;
		transform-style: preserve-3d;
	}
	.card img {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
	}
	.card-front {
		transform: rotateY(180deg);
	}
	.flipped {
		transform: rotateY(180deg);
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
