import React, { PureComponent } from 'react'

import HorizontalScrubber from 'common/components/HorizontalScrubber'

// FIXME: Gradient and actual image don't swap black and white at the same point

class GreyMapSlider extends PureComponent {
	constructor(props) {
		super(props)

		this.canvas = React.createRef()
	}

	componentDidMount() {
		this.updateCanvas()
	}

	componentDidUpdate() {
		this.updateCanvas()
	}

	updateCanvas() {
		this.context = this.canvas.current.getContext('2d')

		let gradient = this.context.createLinearGradient(
			0,
			0,
			this.props.width,
			0,
		)
		gradient.addColorStop(this.props.blackPoint, 'black')
		gradient.addColorStop(this.props.whitePoint, 'white')

		this.context.fillStyle = gradient
		this.context.fillRect(0, 0, this.props.width, this.props.height)
	}

	render() {
		return (
			<div style={{ textAlign: 'left' }}>
				<div>Black point</div>
				<HorizontalScrubber
					width={this.props.width}
					onScrub={this.props.onScrubBlack}
					valueRange={[0, 1]}
					value={this.props.blackPoint}
				/>

				<canvas
					ref={this.canvas}
					width={this.props.width}
					height={this.props.height}
				/>

				<HorizontalScrubber
					width={this.props.width}
					onScrub={this.props.onScrubWhite}
					valueRange={[0, 1]}
					value={this.props.whitePoint}
				/>
				<div>White point</div>
			</div>
		)
	}
}

export default GreyMapSlider
