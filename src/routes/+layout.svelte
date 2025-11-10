<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<a href="/">Hem</a>
	<a href="/photoapp">Photoapp</a>
</nav>

{@render children?.()}
