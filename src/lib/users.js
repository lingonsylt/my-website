import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const data = browser ? JSON.parse(window?.localStorage.getItem('users') ?? '[]') : [];

export const usersStore = writable(data);

usersStore.subscribe((newData) => {
	window?.localStorage.setItem('users', JSON.stringify(newData));
});
