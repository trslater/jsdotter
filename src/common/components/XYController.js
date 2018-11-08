import React from 'react'

import styles from './XYController.module.css'

import Draggable from 'react-draggable'

import log from 'common/dev/Logger'

// TODO: New feature: axis markings
// FIXME: Move xhairs to mouse click works, but it does not initiate drag

// const x = Math.floor(this.state.horizSeqPosition / this.props.zoom)
// 		const y = Math.floor(this.state.vertSeqPosition / this.props.zoom)

const XYController = props => {
	const xhairsOffset = props.xhairsSize / 2

	return (
		<div className={styles.wrapper}>
			<div
				className={styles.field}
				onMouseDown={props.onMouseDown}
				style={{
					width: props.width,
					height: props.height,
				}}
			>
				<Draggable
					bounds={{
						left: 0,
						right: props.width,
						top: 0,
						bottom: props.height,
					}}
					onDrag={props.onXhairsMove}
					position={{ x: props.x, y: props.y }}
					allowAnyClick={true}
				>
					<div
						className={styles.xhairsWrapper}
						style={{
							width: props.xhairsSize,
							height: props.xhairsSize,
							marginLeft: -xhairsOffset,
							marginTop: -xhairsOffset,
						}}
					>
						<XHairs xhairsSize={props.xhairsSize} />

						<div className={styles.coords}>
							({props.xCoord}, {props.yCoord})
						</div>
					</div>
				</Draggable>
			</div>
			{props.children}
		</div>
	)
}

const XHairs = ({ xhairsSize }) => {
	return (
		<svg width={xhairsSize} height={xhairsSize}>
			<line
				shape-rendering="crispEdges"
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
				shape-rendering="crispEdges"
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
	)
}

export default XYController
