import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const data = browser ? JSON.parse(window?.localStorage.getItem('users') ?? '[]') : [];

export const users = writable(data);

if (browser) {
	users.subscribe((newData) => {
		window?.localStorage.setItem('users', JSON.stringify(newData));
	});
}
