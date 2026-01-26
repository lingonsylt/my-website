import { pokeColors } from '$lib/pokeColors.js';
import { logSearch } from '$lib/searchHistory.svelte.js';
import { error } from '@sveltejs/kit';

export const ssr = false;
export const prerender = false;

export async function load({ params, fetch }) {
	const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + params.pokemon, {
		method: 'GET'
	});
	if (!response.ok) {
		throw error(response.status, { message: response.statusText });
	}
	let data = await response.json();

	let colors = data.types.map((t) => pokeColors[t.type.name]).flat();

	logSearch(params.pokemon, colors);
	return { response: data };
}
