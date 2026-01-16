<script>
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	function handleSearch(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const query = formData.get('query');
		goto(resolve('/search/' + query));
	}
</script>

<main>
	<form action="" onsubmit={handleSearch}>
		<input type="text" name="query" placeholder="Sök upp en pokemon" />
		<button type="submit">Search</button>
	</form>
	<slot></slot>
</main>
<div class="backdrop"></div>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 80vw;
		height: 80vh;
		background-color: rgba(255, 255, 255, 0.8);
		margin: 5vh auto;
		border-radius: 20px;
		border: 2px solid skyblue;
	}
	form {
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
