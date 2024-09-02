<script lang="ts">
	import { LABELS } from '../../constants/labels.js';
	import { imageStore } from '../../stores/imageStore.js';
	import { showPopup } from '../../stores/showPopup.js';
	import { onDestroy } from 'svelte';
	import Button from './Button.svelte';

	let images = {};
	const imageKey1 = 'img3';
	const imageKey2 = 'img6';

	// Subscribe to imageStore to get images
	const unsubscribe = imageStore.subscribe((value) => {
		images = value.images;
	});

	// Selected images based on keys
	const selectedImage1 = images[imageKey1] || { src: '', alt: '' };
	const selectedImage2 = images[imageKey2] || { src: '', alt: '' };

	// Clean up subscription on component destroy
	onDestroy(() => {
		unsubscribe();
	});

	let selectedOption = ''; // Initialize selectedOption
	let inputValue = ''; // Initialize inputValue

	// Check if the form is complete
	$: isFormComplete = selectedOption !== '' && inputValue.trim() !== '';

	export let onAdd: (name: string, type: string) => void = () => {}; // Callback function prop

	function closePopup() {
		showPopup.set(false); // Close the popup
	}

	function handleClick() {
		if (isFormComplete) {
			onAdd(inputValue, selectedOption); // Call the onAdd function with input values
			closePopup(); // Close the popup
		}
	}
</script>

<main class="flex items-center justify-center h-screen bg-gray-700 w-full z-50 text-gray-600">
	<div class="bg-gray-900 rounded-2xl w-[436px]">
		<div class="shadow-lg rounded-2xl p-5">
			<div class="h-20 flex justify-between items-center border-b max-w-[90%] mx-auto">
				<h2 class="text-gray-400 font-bold text-[16px]">{LABELS.ADD_NEW}</h2>
				<Button variant="img" imageSrc="images/close.svg" onClick={closePopup} />
			</div>

			<div class="flex items-center gap-3 mt-8 max-w-[90%] mx-auto">
				<p>{LABELS.TYPE} :</p>
				<label>
					<input
						class="text-black"
						type="radio"
						name="option"
						value={LABELS.FILE}
						bind:group={selectedOption}
					/>
					{LABELS.FILE}
				</label>
				<label>
					<input
						class="text-black"
						type="radio"
						name="option"
						value={LABELS.DIRECTORY}
						bind:group={selectedOption}
					/>
					{LABELS.DIRECTORY}
				</label>
			</div>

			<div class="max-w-[90%] mx-auto flex flex-col gap-5 mt-5">
				<div class="flex items-center justify-between">
					<label for="textInput">{LABELS.NAME} :</label>
					<input
						class="border h-10 w-72 rounded-lg px-4 text-black"
						id="textInput"
						type="text"
						bind:value={inputValue}
						placeholder=""
					/>
				</div>
				<div class="flex items-center justify-between">
					<Button variant="transparent" text={LABELS.CANCEL} onClick={closePopup} />
					<Button
						onClick={handleClick}
						variant={isFormComplete ? 'gray' : 'disabled'}
						text={LABELS.ADD}
					/>
				</div>

				<!-- Conditional rendering of images based on selection -->
				{#if selectedOption === LABELS.FILE}
					<img src={selectedImage1.src} alt={selectedImage1.alt} class="w-20 h-20" />
				{:else if selectedOption === LABELS.DIRECTORY}
					<img src={selectedImage2.src} alt={selectedImage2.alt} class="w-20 h-20" />
				{/if}

				<p>{inputValue}</p>
			</div>
		</div>
	</div>
</main>
