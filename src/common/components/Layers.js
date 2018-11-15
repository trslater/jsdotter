import React from 'react'

import styles from './Layers.module.css'

const Layers = ({ width, height, layers }) => {
	return (
		<div
			className={styles.wrapper}
			style={{
				width: width,
				height: height,
			}}
		>
			{layers.map((layer, i) => (
				<div
					key={i}
					className={styles.layer}
					style={{
						top: layer.topOffset,
						left: layer.leftOffset,
					}}
				>
					{layer.content}
				</div>
			))}
		</div>
	)
}

export default Layers
