<script lang="ts">
	import { intersect } from 'svelte-intersection-observer-action'
	import Image from '$lib/components/Image.svelte'
	import { selectedProduct, selectedProductId, selectedVariantId  } from '../../store'

	export let id: string;
	export let images: string[];

	const intersectCallback = (e) => {
		if (e.intersectionRatio > 0.4) {
			$selectedProductId = e.target.id
			//$selectedVariantId = undefined
		}
	}

	const intersectOptions = {
		callback: intersectCallback,
		rootMargin: "0px 0px 0px 0px",
		threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
	}
</script>

<div
	class="product"
	id={id}
	use:intersect={intersectOptions}>
	{#each images as image}
		<Image src={image} />
	{/each}
</div>

<style>
	.product {
		display: flex;
		padding: 0.1rem;
		align-self: start;
		flex-flow: column wrap;
		background: var(--bgcolor);
		min-height: 45vh;
	}

	/* Grid on mobile? */
	@media (max-width: 1024px) {
		.product {
			width: 100%;
			grid-row: span 6;
			grid-column: span 6;
			align-self: start;
			justify-self: start;
		}
	}
</style>

