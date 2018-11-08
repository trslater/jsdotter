import React from 'react'

import styles from './XYController.module.css'

import Draggable from 'react-draggable'

// TODO: Make surface clickable
// TODO: New feature: axis markings

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
					{/* FIXME: Only top-left, bottom-right portions of crosshairs draggable */}
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

export default XYController
