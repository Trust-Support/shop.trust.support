<script lang="ts">
	import Matrix from '$lib/components/Matrix.svelte'
	import Item from '$lib/components/Item.svelte'
	import Checkout from '$lib/components/Checkout.svelte'
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

</script>

<svelte:head>
	<title>•••</title>
</svelte:head>

<div class="backdrop">
	<Matrix/>
</div>

<main class="content">
	<Item/>
	<Checkout/>

	<footer class="footer">
		<a href="mailto:info@trust.support">info@trust.support</a> - Kluckstr. 25 Berlin - <a href="https://trust.support/about/legal-disclosure" target="_blank">Legal disclosure</a>
	</footer>
</main>

<style> 
	.backdrop {
		width: 100vw;
		height: 100vh;
		position: fixed;
		z-index: 0;
		transform: rotateZ(-1.5deg) scale(1.5);
		opacity: 0.6;
	}

	.content {
		padding: 1rem;
		position: relative;
		z-index: 1;
		height: 100%;
		width: 100%;
		display: grid;	
		grid-template-columns: repeat(6, 1fr);
	}

	@media (max-width: 1024px) {
		.content {
		}
	}

	.footer {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		text-align: center;
		padding: 2.5rem 0.5rem 0.75rem 0.5rem;
		background-image: linear-gradient(to top, #fff 55%, rgba(255, 255, 255, 0));
		color: var(--upsgray);
		transition: color 0.5s linear;
	}

	.footer a,
	.footer a:visited {
		color: var(--upsgray);
		text-decoration: none;
	}

	.footer a:hover {
		color: #000;
	}
</style>
