<script lang="ts">
	export let src: string;
	export let alt: string;

	// Cache image colors
	let loaded: boolean = true;

	//setTimeout(() => {
	//	loaded = true;
	//}, 100);
</script>

{#if loaded}
	<img
		class="image"
		srcset=""
		{alt}
		{src}
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

