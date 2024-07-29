export default class Physics {
	context: CanvasRenderingContext2D
	private dotRadius: number
	private dotDiameter: number
	private dotSpacing: number

	constructor (context: CanvasRenderingContext2D) {
		this.context = context
	}

	config (dotRadius: number, dotSpacing: number, strokeStyle: string, fillStyle: string) {
		this.dotRadius = dotRadius
		this.dotDiameter = this.dotRadius * 2
		this.dotSpacing = dotSpacing

		this.context.strokeStyle = strokeStyle
		this.context.fillStyle = fillStyle
	}

	erase (negSpaces: DOMRect[], radius: number, count: number = 3) {
		let i = 0

		// Translate to the center of the rectangle
		//this.context.save();

		while (i <= count) {
			i += 1

			for (const { top, right, bottom, left, width, height } of negSpaces) {
				for (let i = 0; i <= 5; i++) {
					//this.context.rotate(shift(-1, 0, 1) * Math.PI / 180)

					this.context.clearRect(
						left - (radius / 2),
						top - (radius / 2),
						width + radius,
						height + radius
					)
				}
			}
		}

		//this.context.restore()
	}

	drawGrid (scenario) {
		for (const [w, h] of scenario) {
			for (let i = 0; i <= w.length; i++) {
				for (let j = 0; j <= h.length; j++) {
					this.dot(
						i,
						j,
						this.context.strokeStyle == 'rgba(255, 255, 255, 0)' ?
							+(Math.random() < 0.4) :
							false
					)
				}
			}
		}
	}

	private dot (
			i: number,
			j: number,
			fill: boolean
	) {
		const x = i * this.dotDiameter - this.dotRadius
		const y = j * this.dotDiameter - this.dotRadius

		this.context.beginPath()
		this.context.arc(
			Math.round(x), 
			Math.round(y),
			this.dotRadius,
			0,
			Math.PI * 2
		)

		if (fill) {
			this.context.fill()
		} else {
			this.context.stroke()
		}
	}
}

export function shift (value: number, min: number, max: number) {
	return value * (Math.random() * (max - min) + min)
}

