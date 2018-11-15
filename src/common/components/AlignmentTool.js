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
				valueRange={[props.seqAMin, props.seqAMax]}
				value={props.seqAPosition}
				onScrub={props.onScrubA}
			/>
			<SeqCompare
				seqA={props.seqA}
				seqALabel={'Horizontal'}
				seqAPosition={props.seqAPosition}
				seqB={props.seqB}
				seqBLabel={'Vertical'}
				seqBPosition={props.seqBPosition}
				numVisible={props.numVisible}
				baseSize={props.baseSize}
			/>
			<HorizontalScrubber
				{...scrubberDefaults}
				valueRange={[props.seqBMin, props.seqBMax]}
				value={props.seqBPosition}
				onScrub={props.onScrubB}
			/>
		</div>
	)
}

export default AlignmentTool
