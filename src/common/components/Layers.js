import React, { PureComponent } from 'react'

import styles from './Layers.module.css'

import log from 'common/dev/Logger'

class Layers extends PureComponent {
	render() {
		const { width, height, layers } = this.props

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
}

export default Layers
