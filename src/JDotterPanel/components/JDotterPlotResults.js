import React, { PureComponent } from 'react'

// import log from 'common/dev/Logger'

class JDotterPlotResults extends PureComponent {
	state = {
		canvasInitialized: false,
	}

	constructor(props) {
		super(props)

		this.image = React.createRef()
		this.canvas = React.createRef()

		this.handleImageLoad = this.handleImageLoad.bind(this)
	}

	handleImageLoad() {
		this.context = this.canvas.current.getContext('2d')

		this.context.drawImage(
			this.image.current,
			0,
			0,
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

	render() {
		const { width, height, pixels } = this.props

		return (
			<div
				style={{
					width,
					height,
				}}
			>
				<canvas {...{ width, height }} ref={this.canvas} />

				<div style={{ display: 'none' }}>
					<img
						src={'data:image/png;base64,' + pixels}
						ref={this.image}
						alt="Stuffs"
						onLoad={this.handleImageLoad}
					/>
				</div>
			</div>
		)
	}
}

export default JDotterPlotResults
