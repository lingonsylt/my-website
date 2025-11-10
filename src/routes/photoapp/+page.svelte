<script>
	/** @type {import('./$types').PageProps} */
	let { data } = $props();
</script>

<h1>Photoapp</h1>
<p>Denna sida innehåller <strong>fina</strong> bilder</p>

<div class="photos">
	<div class="img-wrap">
		<img src="https://i.redd.it/rofzm44oka091.png" alt="Flexbox egenskaper" />
	</div>
	<div class="img-wrap">
		<img src="https://i.redd.it/vd9dc7wfk9471.png" alt="Flexbok fuskblad" />
	</div>
	<div class="img-wrap">
		<img src="https://miro.medium.com/v2/resize:fit:1400/0*YeaUsQyhXSL1TCTH.png" alt="Fle" />
	</div>
</div>

<style>
	.photos {
		display: flex;
		max-width: 90vw;
		overflow: hidden;
		align-items: center;
		justify-content: center;
	}
	.img-wrap img {
		width: 100%;
	}
	.img-wrap {
		flex: 1;
	}
</style>
