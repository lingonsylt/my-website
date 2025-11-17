import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const userData = browser ? (window?.localStorage.getItem('users') ?? '') : '';

export const users = writable();
