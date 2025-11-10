<script>
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';

	let { children } = $props();

	let links = [
		{
			name: 'Hem',
			path: '/'
		},
		{
			name: 'Photoapp',
			path: '/photoapp'
		}
	];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<nav>
	{#each links as link (link.path)}
		<a class="nav-link" href={resolve(link.path)}>{link.name}</a>
	{/each}
</nav>

{@render children?.()}

<style>
	:global(*) {
		box-sizing: border-box;
	}
	:global(body) {
		margin: 0;
		padding: 0;
		font-family:
			'Inter',
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			sans-serif;
	}
	nav {
		background: gainsboro;
		padding: 5px;
	}
	.nav-link {
		margin: 5px;
		font-size: 1.5rem;
		text-decoration: none;
		color: black;
	}
</style>
