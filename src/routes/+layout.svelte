<script lang="ts">
	import '../app.css';
	import { primaryColor } from '../store'
	import { Transaction } from '@sanity/client'
	import { createOrderTransaction } from  '$lib/sanity/transactions'

	const style = `:root { --bgcolor: ${$primaryColor ? $primaryColor : `var(--trustblau)` }; }`
</script>

<svelte:head>
	<title>Trust shop</title>
	<!--<style>{style}</style>-->
</svelte:head>

<main>
	<slot/>
</main>

<style>
	main {
		position: relative;
		z-index: 1;
		min-height: 100%;
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		flex: 1;
	}

	@media (max-width: 1100px) {
		main {
			flex-flow: column wrap;
			background: var(--bgcolor);
		}
	}
</style>

