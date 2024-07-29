<script lang="ts">
	import { cart, isCartLoading } from '../../store'
	import Button from '$lib/components/Button.svelte'

	const checkout = () => {
		$isCartLoading = true

		window.open(checkoutUrl, '_blank')

		$isCartLoading = false
	}
</script>

<!-- Fade in? -->
<div class="cart">
	{#if 1}
	<div class="cart__row">
			<table class="cart__table">
				<!--{#each cart as {id, title, variant, cost, quantity}}
					<tr>
						<a href={`#${id}`}>
							<td>{quantity} {title} {variant}</td>
							<td>{cost}</td>
						</a>
					</tr>
				{/each}-->
				<!-- make scrollable when too long -->
					<tr>
						<a>
							<td>2x T-shirt XL</td>
							<td>35€</td>
						</a>
					</tr>

					<tr>
						<a>
							<td>1x T-shirt L</td>
							<td>40€</td>
						</a>
					</tr>

					<tr>
						<a>
							<td>1x Lanyard</td>
							<td>free</td>
						</a>
					</tr>
			</table>
		</div>

		<Button
			action="submit"
			on:message={checkout}
			>
			Checkout
		</Button>
	{:else}
		<div class="cart__row">
			<p>Cart empty</p>
		</div>
	{/if}
</div>

<style>
	.cart {
		/*margin-top: var(--space-section);*/
		margin-top: 2rem;
		background: #fff;
		align-self: stretch;
	}

	.cart__row {
		padding: var(--space-row);
	}

	.cart__table {
		border-collapse: collapse;
	}
</style>

