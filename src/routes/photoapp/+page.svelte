<script>
	let images = [
		'https://picsum.photos/id/70/367/267',
		'https://picsum.photos/id/88/367/267',
		'https://picsum.photos/id/93/367/267'
	];
</script>

<h1>Photoapp</h1>
<p>Denna sida innehåller <strong>fina</strong> bilder</p>

<div class="photos">
	{#each images as image, i (image)}
		<div class="img-wrap">
			<img src={image} alt="Photo {i + 1}" />
		</div>
	{/each}
</div>

<style>
	.photos {
		display: flex;
		overflow: hidden;
		justify-content: center;
		flex-wrap: wrap;
		border-radius: 30px;
		margin: 20px;
		padding: 10px;
		max-width: 90vw;
		background: gainsboro;
	}
	.img-wrap img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 20px;
		border: 2px solid white;
		box-shadow: 4px 8px 10px rgba(0, 0, 0, 0.2);
	}
	.img-wrap {
		flex-grow: 1;
		flex-basis: 300px;
		height: 20vw;
		margin: 10px;
		transition: flex-grow 0.5s;
	}
	.img-wrap:hover {
		flex-grow: 2;
	}
	.img-wrap:active {
		transform: scale(0.9);
	}
	h1 {
		text-align: center;
		font-size: 50px;
		margin: 20px;
		color: mediumseagreen;
	}
</style>
