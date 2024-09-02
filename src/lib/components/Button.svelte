<script lang="ts">
	export let variant: 'transparent' | 'gray' | 'img' | 'disabled' | 'default' = 'default';
	export let onClick: () => void = () => {};
	export let disabled: boolean = false;
	export let imageSrc: string = '';
	export let text: string = '';

	let btnClass: string;

	// Reactive block to update button class based on the variant prop
	$: {
		switch (variant) {
			case 'transparent':
				btnClass = 'btn-transparent';
				break;
			case 'gray':
				btnClass = 'btn-grey';
				break;
			case 'img':
				btnClass = 'btn-img';
				break;
			case 'disabled':
				btnClass = 'btn-disabled';
				break;
			default:
				btnClass = 'btn';
				break;
		}
	}

	function handleClick(event: MouseEvent) {
		if (!disabled) {
			onClick();
		}
	}
</script>

<button
	class={btnClass}
	on:click={handleClick}
	aria-disabled={disabled ? 'true' : 'false'}
	{disabled}
>
	{#if imageSrc}
		<img src={imageSrc} alt="Button icon" class="btn-img-content" />
	{:else if text}
		<span>{text}</span>
	{/if}
	<slot></slot>
</button>

<style>
	.btn-transparent {
		@apply bg-transparent px-7 py-3 border cursor-pointer rounded-lg text-[16px] capitalize w-[109px];
	}

	.btn-grey {
		@apply bg-slate-700 text-white cursor-pointer px-7 py-3 border rounded-lg text-[16px] capitalize w-[95px];
	}

	.btn-img {
		@apply bg-cover bg-center cursor-pointer bg-white rounded-lg;
	}

	.btn-disabled {
		@apply bg-gray-400 opacity-[30%] text-white cursor-not-allowed px-7 py-3 border rounded-lg text-[16px] capitalize w-[95px];
	}

	.btn {
		@apply flex items-center justify-center border-none cursor-pointer w-10 h-10;
	}

	.btn-img-content {
		max-width: 100%;
		max-height: 100%;
		display: block;
	}
</style>
