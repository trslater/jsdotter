import React, { PureComponent } from 'react'

import log from 'common/dev/Logger'

class JDotterPlotResults extends PureComponent {
	state = {
		canvasInitialized: false,
	}

	componentWillMount() {
		this.image = React.createRef()
		this.canvas = React.createRef()
	}

	componentDidUpdate() {
		if (this.state.canvasInitialized) {
			for (let i = 0; i < this.origPixels.length; i += 4) {
				const origPixelColor = this.origPixels[i]
				const adjustedPixelColor =
					(origPixelColor - 255 * this.props.blackPoint) /
					(this.props.whitePoint - this.props.blackPoint)
	
				for (let j = i; j < i + 3; j++) {
					this.imageData.data[j] = adjustedPixelColor
				}
			}
	
			this.context = this.canvas.current.getContext('2d')
			this.context.putImageData(this.imageData, 0, 0)
		}
	}

	handleImageLoad() {
		this.context = this.canvas.current.getContext('2d')

		this.canvas.current.width = this.image.current.width
		this.canvas.current.height = this.image.current.height

		this.context.drawImage(
			this.image.current,
			0,
			0,
			this.image.current.width,
			this.image.current.height,
			0,
			0,
			this.image.current.width,
			this.image.current.height,
		)
		this.imageData = this.context.getImageData(
			0,
			0,
			this.image.current.width,
			this.image.current.height,
		)
		this.origPixels = [...this.imageData.data]

		this.setState({ ...this.state, canvasInitialized: true })
	}

	render() {
		return (
			<div>
				<div style={{ display: 'none' }}>
					<img
						src={'data:image/png;base64,' + this.props.pixels}
						ref={this.image}
						alt="Stuffs"
						onLoad={this.handleImageLoad.bind(this)}
					/>
				</div>

				<canvas ref={this.canvas} />
			</div>
		)
	}
}

export default JDotterPlotResults
