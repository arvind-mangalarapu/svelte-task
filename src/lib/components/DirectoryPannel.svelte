<script lang="ts">
	import AddDirectory from './AddDirectory.svelte';
	import { LABELS } from '../../constants/labels.js';
	import { imageStore } from '../../stores/imageStore.js';
	import { showPopup } from '../../stores/showPopup.js';
	import { onDestroy } from 'svelte';
	import Button from './Button.svelte';
	import DirectoryFolder from './DirectoryFolder.svelte';
	import File from './File.svelte';

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
	let directoriesAA = [];
	let count = 0;
	let selectedDirectory = ''; // Track the selected directory

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

	function openDirectory(name: string) {
		selectedDirectory = name; // Set the clicked directory as selected
		console.log(name);
	}
</script>

<main class="text-white">
	<!-- Display AddDirectory component if showPopup is true -->
	{#if $showPopup}
		<AddDirectory onAdd={closeAndAddDirectory} />
	{/if}
	<!-- <AddDirectory onAdd={closeAndAddDirectoryAA} /> -->
	<!-- Display navigation and button based on showPopup -->
	{#if !$showPopup}
		<div
			class="grid
		grid-cols-12 grid-flow-row gap-4"
		>
			<div class="col-span-4 border">
				<nav class="flex items-center justify-between max-w-[90%] mx-auto h-14">
					<p class="font-bold text-white">{LABELS.ROOT}</p>
					<Button variant="img" imageSrc={selectedImage.src} onClick={togglePopup} />
				</nav>
			</div>
			{#if selectedDirectory}
				<div class="col-start-5 col-span-4 border">
					<nav class="flex items-center justify-between max-w-[90%] mx-auto h-14">
						<p class="font-bold text-white">{selectedDirectory}</p>
						<Button variant="img" imageSrc={selectedImage.src} onClick={togglePopup} />
					</nav>
				</div>
			{/if}
		</div>
	{/if}
	<!-- Display DirectoryFolder components -->
	<div class="grid grid-cols-12 gap-4">
		<div class="col-span-4">
			{#each directories as name}
				<button on:click={() => openDirectory(name)} class="w-full">
					<DirectoryFolder {name} />
				</button>
			{/each}
		</div>
		{#if selectedDirectory}
			<div class="col-start-5 col-span-4">
				{#each directoriesAA as name}
					<button on:click={() => openDirectoryAA(name)} class="w-full">
						<DirectoryFolder {name} />
					</button>
				{/each}
			</div>
		{/if}
	</div>
	<div class="grid grid-cols-12 gap-4">
		<div class="col-span-4">
			<File name="File 1" />
		</div>
	</div>
</main>
