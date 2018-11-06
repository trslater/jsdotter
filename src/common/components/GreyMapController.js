import React, { PureComponent } from 'react'

import HorizontalScrubber from 'common/components/HorizontalScrubber'

// FIXME: Gradient and actual image don't swap black and white at the same point

class GreyMapSlider extends PureComponent {
	constructor(props) {
		super(props)

		this.canvas = React.createRef()
	}

	componentDidMount() {
        this.initCanvas()
        this.updateCanvas()
        
	}
    
	componentDidUpdate() {
        this.updateCanvas()
    }
    
    initCanvas() {
        this.canvas.current.width = this.props.width
		this.canvas.current.height = this.props.height
    }

    updateCanvas() {
        this.context = this.canvas.current.getContext('2d')

		let gradient = this.context.createLinearGradient(0, 0, this.props.width, 0)
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
					loc={this.props.blackPoint}
				/>

				<canvas ref={this.canvas} />

				<HorizontalScrubber
					width={this.props.width}
					onScrub={this.props.onScrubWhite}
					valueRange={[0, 1]}
					loc={this.props.whitePoint}
				/>
				<div>White point</div>
			</div>
		)
	}
}

export default GreyMapSlider
