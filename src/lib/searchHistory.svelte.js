import { browser } from '$app/environment';

const data = browser ? JSON.parse(window?.sessionStorage.getItem('searchHistory') ?? '[]') : [];

export let previousSearches = $state(data);

export function logSearch(query, colors) {
	const searchLog = {
		query,
		colors
	};
	let index = previousSearches.findIndex((x) => x.query == query);
	if (index != -1) {
		previousSearches.splice(index, 1);
	}
	previousSearches.unshift(searchLog);
	previousSearches.splice(-1, Math.max(0, previousSearches.length - 5));
	window?.sessionStorage.setItem('searchHistory', JSON.stringify(previousSearches));
}
