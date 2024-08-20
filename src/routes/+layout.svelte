<script lang="ts">
	import '../app.css';
	import { primaryColor } from '../store'

	const style = `:root { --bgcolor: ${$primaryColor ? $primaryColor : `var(--trustblau)` }; }`
</script>

<svelte:head>
	<title>Store</title>
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

