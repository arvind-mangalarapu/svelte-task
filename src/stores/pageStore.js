import { writable } from 'svelte/store';

// A writable store to manage the visibility of the full-page component
export const showFullPageStore = writable(false);
