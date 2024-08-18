<script lang="ts">
	import { onMount } from 'svelte'
	import MediaQuery from 'svelte-media-queries'
	import Mobile from '$lib/components/Mobile.svelte'
	import Desktop from '$lib/components/Desktop.svelte'
	import { products, isCartIdExpired, cart } from '../store'

	export let data

	let isMobile

	$products = data.products

	onMount(async () => {
		console.log($isCartIdExpired)

		if (!$isCartIdExpired) {
			try {
				const cachedCart = localStorage.getItem('cart')

				console.log(cachedCart)

				if (cachedCart?.length) {
					$cart = JSON.parse(cachedCart)
				}
			} catch (err) {
				console.error(err)
			}
		}
	})

</script>

<MediaQuery query='(max-width: 1024px)' bind:matches={isMobile}>
		{#if isMobile}
			<Mobile/>
		{:else}
			<Desktop/>
		{/if}
</MediaQuery>


