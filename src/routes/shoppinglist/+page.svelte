<main class="container">
	<h1>Shopping List</h1>
	<div class="categories-container"></div>
</main>

<style>
	.container {
		display: grid;
		grid-template-rows: 1fr 8fr 1fr;
		margin: auto;
		background-color: darkred;
		width: 60vw;
		height: 70vh;
		border-radius: 20px;
	}
	.container h1 {
		justify-self: center;
		align-self: center;
		background-color: red;
		border-radius: 10px;
		padding: 10px;
	}
	.categories-container {
		display: grid;
		height: 100%;
		background-color: red;
		border-radius: 10px;
	}
</style>
