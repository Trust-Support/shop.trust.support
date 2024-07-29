<script lang="ts">
	import Physics from '$lib/utils/physics'
	import { onMount } from 'svelte'
  import { browser } from '$app/environment';
	import { contentRects }  from '../../store'

	export type Dot = [0|1, number]

	let canvasEl: HTMLCanvasElement
	let bufferEl: HTMLCanvasElement 
	let context: CanvasRenderingContext2D
	let bufferContext: CanvasRenderingContext2D
	let canvasRect
	let width: number
	let height: number
	let dpr: number

	const rotateBy = 9 * Math.PI / 180

	// Single frame grid
	//: Array<0|1[], 0|1[]> 
	const gridScenario = [
		[
			Array.from({ length: 100 }).map(() => 0),
			Array.from({ length: 100 }).map(() => 0)
		]
	]

	let negspaces = []


	const printScenario = [
		[
			Array.from({ length: 100 }).map(() => +(Math.random() < 0.5)),
			Array.from({ length: 100 }).map(() => +(Math.random() < 0.5))
		]
	]

	// Normalize content rects
	const setNegSpaces = () => {
		negspaces = $contentRects.map((rect) => ({
			top: (rect.top - canvasRect.top) * dpr,
			right: (rect.right - canvasRect.right) * dpr,
			bottom: (rect.bottom - canvasRect.bottom) * dpr,
			left: (rect.left - canvasRect.left) * dpr,
			width: rect.width * dpr,
			height: rect.height * dpr
		}))
	}

	const fit = () => {
		canvasRect = canvasEl.getBoundingClientRect()
		width = canvasRect.width
		height = canvasRect.height
		canvasEl.width = width * dpr;
		canvasEl.height = height * dpr;
		buffferEl.width = width * dpr
		buffferEl.height = height * dpr
	}

	const drawDot = (x, y, fill) => {
	}

	const drawGrid = (scenario) => {
	}

	const erase = (areas, radius, iterations) => {
	}

	const init = () => {
		// Setup
		context = canvasEl.getContext('2d');

		context.imageSmoothingEnabled = false;
		bufferContext.imageSmoothingEnabled = false;

		fit()
		setNegSpaces()

		// Start physics
		const physics = new Physics(context)

		// Framerate control
		let lastDraw = 0
		const fps = 1000 / 1

		const frame = (rn: DOMHighResTimeStamp) => {
			requestAnimationFrame(frame)

			if (rn - lastDraw < fps) {
				return
			}

			lastDraw = rn
	
			// Clear canvas inb4 each call
			context.clearRect(0, 0, width * dpr, height * dpr)
			
			physics.setContext(context)



			physics.setContext(bufferContext)

			//// Draw grid
			//physics.config(24 * dpr, 12 * dpr, '#2DABFF', 'rgba(255, 255, 255, 0)')
			//const layer1 = physics.layer(gridScenario)
			//physics.draw(layer1)

			//// Draw grid layer first 
			//physics.config(28 * dpr, 12*dpr, 'rgba(255, 255, 255, 0)', 'rgba(99, 255, 152, 0.95)')
			//const layer2 = physics.layer(printScenario)
			//physics.erase(layer2, negspaces, 5 * dpr)
			//physics.draw(layer2)
		}

		frame()
	};

	contentRects.subscribe(setNegSpaces)

	onMount(() => {
		if (browser) {
			bufferEl = document.createElement('canvas')
		}

		init()
	});
</script>

<svelte:window
	on:resize={fit}
	bind:devicePixelRatio={dpr}
	/>

<canvas bind:this={canvasEl}></canvas>

<style>
	canvas {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		/*transform: rotateZ(2deg) scale(2);*/
	}
</style>
