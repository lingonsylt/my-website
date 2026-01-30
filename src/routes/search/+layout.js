import { error } from '@sveltejs/kit';

export const ssr = false;
export const prerender = false;

export async function load({ params, fetch }) {
	const initiialResponse = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1', {
		method: 'GET'
	});
	if (!initiialResponse.ok) {
		throw error(initiialResponse.status, { message: initiialResponse.statusText });
	}
	const initialData = await initiialResponse.json();
	const availableCount = initialData.count;

	const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=' + availableCount, {
		method: 'GET'
	});
	if (!response.ok) {
		throw error(response.status, { message: response.statusText });
	}
	const data = await response.json();

	let available = data.results.map((p) => p.name);

	return { available };
}
