<script lang="ts">
	//import Otp from '$lib/components/Otp'
	import Button from '$lib/components/Button.svelte'
	import Row from '$lib/components/Row.svelte'
	import Range from '$lib/components/Range.svelte'
	import { isCartLoading, selectedProductId, selectedProduct, selectedVariantId, selectedVariant } from '../../store'
	import { fetchCart } from '$lib/utils/shopify'

	console.log($selectedProduct)

	let selectedPrice = 40

	//const getCartItems = async () => {
	//	const response = await fetch(`/cart.json?${new URLSearchParams({ cartId: $cartId })}`)

	//	console.log(response.ok)
	//	console.log(response)
	//}

	const addToCart = async (productId: string = $selectedProductId, variantId: string = $selectedVariantId) => {
		//console.log('********************')
		//console.log(`Adding to cart: ${$selectedProductId}, ${$selectedVariantId}.`)
		//console.log('********************')

		//$isCartLoading = true

		//// Check availability
		//await getCartItems()

		//// Loading state = mute ui
		//$isCartLoading = false
	}

	const selectVariant = (variantId: string) => {
		$selectedVariantId = variantId
	}
</script>

<Row>
	{#if $selectedProduct?.variants?.length > 1}
		<p>Select size</p>
		<ul>
		{#each $selectedProduct?.variants as { _key: id, name, quantity }}
			<li>
				<Button
					on:push={() => {
						selectVariant(id)
					}}
					toggled={$selectedVariantId == id}
					disabled={quantity < 1}
					>
					{name}
				</Button>
			</li>
		{/each}
		</ul>
	{:else}
		<p>One size</p>
	{/if}
</Row>

{#if $selectedProduct.pricePointsEnabled}
	<Row>
		<p>Select price</p>


		{@const pricePoints = $selectedProduct.pricePoints}

		<Range
			initialValue={selectedPrice}
			min={pricePoints[0]}
			max={pricePoints[pricepoints.length - 1]}
			on:change={(e) => { 
				selectedPrice = e.detail.value
			}}
			/>
	</Row>
{/if}

{#if $selectedVariant.quantity >= 1}
	<Row>
		<p>
			{selectedPrice} <span class="currency">EUR</span>
		</p>
	</Row>

	<Row>
		<Button
				action="toggle"
				on:push={addToCart}
				>
			Add to cart</Button>
	</Row>
{:else}
	<Row>
		<p>Sold out</p>
	</Row>
{/if}

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

