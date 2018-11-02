import React from 'react'

import styles from 'common/components/HorizontalScrubber.module.css'
import Draggable from 'react-draggable'

const AlignmentTool = props => {
	const scrubberWidth = 30

	return (
		<div style={{ width: props.width }} className={styles.track}>
			<Draggable
				axis="x"
				bounds={{ left: 0, right: props.width - scrubberWidth }}
				onDrag={props.onDrag}
			>
				<div
					style={{ width: scrubberWidth }}
					className={styles.scrubber}
				/>
			</Draggable>
		</div>
	)
}

export default AlignmentTool
