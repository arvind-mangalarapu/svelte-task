<script lang="ts">
	import AddDirectory from './AddDirectory.svelte';
	import { LABELS } from '../../constants/labels.js';
	import { imageStore } from '../../stores/imageStore.js';
	import { showPopup } from '../../stores/showPopup.js';
	import { onDestroy } from 'svelte';
	import Button from './Button.svelte';
	import DirectoryFolder from './DirectoryFolder.svelte';

	let images = {};
	const imageKey = 'img5';

	// Subscribe to imageStore to get images
	const unsubscribe = imageStore.subscribe((value) => {
		images = value.images;
	});

	// Clean up subscription when the component is destroyed
	onDestroy(() => {
		unsubscribe();
	});

	// Select the image based on the key
	const selectedImage = images[imageKey] || { src: '', alt: '' };

	// Function to toggle the popup visibility
	function togglePopup() {
		showPopup.update((current) => !current);
	}

	let directories = [];
	let count = 0;

	function handleAddDirectory(name: string, type: string) {
		if (type === LABELS.DIRECTORY) {
			count += 1;
			directories = [...directories, `Directory ${String.fromCharCode(64 + count)}`];
		}
	}

	// Close popup and add directory
	function closeAndAddDirectory(name: string, type: string) {
		handleAddDirectory(name, type);
		showPopup.set(false);
	}
</script>

<main class="text-white">
	<!-- Display navigation and button based on showPopup -->
	{#if !$showPopup}
		<div class="flex">
			<div class="max-w-1/4 w-1/4 border">
				<nav class="flex items-center justify-between max-w-[90%] mx-auto h-14">
					<p class="font-bold text-white">{LABELS.ROOT}</p>
					<Button variant="img" imageSrc={selectedImage.src} onClick={togglePopup} />
				</nav>
			</div>
			<div class="max-w-1/4 w-1/4 border">
				<nav class="flex items-center justify-between max-w-[90%] mx-auto h-14">
					<p class="font-bold text-white">{LABELS.DIRECTORY}</p>
					<Button variant="img" imageSrc={selectedImage.src} onClick={togglePopup} />
				</nav>
			</div>
		</div>
	{/if}

	<!-- Display AddDirectory component if showPopup is true -->
	{#if $showPopup}
		<AddDirectory onAdd={closeAndAddDirectory} />
	{/if}

	<!-- Display DirectoryFolder components -->
	<div class="mt-4">
		{#each directories as name}
			<DirectoryFolder {name} />
		{/each}
	</div>
</main>
