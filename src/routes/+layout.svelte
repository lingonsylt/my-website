<script>
	import favicon from '$lib/assets/favicon.svg';
	import { base, resolve } from '$app/paths';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<a href={resolve('/')}>Hem</a>
	<a href={resolve('/photoapp')}>Photoapp</a>
</nav>

{@render children?.()}
