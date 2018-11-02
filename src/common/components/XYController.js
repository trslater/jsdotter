import React from 'react'

import styles from './XYController.module.css'

import Draggable from 'react-draggable'

const XYController = props => {
    const xhairsOffset = props.xhairsSize / 2
    
	return (
		<div className={styles.wrapper}>
			{/* TODO: Replace "xhairs" with proper xhairs, perhaps SVG, canvas, etc. */}

			<div
				className={styles.field}
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
				>
					<div
						className={styles.xhairsWrapper}
						style={{
							width: props.xhairsSize,
							height: props.xhairsSize,
						}}
					>
						<div
                            className={styles.xhairsCursor}
                            style={{
                                fontSize: props.xhairsSize + 'px',
                                lineHeight: props.xhairsSize + 'px',
                                width: props.xhairsSize,
							    height: props.xhairsSize,
                                marginLeft: -xhairsOffset,
                                marginTop: -xhairsOffset,
                            }}
                        >
                            +
                        </div>
                        
                        <div>
                            ({props.x}, {props.y})
                        </div>
					</div>
				</Draggable>
				{props.children}
			</div>
		</div>
	)
}

export default XYController
