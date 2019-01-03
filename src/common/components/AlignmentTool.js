import React, { PureComponent } from 'react'

import styles from 'common/components/AlignmentTool.module.css'

import HorizontalScrubber from 'common/components/HorizontalScrubber'
import SeqCompare from 'common/components/SeqCompare'

// import log from 'common/dev/Logger'

class AlignmentTool extends PureComponent {
	render() {
		const {
			numVisible,
			baseSize,
			seqA,
			seqAMin,
			seqAMax,
			seqAPosition,
			seqB,
			seqBMin,
			seqBMax,
			seqBPosition,
			onScrubA,
			onScrubB,
		} = this.props

		const scrubberDefaults = {
			trackWidth: numVisible * baseSize,
			scrubberWidth: 30,
		}
	
		return (
			<div className={styles.wrapper}>
				<HorizontalScrubber
					{...scrubberDefaults}
					valueRange={[seqAMin, seqAMax]}
					value={seqAPosition}
					onScrub={onScrubA}
				/>
				<SeqCompare
					seqA={seqA}
					seqALabel={'Horizontal'}
					seqAPosition={seqAPosition}
					seqB={seqB}
					seqBLabel={'Vertical'}
					seqBPosition={seqBPosition}
					numVisible={numVisible}
					baseSize={baseSize}
				/>
				<HorizontalScrubber
					{...scrubberDefaults}
					valueRange={[seqBMin, seqBMax]}
					value={seqBPosition}
					onScrub={onScrubB}
				/>
			</div>
		)
	}
}

export default AlignmentTool
