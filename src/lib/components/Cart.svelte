<script lang="ts">
	import { scale } from 'svelte/transition';
	import { quadIn } from 'svelte/easing';
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
						<td>2x T-shirt XL</td>
						<td>35€</td>
						<td>
							<Button action="remove">X</Button>
						</td>
					</tr>

					<tr>
						<td>1x T-shirt L</td>
						<td>40€</td>
						<td>
							<Button action="remove">X</Button>
						</td>
					</tr>

					<tr>
						<td>1x Lanyard</td>
						<td>free</td>
						<td>
							<Button action="remove">X</Button>
						</td>
					</tr>

					<tfoot>
						<tr>
							<td>Total</td>
							<!-- if 0 free -->
							<td>75€</td>
							<td></td>
						</tr>
					<tfoot>
			</table>
		</div>

		<Button action="submit"
			on:message={checkout}
			>
			Checkout
		</Button>
	<!--{:else}
		<div class="cart__row">
			<p>Cart empty</p>
		</div>-->
</div>

<style>
	.cart {
		/*margin-top: var(--space-section);*/
		margin-top: 4.5rem;
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

	.cart__table tr td:last-child {
		width: 5rem;
	}
</style>

