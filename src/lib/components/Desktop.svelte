<script lang="ts">
  import { PortableText } from '@portabletext/svelte'
	import { onMount } from 'svelte'
	import Product from '$lib/components/Product.svelte'
	import Block from '$lib/components/Block.svelte'
	import Row from '$lib/components/Row.svelte'
	import Form from '$lib/components/Form.svelte'
	import Cart from '$lib/components/Cart.svelte'
	import { contentRects, cart, products, selectedProductId, selectedProduct, selectedVariantId } from '../../store'
	import Button from '$lib/components/Button.svelte'

	$selectedProductId = $products[0]._id

	let contentEl

	const setRects = () => {
		const newContentRects = [
			...Object.values(contentEl.children).map((el) => el.getBoundingClientRect())
		]

    const contentRectsUpdated = newContentRects.some((rect, i) => {
      const newRect = $contentRects[i]

      return !newRect ||
        rect.top !== newRect.top ||
        rect.left !== newRect.left ||
        rect.width !== newRect.width ||
        rect.height !== newRect.height
    })

    if (contentRectsUpdated) {
      $contentRects = newContentRects
    }
	}

	onMount(setRects)
</script>

<svelte:window
	on:resize={setRects}
	on:scroll={setRects}
/>

<div class="pane-l">
	{#each $products as product}
		<Product id={product._id} images={product.images} />
	{/each}
</div>

<div class="pane-r">
	<!--<div class="pane-r__backdrop">
		<Matrix />
	</div>-->

	<div
		class="pane-r__content"
		bind:this={contentEl}
		>
		<Block>
			<Row>
				<PortableText
					value={$selectedProduct.description}
					/>
			</Row>
			<Form product={$selectedProduct}/>	
		</Block>

		<Block>
			<Cart/>	
		</Block>
	</div>

	<footer class="footer">
		<a href="mailto:info@trust.support">info@trust.support</a> - Kluckstr. 25 Berlin -
		<a
			href="https://trust.support/about/legal-disclosure"
			target="_blank"
			>Legal disclosore
		</a>
	</footer>
</div>

<style>
	.pane-l {
			flex: 0.5;
		}

	.pane-r {
		flex: 0.5;
		display: flex;
		flex-direction: column;
		position: sticky;
		align-self: flex-start;
		top: 0;
		min-height: 100vh;
		background: var(--bgcolor);
	}

	.pane-r__content {
		display: flex;
		flex-direction: column;
		flex: 1;
		/* Fork with no padding and set witdth */
		padding: 2.5rem;
		gap: 2.5rem;
		justify-content: start;
		align-items: center;
		/*opacity: 0;*/
		border-left: 1px solid var(--bordercolor);
	}

	.backdrop {
		overflow: hidden;
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: -1;
		background: var(--bgcolor);
	}

	.footer {
		border-top: 1px solid var(--bordercolor);
		border-left: 1px solid #fff;
		text-align: center;
		padding: var(--space-section);
		background: var(--seconadrycolor);
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
	
	@media (max-width: 1024px) {
		.pane-l, .pane-r{
			display: none;
		}
	}
</style>

