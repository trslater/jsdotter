import React from 'react'

import styles from './XYController.module.css'

import Draggable from 'react-draggable'

const XYController = props => {
    const xhairsOffset = props.xhairsSize / 2
    
	return (
		<div className={styles.wrapper}>
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
							width: props.xhairsSize / 2,
							height: props.xhairsSize / 2,
						}}
					>
						<div
                            className={styles.xhairsCursor}
                            style={{
                                width: props.xhairsSize / 2,
							    height: props.xhairsSize / 2,
                                marginLeft: -xhairsOffset,
                                marginTop: -xhairsOffset,
                            }}
                        />

                        {/* FIXME: Wraps, shouldn't */}
                        {/* FIXME: Clickable, shouldn't be */}
                        <div>
                            ({props.x}, {props.y})
                        </div>
					</div>
				</Draggable>
			</div>
			{props.children}
		</div>
	)
}

export default XYController
