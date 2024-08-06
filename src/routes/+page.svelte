<script lang="ts">
	import MediaQuery from 'svelte-media-queries'
	import Feed from '$lib/components/Feed.svelte'
	import Details from '$lib/components/Details.svelte'
	import { products, selectedProductId, selectedProduct, selectedVariantId } from '../store'
	export let data

	$products = data.products

	$selectedProductId = $products[0].id
	$selectedVariantId = $products[0].variants[0].id

	let isMobile
</script>

<MediaQuery query='(max-width: 1024px)' bind:isMobile/>

<main class="content">
	{#if isMobile}
		{#each $products as $product}
			<Feed product={$product}/>
			<Details product={$product}/>
		{/each}
	{:else}
		<Feed/>
		<Details/>
	{/if}
</main>

<style>
	.content {
		position: relative;
		z-index: 1;
		min-height: 100%;
		width: 100%;
		display: flex;
		flex-flow: row wrap;
	}

	@media (max-width: 1024px) {
		.content {
			flex-direction: column;
		}
	}
</style>

