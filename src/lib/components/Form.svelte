<script lang="ts">
	//import Otp from '$lib/components/Otp'
	import Button from '$lib/components/Button.svelte'
	import Range from '$lib/components/Range.svelte'
	import { cartId, isCartLoading, selectedProductId, selectedProduct, selectedVariantId, selectedVariant } from '../../store'
	import { fetchCart } from '$lib/utils/shopify'

	let selectedPrice = 40

	const getCartItems = async () => {
		const response = await fetch(`/cart.json?${new URLSearchParams({ cartId: $cartId })}`)

		console.log(response.ok)
		console.log(response)

		//let sum = 0

		//res.body?.data?.cart?.lines?.edges?.forEach((d) => {
		//	sum += d.node.quantity;
		//})

		//cartQuantity.set(sum)
	}

	const addToCart = async (productId: string = $selectedProductId, variantId: string = $selectedVariantId) => {
		console.log('********************')
		console.log(`Adding to cart: ${$selectedProductId}, ${$selectedVariantId}.`)
		console.log('********************')

		$isCartLoading = true

		//await fetch('/cart.json', {
		//  method: 'PATCH',
		//  body: JSON.stringify({
		//		cartId: `${$cartId}`,
		//		variantId: `${$selectedVariantId}`
		//	})
		//})

		// Wait for the API to finish before updating cart items
		await getCartItems()

		// Loading state = mute ui
		$isCartLoading = false
	}
</script>

<div class="form">
		<div class="form__row">
			{#if $selectedProduct?.variants?.length > 1}
				<p>Select size</p>
				<ul>
				{#each $selectedProduct?.variants as { id, title, availableForSale }}
					<li>
						<Button
							on:push={addToCart}>
							{title}
						</Button>
					</li>
				{/each}
				</ul>
			{:else}
				<p>One size</p>
			{/if}
		</div>

		<div class="form__row">
			<p>Select price</p>

			<Range
				initialValue={selectedPrice}
				min={35}
				max={65}
				on:change={(e) => { 
					selectedPrice = e.detail.value
				}}
				/>
	</div>

	{#if $selectedVariant?.availableForSale}
		<div class="form__row">
			<p>
				{selectedPrice} <span class="currency">{$selectedVariant.priceV2.currencyCode}</span>
			</p>
		</div>

		<div class="form__row">
			<Button
					action="toggle"
					on:push={addToCart}
					>
				Add to cart</Button>
		</div>
		{:else}
			Sold out
		{/if}
</div>

<style>
	.form {
		background: #fff;
		align-self: stretch;
		display: flex;
		gap: var(--space-section);
		flex-flow: column wrap;
		padding-bottom: var(--space-row);
	}

	.form__row {
		display: flex;
		gap: 1rem;
		flex-flow: column wrap;
		padding: 0 var(--space-row);
	}

	:global(.form button) {
		align-self: start;
	}
	
	.size,
	.currency {
		color: var(--upsgray-inv);
	}

	ul {
		list-style: none;
		display: flex;
		gap: var(--space-row);
	}
</style>

