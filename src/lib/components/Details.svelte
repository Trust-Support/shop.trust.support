<script lang="ts">
	import { onMount } from 'svelte'
	import Matrix from '$lib/components/Matrix.svelte'
	import Text from '$lib/components/Text.svelte'
	import Form from '$lib/components/Form.svelte'
	import Cart from '$lib/components/Cart.svelte'
	import { isCartLoading, selectedProduct, selectedProductId, contentRects } from '../../store'

	let contentEl

	// Throttle
	const setRects = () => {
		const newContentRects = [...Object.values(contentEl.children).map((el) => el.getBoundingClientRect())]

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

<div class="details">
	<div class="details__backdrop">
		<Matrix />
	</div>

	<div
		bind:this={contentEl}
		class="details__content"
		class:details__content--muted={$isCartLoading}
		>
		<Text/>	
		<Form/>
		<Cart/>
	</div>

	<footer class="details__footer">
		<a href="mailto:info@trust.support">info@trust.support</a> - Kluckstr. 25 Berlin -
			<a
				href="https://trust.support/about/legal-disclosure"
				target="_blank"
				>Legal disclosore
			</a>
	</footer>
</div>

<style>
	.details {
		flex: 0.55;
		display: flex;
		flex-direction: column;
		position: sticky;
		align-self: flex-start;
		top: 0;
		min-height: 100vh;
		background: #fff;
	}

	.details__content {
		display: flex;
		flex-direction: column;
		flex: 1;
		/* Fork with no padding and set witdth */
		padding: 6rem 4.5rem 4.5rem 4.5rem;
		justify-content: start;
		align-items: center;
		/*opacity: 0;*/
	}

	:global(.details__content--muted *) {
		opacity: 0.95;
	}

	.details__backdrop {
		overflow: hidden;
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: -1;
		border-left: 1px solid var(--trustblau);
	}

	.details__footer {
		border-top: 1px solid var(--trustblau);
		text-align: center;
		padding: var(--space-row) var(--space-section);
		background: #fff;
		color: var(--upsgray);
		flex-basis: 100%;
		align-self: stretch;
	}

	.details__footer a,
	.details__footer a:visited {
		transition: color 0.5s linear;
		color: var(--upsgray);
		text-decoration: none;
	}

	.details__footer a:hover {
		color: black;
	}

	@media (max-width: 1024px) {
		.details {
			width: 100%;
			height: 300px;
			position: fixed;
			bottom: 0;
			left: 0;
		}
	}
</style>

