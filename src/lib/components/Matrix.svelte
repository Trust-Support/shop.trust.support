<script lang="ts">
	import { onMount } from 'svelte'
  import { browser } from '$app/environment'
	import { contentRects }  from '../../store'

	interface Rectangle {
		x: number, 
		y: number,
		width: number,
		height: number,
		angle: number
	}

	type Scenario = number[][]

	type EraseScenario = Rectangle[]

	let screenCanvasEl: HTMLCanvasElement
	let bufferCanvasEl: HTMLCanvasElement 

	let screenContext: CanvasRenderingContext2D
	let bufferContext: CanvasRenderingContext2D

	let width: number
	let height: number
	let dpr: number

	let canvasRect: DOMRect

	// Framerate config
	const eraseFPS: number = 1000 / 25
	const scenarioFPS: number = 1000 / 12

	// Erase config
	const eraseRadius: number = 25
	const eraseIterations: number = 5
	let eraseUpdated: boolean = false
	let eraseIterationsCount: number = false
	let eraseScenario: EraseScenario

	// Grid
	const minBaseRadius: number = 16
	const baseDiameterPct: number = 4 / 100
	let baseRadius: number 

	const baseScenario = [
		[ 
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		]
	]

	const overprintScenario = [
		[
			[1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
			[1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
			[1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
			[1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
			[1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0],
			[1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
			[1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
			[1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
			[1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
			[1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
			[1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
			[1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
			[1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
			[1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
			[1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
			[1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
			[1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
			[1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
			[1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
			[1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
			[1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
			[1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
			[1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0]
		]
	]

	const getRand = (min: number, max: number): number => Math.random() * (max - min) + min

	const setFit = () => {
		canvasRect = screenCanvasEl.getBoundingClientRect()

		width = canvasRect.width * dpr
		height = canvasRect.height * dpr

		screenCanvasEl.width = width
		screenCanvasEl.height = height

		bufferCanvasEl.width = width
		bufferCanvasEl.height = height

		baseRadius = Math.max((baseDiameterPct * Math.min(width, height)) / 2, minBaseRadius * dpr)
	}

	const setEraseScenario = () => {
		eraseScenario = []

		for (let i = 0; i <= eraseIterations; i++) {
			const frame = $contentRects.map((rect) => {
					const widthMultiplier = getRand(1, 1.1)
					const heightMultiplier = getRand(1, 1.1)
					
					const x = ((rect.left - canvasRect.left - (eraseRadius / 2)) * dpr)
					const y = ((rect.top - canvasRect.top - (eraseRadius / 2)) * dpr)

					const width = (rect.width + eraseRadius) * dpr 
					const height = (rect.height + eraseRadius) * dpr

					const angle = getRand(-1, 1) * Math.PI / 180

					return {
						x,
						y,
						width,
						height,
						angle
					}
			})

			eraseScenario.push(frame);
		}
	}

	const drawScenario = (
		context: CanvasRenderingContext2D,
		scenario: Scenario,
		strokeStyle: string = '#2dabff', 
		fillStyle: string = '#ffffff00',
		radiusMultiplier: number = 1,
		) => {
		// Set styles
		context.strokeStyle = strokeStyle
		context.fillStyle = fillStyle
		context.lineWidth = 1 * dpr

		const columns = width / baseRadius
		const rows = height / baseRadius
		
		// Set up adaptive grid
		for (let i = 0; i <= rows; i++) {
			for (let j = 0; j <= columns; j++) {
				const x = (j * baseRadius) * 2
				const y = (i * baseRadius) * 2

				context.beginPath()	

				context.arc(
					x,
					y,
					baseRadius * radiusMultiplier,
					0,
					Math.PI * 2
				)

				context.stroke()

				// Determine scenario alignment
				// Top
				// Right
				// Bottom
				// Left

				context.fill()
			}
		}
	}

	const erase = (context: CanvasRenderingContext2D, scenario: EraseScenario) => {
		for (const frame of scenario) {
			for (const { x, y, width, height, angle } of frame) {
				context.save()
				context.rotate(angle)

				context.clearRect(x, y, width, height)

				context.restore()
			}
		}
	}

	const init = () => {	
		setFit()

		screenContext = screenCanvasEl.getContext('2d')
		bufferContext = bufferCanvasEl.getContext('2d')
		
		screenContext.imageSmoothingEnabled = false
		bufferContext.imageSmoothingEnabled = false

		// Frame rate control
		let eraseDelta = 0
		let scenarioDelta = 0

		const frameLoop = (rn: DOMHighResTimeStamp) => {
			requestAnimationFrame(frameLoop)

			/*
			if (rn - eraseDelta < eraseFPS) {
				return
			}

			eraseDelta = 0
			*/

			if (rn - scenarioDelta < scenarioFPS) {
				return
			}

			scenarioDelta = rn

			// Clear contexts inb4 each frame
			screenContext.clearRect(0, 0, width, height)
			bufferContext.clearRect(0, 0, width, height)


			// Draw adaptive grid
			drawScenario(screenContext, [], '#2dabff90', '#63ff9899', 1)

			// Draw scenario sans content rectangles
			drawScenario(bufferContext, overprintScenario, '#ffffff00', '#63ff9899', 1.1)

			if (eraseIterationsCount == eraseIterations) {
				eraseUpdated = true
			}

			if (!eraseUpdated) {
				if (eraseIterationsCount < eraseIterations) {
					eraseIterationsCount++
					erase(bufferContext, eraseScenario.slice(0, eraseIterationsCount))
				}
			} else {
				eraseIterationsCount = 0
				erase(bufferContext, eraseScenario)
			}

			screenContext.drawImage(bufferCanvasEl, 0, 0)
		}


		//frameLoop()
		
		screenContext.fillStyle = '#63ff9899'
		screenContext.fillRect(0, 0, width, height)
	}

	onMount(() => {
		if (browser) {
			bufferCanvasEl = document.createElement('canvas')
		}

		contentRects.subscribe(contentRects => {
			setEraseScenario()

			console.log(eraseScenario)
			
			eraseUpdated = false
			eraseIterationsCount = 0
		})

		init()
	})
</script>

<svelte:window
	on:resize={setFit}
	bind:devicePixelRatio={dpr}
	/>

<canvas
	bind:this={screenCanvasEl}>
</canvas>

<style>
	canvas {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>

