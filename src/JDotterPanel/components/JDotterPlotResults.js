import React, { PureComponent } from 'react'

import log from 'common/dev/Logger'

// FIXME: Sometimes get an error:
//          "IndexSizeError: Failed to execute 'getImageData' on 'CanvasRenderingContext2D': The source width is 0."

class JDotterPlotResults extends PureComponent {
	constructor(props) {
		super(props)

		this.canvas = React.createRef()
	}

	componentDidMount() {
		this.context = this.canvas.current.getContext('2d')

		this.canvas.current.width = this.props.image.width
		this.canvas.current.height = this.props.image.height

		this.context.drawImage(
			this.props.image,
			0,
			0,
			this.props.image.width,
			this.props.image.height,
			0,
			0,
			this.props.image.width,
			this.props.image.height,
		)
		this.imageData = this.context.getImageData(
			0,
			0,
			this.canvas.current.width,
			this.canvas.current.height,
        )
        
        this.origPixels = [...this.imageData.data]

		this.numPixels = Math.floor(this.imageData.data.length / 4)
	}

	componentDidUpdate() {
		const blackPoint8Bit = this.props.blackPoint * 255
		const whitePoint8Bit = this.props.whitePoint * 255

		for (let i = 0; i < this.numPixels; i++) {
			const curr = this.origPixels[4 * i]
			const adj =
				(255 / (whitePoint8Bit - blackPoint8Bit)) *
				(curr - blackPoint8Bit)

			for (let j = 0; j < 3; j++) {
				this.imageData.data[4 * i + j] = adj
			}
		}

		// log.debug(this.canvas.current)
		this.context = this.canvas.current.getContext('2d')
		this.context.putImageData(this.imageData, 0, 0)
	}

	render() {
		return (
			<div>
				<canvas ref={this.canvas} />
			</div>
		)
	}
}

export default JDotterPlotResults
