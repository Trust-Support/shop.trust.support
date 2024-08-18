<script lang="ts">
	import { cart, cartTotal, isCartLoading } from '../../store'
	import Button from '$lib/components/Button.svelte'
	import Row from '$lib/components/Row.svelte'
	import { formatPrice } from '$lib/helpers/products'
	import { getCheckoutURL } from '$lib/helpers/cart'

	const checkout = async () => {
			$isCartLoading = true

			const checkoutURL = await getCheckoutURL($cart)

			$isCartLoading = false

			window.location.href = checkoutURL
	}
</script>

{#if $cart?.length > 0}
<Row>
	<table class="cart__table">
		{#each $cart as { product, variant, price, count }}
			<tr>
				<td>
					{count}x {product.name} {variant.name}
				</td>
				<td>
					{formatPrice(price)} EUR
				</td>
				<td>
					<Button
						style="remove"
						on:push={() => {
							cart.remove(variant)
						}}
						>
							-
						</Button>
				</td>	
			</tr>
		{/each}

			<tfoot>
				<tr>
					<td>
						Total
					</td>
					<td>
						<b>{formatPrice($cartTotal)} EUR</b> <span class="note">+ shipping</span>
					</td>
				</tr>
			</tfoot>
	</table>
</Row>

<Button
	style="submit"
	on:push={checkout}
	>
	Checkout
</Button>
{:else}
	<Row>
		<p>Cart empty</p>
	</Row>
{/if}
<style>
	.cart {
		background: #fff;
		align-self: stretch;
	}

	.cart__row {
		padding: var(--space-row);
	}

	.cart__table {
		border-collapse: collapse;
    table-layout : fixed;
		width: 100%;
	}

	.cart__table td {
		padding: var(--space-row) 0;
		vertical-align: top;
	}


	.cart__table > tr:first-child td {
		padding-top: 0;
	}

	tfoot {
		border-top: 1px solid var(--trustblau);
		width: 100%;
	}

	tfoot tr:last-child td {
		padding-bottom: 0;
	}
</style>

