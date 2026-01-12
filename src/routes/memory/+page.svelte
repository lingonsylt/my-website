<script>
	const pair_count = 6;
	let cardBackURL = 'https://i.pinimg.com/originals/79/21/66/792166a01d9f4024b4eb51ae51b0b185.jpg';
	let cards = $state([]);
	let points = $state({
		blue: 0,
		red: 0
	});
	let turn = $state('');
	let gameState = $state('');

	let cooldownActive = $state(false);
	let gameCount = $state(-1);

	function newGame() {
		gameCount++;
		let newCards = [];
		for (let i = 0; i < pair_count; i++) {
			let randomImg = 'https://picsum.photos/200?random=' + gameCount * pair_count + i;
			newCards.push({
				id: i,
				image: randomImg,
				flipped: false,
				matched: false
			});
			newCards.push({
				id: i,
				image: randomImg,
				flipped: false,
				matched: false
			});
		}
		newCards.sort(() => Math.random() - 0.5);
		cards = newCards;
		points = {
			blue: 0,
			red: 0
		};
		turn = ['blue', 'red'][gameCount % 2];
		gameState = `It is ${turn[0].toUpperCase() + turn.slice(1)}'s turn`;

		cooldownActive = false;
	}
	newGame();

	function getFlipped() {
		return cards.filter((c) => !c.matched && c.flipped);
	}
	function getALlFlipped() {
		return cards.filter((c) => c.flipped);
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
			if (getALlFlipped().length == cards.length) {
				if (points.red > points.blue) {
					gameState = 'Red has won!';
				} else if (points.red < points.blue) {
					gameState = 'Blue has won!';
				} else {
					gameState = 'It is a draw!';
				}
			}
			return;
		}
		cooldownActive = true;
		setTimeout(() => {
			if (!cooldownActive) {
				return;
			}
			cards.forEach((c) => {
				c.flipped = c.matched;
			});
			cooldownActive = false;
			turn = turn == 'blue' ? 'red' : 'blue';
			gameState = `It is ${turn[0].toUpperCase() + turn.slice(1)}'s turn`;
		}, 1000);
	}
</script>

<div class="container">
	<main>
		<h1>Memory</h1>
		<p class="game-state">{gameState}</p>
		<div class="card-grid">
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
		</div>
		<div class="menu-bar">
			<button class="restart-button" onclick={newGame}
				>{gameState == '' ? 'Restart' : 'New Game'}</button
			>
		</div>
	</main>
</div>
<aside class="blue-score">
	<p>{points.blue}</p>
</aside>
<aside class="red-score">
	<p>{points.red}</p>
</aside>
<aside class="turn-indicator {turn}-score"></aside>

<style>
	.container {
		display: flex;
		justify-content: center;
	}
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		background-color: darkslategray;
		margin: 10px;
		padding: 10px;
		gap: 5px;
		border-radius: 20px;
	}
	h1 {
		margin-bottom: 0;
	}
	.game-state {
		font-size: 1em;
		margin: 10px;
	}
	@media (max-width: 500px) {
		.card-grid {
			grid-template: repeat(2, 100px) / repeat(6, 100px);
		}
	}
	@media (min-width: 500px) {
		.card-grid {
			grid-template: repeat(3, 100px) / repeat(4, 100px);
		}
	}
	.card-grid {
		display: grid;
		grid-gap: 5px;
	}
	.card {
		--rotation: 0deg;
		--scale: 1;
		position: relative;
		border: 1px solid black;
		transform: scale(var(--scale)) rotateY(var(--rotation));
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
		--rotation: 180deg;
	}
	.card:hover {
		z-index: 1;
		--scale: 1.1;
	}

	.menu-bar {
		display: flex;
		justify-content: center;
		padding: 5px;
	}
	.menu-bar * {
		border: none;
		border-radius: 5px;
		height: 35px;
	}
	.menu-bar button {
		background-color: slategray;
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
