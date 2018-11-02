import React from 'react'

import styles from 'common/components/AlignmentTool.module.css'

import HorizontalScrubber from 'common/components/HorizontalScrubber'
import SeqCompare from 'common/components/SeqCompare'

// import log from 'common/dev/Logger'

const AlignmentTool = props => {
	const scrubWidth = props.numVisible * props.baseSize

	return (
		<div className={styles.wrapper}>
			<HorizontalScrubber
				onScrub={props.onScrubA} width={scrubWidth}
				loc={props.seqALoc}
			/>
			<SeqCompare
				seqA={props.seqA}
				seqALoc={props.seqALoc}
				seqB={props.seqB}
				seqBLoc={props.seqBLoc}
				numVisible={props.numVisible}
				baseSize={props.baseSize}
				/>
			<HorizontalScrubber
				onScrub={props.onScrubB} width={scrubWidth}
				loc={props.seqBLoc}
			/>
		</div>
	)
}

export default AlignmentTool
