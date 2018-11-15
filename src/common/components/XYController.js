import React, { PureComponent } from 'react'

import styles from './XYController.module.css'

import XHairs from 'common/components/Xhairs'

// import log from 'common/dev/Logger'

class XYController extends PureComponent {
	///////////////
	// LIFECYCLE //
	///////////////

	constructor(props) {
		super(props)

		const {
			width,
			height,
			xhairsSize,
			xValueRange: [xMin, xMax],
			yValueRange: [yMin, yMax],
		} = this.props

		// Refs
		this.field = React.createRef()

		// Calculate once for performance
		this.xValuePixelRatio = (xMax - xMin) / width
		this.yValuePixelRatio = (yMax - yMin) / height
		this.xhairsOffset = xhairsSize / 2

		this.state = { dragging: false }

		document.addEventListener('mousemove', this.handleMouseMove.bind(this))
		document.addEventListener('mouseup', this.handleMouseUp.bind(this))
	}

	componentDidMount() {
		this.fieldBox = this.field.current.getBoundingClientRect()
	}

	render() {
		const { width, height, x, y, xhairsSize } = this.props

		const xPx = x / this.xValuePixelRatio
		const yPx = y / this.yValuePixelRatio

		return (
			<div
				ref={this.field}
				className={styles.field}
				style={{
					width: width,
					height: height,
				}}
				onMouseDown={this.handleMouseDown.bind(this)}
			>
				<div
					className={styles.xhairsWrapper}
					style={{
						left: xPx - this.xhairsOffset,
						top: yPx - this.xhairsOffset,
					}}
				>
					<XHairs xhairsSize={xhairsSize} {...{ x, y }} />
				</div>
			</div>
		)
	}

	////////////////////
	// EVENt HANDLERS //
	////////////////////

	handleMouseDown(e) {
		e.preventDefault()

		this.setState({ ...this.state, dragging: true })

		const [xPx, yPx] = this.constrainXYPx(
			e.pageX - this.fieldBox.left,
			e.pageY - this.fieldBox.top,
		)

		this.props.onXhairsMove(
			xPx * this.xValuePixelRatio,
			yPx * this.yValuePixelRatio,
		)
	}

	handleMouseMove(e) {
		const [xPx, yPx] = this.constrainXYPx(
			e.pageX - this.fieldBox.left,
			e.pageY - this.fieldBox.top,
		)

		if (this.state.dragging) {
			this.props.onXhairsMove(
				xPx * this.xValuePixelRatio,
				yPx * this.yValuePixelRatio,
			)
		}
	}

	handleMouseUp(e) {
		this.setState({ ...this.state, dragging: false })
	}

	///////////
	// UTILS //
	///////////

	constrainXYPx(x, y) {
		return [
			x < 0 ? 0 : x > this.props.width ? this.props.width : x,
			y < 0 ? 0 : y > this.props.height ? this.props.height : y,
		]
	}
}

export default XYController
