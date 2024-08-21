<script lang="ts">
	import { onMount } from 'svelte'
	import { browser } from '$app/environment'
	import MediaQuery from 'svelte-media-queries'
	import Mobile from '$lib/components/Mobile.svelte'
	import Desktop from '$lib/components/Desktop.svelte'
	import { products, isCartIdExpired, cart } from '../store'

	export let data

	let isMobile

	$products = data.products
</script>

<MediaQuery query='(max-width: 1100px)' bind:matches={isMobile}>
		{#if isMobile}
			<Mobile/>
		{:else}
			<Desktop/>
		{/if}
</MediaQuery>


