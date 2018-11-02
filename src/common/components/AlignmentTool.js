import React from 'react'

import styles from 'common/components/AlignmentTool.module.css'

import HorizontalScrubber from 'common/components/HorizontalScrubber'
import SeqCompare from 'common/components/SeqCompare'

// import log from 'common/dev/Logger'

const AlignmentTool = props => {
	const scrubWidth = props.numVisible * props.nucleotideSize

	return (
		<div className={styles.wrapper}>
			<HorizontalScrubber onScrub={props.onScrubA} width={scrubWidth} />
			<SeqCompare
				seqA={props.seqA}
				seqALoc={props.seqAStart}
				seqB={props.seqB}
				seqBLoc={props.seqBStart}
				numVisible={props.numVisible}
				nucleotideSize={props.nucleotideSize}
			/>
			<HorizontalScrubber onScrub={props.onScrubB} width={scrubWidth} />
		</div>
	)
}

export default AlignmentTool
