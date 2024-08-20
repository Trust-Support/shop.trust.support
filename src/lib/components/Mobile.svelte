<script lang="ts">
  import { PortableText } from '@portabletext/svelte'
	import Product from '$lib/components/Product.svelte'
	import Block from '$lib/components/Block.svelte'
	import Row from '$lib/components/Row.svelte'
	import Form from '$lib/components/Form.svelte'
	import Cart from '$lib/components/Cart.svelte'
	import { cart, products, selectedProductId, selectedProduct, selectedVariantId } from '../../store'
	import Button from '$lib/components/Button.svelte'

	let cartOpen = false
</script>

{#if !cartOpen}
	{#each $products as product}
		<Row>
			<Product id={product._id} images={product.images} />
		</Row>

		<div class="pane-b">
			<Block>
				<Row>
					<PortableText
						value={product.description}
						/>
				</Row>

				<Row>
					<Form {product}/>
				</Row>
			</Block>
		</div>
	{/each}

	{#if $cart.length}
	<nav class="cart-button">
		<Button
			on:push={ () => { cartOpen = !cartOpen }}>
			Cart ({$cart.reduce((sum, val) => sum + val.count, 0)})
		</Button>
	</nav>
	{/if}
	{:else}
	<div class="cart">
		<Button
			on:push={ () => { cartOpen = !cartOpen }}
			>
			Close
		</Button>

		<Row>
			<Cart/>
		</Row>
	</div>
	{/if}
	<footer class="footer">
	<a href="mailto:info@trust.support">info@trust.support</a> - Kluckstr. 25 Berlin -
	<a
		href="https://trust.support/about/legal-disclosure"
		target="_blank"
		>Legal disclosore
	</a>
</footer>

<style>
	.cart {
		background: var(--bgcolor);
		flex-grow: 1;
	}

	.pane-b {
		padding: var(--space-row);
	}

	:global(.cart button, .cart-button button) {
		width: 100% !important;
	}

	.cart-button {
		width: 100%;
		display: flex;
		align-content: stretch;
		position: fixed;
		top: 0;
		left: 0;
	}

	.footer {
		border-top: 1px solid var(--trustblau);
		border-left: 1px solid #fff;
		text-align: center;
		padding: var(--space-section);
		background: #fff;
		color: var(--upsgray);
		flex-basis: 100%;
		align-self: stretch;
	}

	.footer a,
	.footer a:visited {
		transition: color 0.5s linear;
		color: var(--upsgray);
		text-decoration: none;
	}

	.footer a:hover {
		color: black;
	}

</style>

