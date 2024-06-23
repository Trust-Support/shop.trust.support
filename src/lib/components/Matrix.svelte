<script lang="ts">
	import { render } from '$lib/physics'
	import { onMount } from 'svelte'

	let canvas: HTMLCanvasElement

	const init = () => {
		const { width, height } = canvas.getBoundingClientRect()
		const pixelRatio = window.devicePixelRatio
		canvas.width = width * pixelRatio
		canvas.height = height * pixelRatio
		let context = canvas.getContext('2d')

		context.msImageSmoothingEnabled = false
		context.mozImageSmoothingEnabled = false
		context.webkitImageSmoothingEnabled = false
		context.imageSmoothingEnabled = false

		const scenario = []

		render(context, scenario)
		let interval = setInterval(() => {
			context.clearRect(0, 0, width * pixelRatio, height * pixelRatio)
			render(context, scenario)
		}, 5000)

		return () => {
			context = null
			interval = null
		}
	}

	onMount(init)
</script>

<svelte:window on:resize={init}/>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>

