<script lang="ts">
	import Product from '$lib/components/Product.svelte'
	import { products } from '../../store'
</script>

<div class="feed">
	{#each $products as { _id: id, images }}
		<Product {id} {images} />
	{/each}
</div>

<style>
	.feed {
		flex: 0.45;
	}
</style>

