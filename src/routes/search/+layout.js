import { error } from '@sveltejs/kit';

export const ssr = false;
export const prerender = false;

export async function load({ params, fetch }) {
	const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=100', {
		method: 'GET'
	});
	if (!response.ok) {
		throw error(response.status, { message: response.statusText });
	}
	const data = await response.json();

	let available = data.results.map((p) => p.name);

	return { available };
}
