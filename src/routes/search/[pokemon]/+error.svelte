<script>
	import { page } from '$app/stores';
	console.log($page.error);
</script>

<section>
	<h2>You searched for: {$page.params.pokemon}</h2>
	<hr />
	<h1>{$page.status}: {$page.error.message}</h1>
</section>
