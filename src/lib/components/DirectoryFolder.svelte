<script>
	// import { LABELS } from './../../constants/labels.js'; // Ensure this is the correct path
	import { imageStore } from './../../stores/imageStore.js';

	let images = {};
	const imageKey1 = 'img3';
	const imageKey2 = 'img6';

	// Subscribe to imageStore to get images
	const unsubscribe = imageStore.subscribe((value) => {
		images = value.images;
	});

	// Selected images based on keys
	$: selectedImage1 = images[imageKey1] || { src: '', alt: '' };
	$: selectedImage2 = images[imageKey2] || { src: '', alt: '' };

	export let name = '';
</script>

<main class="max-w-1/4 w-1/4 bg-white text-black mt-2 border-2 border-gray-600 p-1 rounded-md">
	<div class="flex justify-between mx-5 items-center">
		<div>
			<p>{name}</p>
			<div class="flex gap-5">
				<div class="flex gap-2">
					<img src={selectedImage1.src} alt={selectedImage1.alt} />
					<p>3</p>
				</div>
				<div class="flex gap-2">
					<img src={selectedImage2.src} alt={selectedImage2.alt} />
					<p>10</p>
				</div>
			</div>
		</div>
		<div>
			<img src="images/info.svg" alt="Info Icon" />
		</div>
	</div>
</main>

<style>
	main {
		max-width: 25%; /* Ensure consistency with 'w-1/4' */
		width: 25%; /* Consistent with max-width */
	}

	/* Additional styles can be added here */
</style>
