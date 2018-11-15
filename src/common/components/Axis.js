import React from 'react'

import styles from './Axis.module.css'

import AxisTick from './AxisTick'

const Axis = ({ type, length, thickness, tickSize, scale, style }) => {
	const ticks = Array(Math.ceil(length / tickSize))
		.fill()
		.map((e, i) => (
			<AxisTick
                key={i}
				flipLabel={type === 'left'}
				length={tickSize}
				thickness={thickness}
                value={i * tickSize * scale + 1}
                style={{
                    position: 'absolute',
                    left: i * tickSize,
                }}
			/>
		))

	return (
        <div {...{ style }}>
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
        </div>
	)
}

export default Axis
