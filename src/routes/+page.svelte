<script lang="ts">
	import Matrix from '$lib/components/Matrix.svelte'
	import Product from '$lib/components/Product.svelte'
	import Button from '$lib/components/Button.svelte'
	import Table from '$lib/components/Table.svelte'
	import Range from '$lib/components/Range.svelte'
	import '../app.css'

	enum Size {
		S,
		M,
		L,
		XL,
		XXL,
	}

	enum Scenario {
		Snow,
		Flowers,
	}

	const sizes = [1, 2, 3, 4, 5]

	const scenarios = []

	const products = [
		['./shirt.png', './shirt.png', './shirt.png'],
		['./lanyard.png']
	]
</script>

<svelte:head>
	<title>•••</title>
</svelte:head>

<main class="content">
	<div class="feed">
		{#each products as images}
			<Product images={images}/>
		{/each}
	</div>

	<!-- Router? -->
	<div class="details">
			<div class="details__backdrop">
				<Matrix/>
			</div>

			<div class="details__content">
				<div class="text">
					<p>Vestibulum Gray Screened Shirt Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam GM (Gildan Midweight) quam, screen printed design nunc et, neck label ornare nulla. Sed euismod features include:</p>
					<p>Praesent tincidunt screen printing Vivamus neck label detailing Fusce hendrerit 100% cotton fabric Mauris volutpat pre-shrunk material Etiam ultricies double-needle stitching</p>
					<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
				</div>

				<div class="form">
						<div class="form__input">
							<p>Size</p>
						</div>

						<div class="form__input">
							<p>Count</p>
						</div>

						<div class="form__actions">
							<Button>Add</Button>
						</div>

						<div class="form__summary">
							<Table/>

							<div class="form__actions">
								<Button disabled="true">Checkout</Button>
							</div>
							</div>
					</div>
			</div>

			<footer class="details__footer">
				<a href="mailto:info@trust.support">info@trust.support</a> - Kluckstr. 25 Berlin - <a href="https://trust.support/about/legal-disclosure" target="_blank">Legal disclosure</a>
			</footer>
		</div>
</main>

<style> 
	.content {
		position: relative;
		z-index: 1;
		min-height: 100%;
		width: 100%;
		display: flex;
		flex-flow: row wrap;
	}
	
	.feed {
		flex: 1;
		/*padding: 0.1rem;*/
	}

	.details {
		flex: 1;
		display: flex;
		flex-direction: column;
		position: sticky;
		align-self: flex-start;
		top: 0;
		min-height: 100vh;
	}

	.details__content {
		display: flex;
		flex-direction: column;
		border-left: 1px solid var(--trustblau);
		padding: 4rem;
		flex: 1;
	}

	.details__backdrop {
		overflow: hidden;
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: -1;
	}

	.form {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-self: stretch;
	}

	.text {
		background: #fff;
		padding: 0.5rem;
		align-self: start;
	}

	.form__input {
		padding: 0.5rem;
		background: #fff;
	}

	.form__summary {
		margin-top: 2rem;
		padding: 0.5rem;
		background: #fff;
	}

	.form__actions {
		flex-flow: row wrap;
		display: flex;
		background: red;
	}

	:global(.form__actions button) {
		flex: 1;
	}

	.details__footer {
		border-top: 1px solid var(--trustblau);
		border-left: 1px solid #fff;
		text-align: center;
		padding: 0.75rem 0.5rem;
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
</style>
