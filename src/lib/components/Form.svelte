<script lang="ts">
	//import Otp from '$lib/components/Otp'
	import Button from '$lib/components/Button.svelte'
	import Row from '$lib/components/Row.svelte'
	import Range from '$lib/components/Range.svelte'
	import { addToCart } from '$lib/helpers/cart'
	import { formatPrice } from '$lib/helpers/products'

	export let product

	let selectedVariant
	let selectedPrice

	const availableVariants = product.variants
		.filter(({ quantity }) => quantity > 0)

	selectedVariant = availableVariants.length ?
		availableVariants[0] :
		product.variants[0]

	selectedPrice = product?.defaultPrice
</script>

<Row>
	<p>Select size</p>

	<ul>
	{#each product.variants as { name, quantity, sku }}
		<li>
			<Button
				disabled={quantity < 1}
				on:push={() => {
					const index = product.variants.findIndex((variant) => variant.sku == sku)

					if (index !== -1)  {
						selectedVariant = product.variants[index]
					}
				}}
				toggled={selectedVariant?.sku == sku}
				>
				{name}
			</Button>
		</li>
	{/each}
	</ul>
</Row>

<Row>
	{#if product.slidingScalePricing}
		<p class:muted={!selectedVariant?.quantity < 1}>
			Select price
		</p>

		<Range
			initialValue={product?.defaultPrice}
			min={product?.minPrice}
			max={product?.maxPrice}
			on:change={(e) => {
				selectedPrice = e.detail.value
			}}
			/>
	{/if}

	<p>
		{selectedVariant?.name} / 
		{#if selectedVariant?.quantity < 1}
			Sold out
		{:else}
			{product.slidingScalePricing ? formatPrice(selectedPrice) : formatPrice(product.price)} EUR
		{/if}
	</p>

	<Button
		disabled={selectedVariant.quantity < 1}
		action="toggle"
		on:push={() => {
			addToCart(product, selectedVariant, selectedPrice)
		}}
		>
		Add to cart
	</Button>
</Row>

<style>
	:global(button) {
		align-self: start;
	}

	.currency {
		color: var(--upsgray-inv);
	}

	ul {
		list-style: none;
		display: flex;
		flex-flow: row wrap;
		gap: var(--space-row);
	}
</style>

