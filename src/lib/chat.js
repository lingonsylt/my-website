import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const data = browser ? JSON.parse(window?.localStorage.getItem('chat') ?? '[]') : [];

export const chatStore = writable(data);

if (browser) {
	chatStore.subscribe((newData) => {
		window?.localStorage.setItem('chat', JSON.stringify(newData));
	});
}
