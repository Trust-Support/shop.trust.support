<script lang="ts">
	import { render } from '$lib/physics'
	import { onMount } from 'svelte'
	let canvas

	onMount(() => {
		const { width, height } = canvas.getBoundingClientRect()
		const pixelRatio = window.devicePixelRatio
		canvas.width = width * pixelRatio
		canvas.height = height * pixelRatio
		const context = canvas.getContext('2d')

		context.msImageSmoothingEnabled = false
		context.mozImageSmoothingEnabled = false
		context.webkitImageSmoothingEnabled = false
		context.imageSmoothingEnabled = false

		const scenario = []

		render(context, scenario)
	})
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		width: 100%;
		height: 100%;
	}
</style>

