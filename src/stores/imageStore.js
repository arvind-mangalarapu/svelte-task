// src/stores/imageStore.js
import { writable } from 'svelte/store';

export const imageStore = writable({
	images: {
		img1: { src: 'images/close.svg', alt: 'plus icon' },
		img2: { src: 'images/delete.svg', alt: 'file icon' },
		img3: { src: 'images/file.svg', alt: 'product icon' },
		img4: { src: 'images/info.svg', alt: 'info icon' },
		img5: { src: 'images/plus.svg', alt: 'delete icon' },
		img6: { src: 'images/product.svg', alt: 'edit icon' }
	}
});

// Function to update a specific image by key
export function updateImage(key, newSrc, newAlt) {
	imageStore.update((store) => {
		store.images[key] = { src: newSrc, alt: newAlt };
		return store;
	});
}
