<script lang="ts">
	export let images: [] | string[] = []
</script>

<div class="product">
	<!-- Preload SVG outlines -->
	{#each images as image}
		<img class="product__image" srcset="" src={image}/>
	{/each}
</div>

<!--<Range on:change={(e) => value = e.detail.value} id="basic-slider" max="{230}" min="{5}" initialValue="{value}"/>-->

<style>
	.product {
		grid-column: span 2;
		display: flex;
		align-self: start;
		flex-flow: column wrap;
		background: #fff;
	}

	.product__image {
		display: block;
		flex: 1;
		width: 100%;
	}

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
