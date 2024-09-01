<script lang="ts">
	import { onMount } from 'svelte'
	import Image from '$lib/components/Image.svelte'

	export let images

	let index = 0
</script>

<div
	on:click={() => {
		index = (index + 1) % images.length
	}}
	>
	{#each images as image, i}
		{#if index == i}
			<Image
				src={image}
				/>
		{/if}
	{/each}
</div>

