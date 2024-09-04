<script>
	// import { LABELS } from './../../constants/labels.js'; // Ensure this is the correct path
	import { imageStore } from './../../stores/imageStore.js';

	let images = {};
	const imageKey1 = 'img3';
	const imageKey2 = 'img4';

	// Subscribe to imageStore to get images
	const unsubscribe = imageStore.subscribe((value) => {
		images = value.images;
	});

	// Selected images based on keys
	$: selectedImage1 = images[imageKey1] || { src: '', alt: '' };
	$: selectedImage2 = images[imageKey2] || { src: '', alt: '' };

	export let name = '';
	let count = '';
</script>

<main class="w-full bg-white text-black mt-2 border-2 border-gray-600 p-1 rounded-md">
	<div class="flex justify-between mx-5 items-center">
		<div>
			<p>{name}</p>
			<div class="flex gap-2 h-6 w-7 mt-1">
				<img src={selectedImage1.src} alt={selectedImage1.alt} />
				<p>{count}2</p>
			</div>
		</div>
		<div>
			<img src={selectedImage2.src} alt="Info Icon" />
		</div>
	</div>
</main>
