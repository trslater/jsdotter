import React from 'react'

import styles from 'common/components/AlignmentTool.module.css'

import HorizontalScrubber from 'common/components/HorizontalScrubber'
import SeqCompare from 'common/components/SeqCompare'

import log from 'common/dev/Logger'

const AlignmentTool = props => {
	const scrubberTrackWidth = props.numVisible * props.baseSize

	log.debug('Scrub width', scrubberTrackWidth)
	log.debug('Seq A width', props.seqA.length)

	return (
		<div className={styles.wrapper}>
			<HorizontalScrubber
				trackWidth={scrubberTrackWidth}
				scrubberWidth={30}
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
				trackWidth={scrubberTrackWidth}
				scrubberWidth={30}
				valueRange={[0, props.seqB.length]}
				value={props.seqBLoc}
				onScrub={props.onScrubB}
			/>
		</div>
	)
}

export default AlignmentTool
