export function render (context: CanvasRenderingContext2D, scenario: boolean[][]) {
	console.log('********************')
	console.log('scenario', scenario)
	console.log('context', context)
	console.log('********************')

	const w = 100 //scenario.length
	const h = 100 //scenario[0].length
	
	for (let i = 0; i <= w; i++) {
		for (let j = 0; j <= h; j++) {
			drawDot(context, shift([i * 50, j * 50]), (Math.random() * 1.0 < 0.5)) //scenario[i][j])
		}
	}
}

function drawDot (context: CanvasRenderingContext2D, [x, y], fill: boolean) {
	//context.strokeStyle = '#000'
	context.strokeStyle = '#2DABFF'
	context.beginPath()
	context.arc(x, y, 24, 0, Math.PI * 2)
	context.stroke()

	context.fillStyle = '#2DABFF'
	//context.fillStyle = '#000'

	if (fill) {
		context.fill()
	}
}

function rand (min: number, max: number) {
	return Math.random() * (max - min) + min
}

function shift (coord: [number, number]) {
		return [
			coord[0] * rand(0.998, 1),
			coord[1] * rand(0.997, 1)
		]
}

