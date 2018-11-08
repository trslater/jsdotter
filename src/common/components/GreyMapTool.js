import React, { PureComponent } from 'react'

import HorizontalScrubber from 'common/components/HorizontalScrubber'

class GreyMapTool extends PureComponent {
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
		const scrubberDefaults = {
			trackWidth: this.props.width,
			scrubberWidth: 30,
			valueRange: [0, 1],
		}
		
		return (
			<div style={{ textAlign: 'left' }}>
				<div>Black point</div>
				<HorizontalScrubber
					{...scrubberDefaults}
					onScrub={this.props.onScrubBlack}
					value={this.props.blackPoint}
				/>

				<canvas
					ref={this.canvas}
					width={this.props.width}
					height={this.props.height}
				/>

				<HorizontalScrubber
					{...scrubberDefaults}
					onScrub={this.props.onScrubWhite}
					value={this.props.whitePoint}
				/>
				<div>White point</div>
			</div>
		)
	}
}

export default GreyMapTool
