import React from 'react'

import styles from 'common/components/AlignmentTool.module.css'

import HorizontalScrubber from 'common/components/HorizontalScrubber'
import SeqCompare from 'common/components/SeqCompare'

import log from 'common/dev/Logger'

const AlignmentTool = props => {
	const scrubberDefaults = {
		trackWidth: props.numVisible * props.baseSize,
		scrubberWidth: 30,
	}

	return (
		<div className={styles.wrapper}>
			<HorizontalScrubber
				{...scrubberDefaults}
				valueRange={[0, props.seqA.length]}
				value={props.seqALoc}
				onScrub={props.onScrubA}
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
				{...scrubberDefaults}
				valueRange={[0, props.seqB.length]}
				value={props.seqBLoc}
				onScrub={props.onScrubB}
			/>
		</div>
	)
}

export default AlignmentTool
