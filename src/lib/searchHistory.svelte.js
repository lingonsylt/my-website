import { browser } from '$app/environment';

const data = browser ? JSON.parse(window?.sessionStorage.getItem('searchHistory') ?? '[]') : [];

export let previousSearches = $state(data);

export function logSearch(query) {
	let index = previousSearches.findIndex((x) => x == query);
	if (index != -1) {
		previousSearches.splice(index, 1);
	}
	previousSearches.unshift(query);
	previousSearches.splice(-1, Math.max(0, previousSearches.length - 5));
	window?.sessionStorage.setItem('searchHistory', JSON.stringify(previousSearches));
}
