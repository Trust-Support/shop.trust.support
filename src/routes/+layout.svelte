<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte'
	import { cartCreatedAt, isCartIdExpired, cart } from '../store'

	//onMount(async () => {
	//	if (!$cartId || $isCartIdExpired) {
	//		({ body: { data: { cartCreate: { cart: $cart }}}} = await fetch('/cart.json'))

	//		$cartId = $cart?.id
	//		$cartCreatedAt = Date.now()
	//	}
	//})
</script>

<svelte:head>
	<title>Store</title>
</svelte:head>

<main class="content">
	<slot/>
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
</style>

