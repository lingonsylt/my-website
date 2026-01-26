<script>
	import { page } from '$app/stores';
</script>

<section>
	<h2>You searched for: {$page.params.pokemon}</h2>
	<hr />
	<h1>{$page.status}: {$page.error.message != '' ? $page.error.message : 'Not found'}</h1>
</section>
