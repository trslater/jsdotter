import React from 'react'

import styles from './Axis.module.css'

// import log from 'common/dev/Logger'

const AxisTick = ({ flipLabel, length, thickness, value, style }) => {
    const halfThickness = thickness / 2
    
	return (
        <div {...{ style }}>
            <div style={{ width: length }}>
                <div
                    className={styles.tickLabel}
                    style={{
                        fontSize: halfThickness,
                        lineHeight: halfThickness + 'px',
                        width: length,
                        height: halfThickness,
                        marginLeft: -length / 2,
                        transform: flipLabel && 'scale(-1, 1)',
                    }}
                >
                    {value}
                </div>

                <div
                    className={styles.tickLine}
                    style={{
                        height: halfThickness,
                    }}
                />
            </div>
        </div>
	)
}

export default AxisTick
