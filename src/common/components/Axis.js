import React, { PureComponent } from 'react'

import styles from './Axis.module.css'

import AxisTick from './AxisTick'

class Axis extends PureComponent {
	render() {
		const { type, length, thickness, tickSize, scale } = this.props

		const ticks = Array(Math.ceil(length / tickSize))
			.fill()
			.map((e, i) => (
				<div
					key={i}
					style={{
						position: 'absolute',
						left: i * tickSize,
					}}
				>
					<AxisTick
						flipLabel={type === 'left'}
						length={tickSize}
						thickness={thickness}
						value={i * tickSize * scale + 1}
					/>
				</div>
			))

		return (
			<div
				className={styles.wrapper}
				style={{
					width: length,
					height: thickness,
					transform: type === 'left' && 'rotate(90deg) scale(1, -1)',
					transformOrigin: type === 'left' && 'top left',
				}}
			>
				{ticks}
			</div>
		)
	}
}

export default Axis
