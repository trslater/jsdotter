import React from 'react'
import childFriendly from 'material-ui/svg-icons/places/child-friendly'

const Layers = ({ width, height, children }) => {
	return (
		<div
			style={{
				display: 'inline-block',
				width: width,
				height: height,
				position: 'relative',
			}}
		>
			{children.map((child, i) => (
				<div
					key={i}
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
					}}
				>
					{child}
				</div>
			))}
		</div>
	)
}

export default Layers
