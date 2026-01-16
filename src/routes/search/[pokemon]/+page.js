import { error } from '@sveltejs/kit';

export const ssr = false;
export const prerender = false;

export async function load({ params, fetch }) {
	const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + params.pokemon, {
		method: 'GET'
	});
	if (response.status != 200) {
		throw error(response.status, { message: response.statusText });
	}
}
