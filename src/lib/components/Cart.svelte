<script lang="ts">
	import { cart, cartTotal, isCartLoading } from '../../store'
	import Button from '$lib/components/Button.svelte'
	import Row from '$lib/components/Row.svelte'

	const checkout = () => {
		$isCartLoading = true

		window.open(checkoutUrl, '_blank')

		$isCartLoading = false
	}
</script>

{#if $cart?.length > 0}
<Row>
	<table class="cart__table">
		{#each $cart as {_id: id, name, variant, cost, quantity}}
			<tr>
				<a href={`#${id}`}>
					<td>{quantity}x {name} {variant}</td>
					<td><Button action="remove">X</Button></td>
				</a>
			</tr>
		{/each}

			<tfoot>
				<tr>
					<td>Total</td>
					<td>{$cartTotal} EUR (shipping calculated at checkout)</td>
				</tr>
			</tfoot>
	</table>
</Row>

<Button action="submit"
	on:message={checkout}
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

	.cart__table tr td:last-child {
		width: 5rem;
	}

	tfoot {
		width: 100%;
	}
</style>

