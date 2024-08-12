<script lang="ts">
	import imageUrlBuilder from '@sanity/image-url'	
	import { client } from '$lib/sanity/client'

	export let src: string;
	export let alt: string;

	const imageBuilder = imageUrlBuilder(client)

	function buildImage (source) {
		return imageBuilder.image(source)
	}

	// Cache image colors
	let loaded: boolean = true;
</script>

{#if loaded}
	<img
		class="image"
		srcset=""
		{alt}
		src={buildImage(src)}
		/>
{:else}
	<div class="placeholder"></div>
{/if}

<style>
	.image {
		display: block;
		width: 100%;
	}

	.placeholder {
		width: 100%;
		height: 500px;
		background: var(--upsgray);
		/*style={`height: {300}px; background: ${'green'}`}*/
	}
</style>

