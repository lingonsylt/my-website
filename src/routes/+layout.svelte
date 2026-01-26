<script>
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';
	import { globalState } from '$lib/globalState.svelte';

	let { children } = $props();

	let title = $derived((globalState.titleText ? `${globalState.titleText} • ` : '') + 'lingon');

	let links = [
		{
			name: 'Hem',
			path: '/'
		},
		{
			name: 'Photoapp',
			path: '/photoapp'
		},
		{
			name: 'Registera',
			path: '/register'
		},
		{
			name: 'Logga in',
			path: '/login'
		},
		{
			name: 'Shopping List',
			path: '/shoppinglist'
		},
		{
			name: 'Memory',
			path: '/memory'
		},
		{
			name: 'Chat',
			path: '/chat'
		},
		{
			name: 'Search',
			path: '/search'
		}
	];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
		rel="stylesheet"
	/>
	<title>{title}</title>
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

	:global(html) {
		width: 100vw;
		height: 100vh;
		margin: 0;
		padding: 0;
	}
	:global(body) {
		width: 100vw;
		height: 100vh;
		margin: 0;
		padding: 0;
		/*background-color: black;*/
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
		position: sticky;
	}
	.nav-link {
		margin: 10px;
		font-size: 1.5rem;
		text-decoration: none;
		color: black;
	}
</style>
