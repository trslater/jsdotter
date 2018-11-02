import React, { PureComponent } from 'react'

import styles from 'common/components/AlignmentTool.module.css'

import HorizontalScrubber from 'common/components/HorizontalScrubber'
import SeqCompare from 'common/components/SeqCompare'

import log from 'common/dev/Logger'

const AlignmentTool = props => {
	const nucleotideSize = 22

	return (
		<div className={styles.wrapper}>
			<HorizontalScrubber
				onDrag={props.onDragA}
				width={nucleotideSize*props.width}
				/>
			<SeqCompare
				seqA={props.seqA}
				seqALoc={props.seqAStart}
				
				seqB={props.seqB}
				seqBLoc={props.seqBStart}
				
				width={props.width}
				/>
			<HorizontalScrubber
				onDrag={props.onDragB}
				width={nucleotideSize*props.width}
			/>
		</div>
	)
}


export default AlignmentTool
