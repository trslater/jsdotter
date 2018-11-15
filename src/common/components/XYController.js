import React, { PureComponent } from 'react'

import styles from './XYController.module.css'

import log from 'common/dev/Logger'

// TODO: New feature: axis markings @current
// 			- Use SVG
// FIXME: When page is scrolled, dragging is offset by scroll amount
// FIXME: Move xhairs to mouse click works, but it does not initiate drag

// const x = Math.floor(this.state.horizSeqPosition / this.props.zoom)
// 		const y = Math.floor(this.state.vertSeqPosition / this.props.zoom)

class XYController extends PureComponent {

	///////////////
	// LIFECYCLE //
	///////////////

	constructor(props) {
		super(props)

		this.state = { dragging: false }

		const {
			width,
			height,
			xhairsSize,
			xValueRange: [xMin, xMax],
			yValueRange: [yMin, yMax],
		} = this.props

		this.field = React.createRef()

		this.xValuePixelRatio = (xMax - xMin) / width
		this.yValuePixelRatio = (yMax - yMin) / height
		this.xhairsOffset = xhairsSize / 2
		this.xPxMin = xMin / this.xValuePixelRatio
		this.xPxMax = xMax / this.xValuePixelRatio
		this.yPxMin = yMin / this.yValuePixelRatio
		this.yPxMax = yMax / this.yValuePixelRatio

		document.addEventListener('mousemove', this.handleMouseMove.bind(this))
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
					position: 'relative',
				}}
				onMouseDown={this.handleMouseDown.bind(this)}
				onMouseUp={this.handleMouseUp.bind(this)}
			>
				<div
					style={{
						position: 'absolute',
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
			x < this.xPxMin ? this.xPxMin : x > this.xPxMax ? this.xPxMax : x,
			y < this.yPxMin ? this.yPxMin : y > this.yPxMax ? this.yPxMax : y,
		]
	}
}

const XHairs = ({ xhairsSize, x, y }) => {
	return (
		<div>
			<svg width={xhairsSize} height={xhairsSize}>
				<line
					shapeRendering="crispEdges"
					x1="0"
					y1="50%"
					x2="100%"
					y2="50%"
					style={{
						stroke: 'red',
						strokeWidth: '1px',
					}}
				/>
				<line
					shapeRendering="crispEdges"
					x1="50%"
					y1="0"
					x2="50%"
					y2="100%"
					style={{
						stroke: 'red',
						strokeWidth: '1px',
					}}
				/>
			</svg>
			<div
				style={{
					color: 'red',
					fontSize: 10,
					whiteSpace: 'nowrap',
					padding: 5,
					position: 'absolute',
					left: '50%',
					top: '50%',
				}}
			>
				({Math.floor(x)}, {Math.floor(y)})
			</div>
		</div>
	)
}

export default XYController
