import React from 'react'

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

export default XHairs