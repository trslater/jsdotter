import React, { PureComponent } from 'react'

import styles from 'common/components/SeqCompare.module.css'

import BasePair from 'common/components/BasePair'

import log from 'common/dev/Logger'

// TODO: Make this faster!

class SeqCompare extends PureComponent {
	render() {
		const {
			seqA,
			seqALabel,
			seqAPosition,
			seqB,
			seqBLabel,
			seqBPosition,
			numVisible,
			baseSize,
		} = this.props

		const visibleA = padAndSliceCenteredAt(
			seqA,
			numVisible,
			' ',
			seqAPosition,
		)
			.toUpperCase()
			.split('')

		const visibleB = padAndSliceCenteredAt(
			seqB,
			numVisible,
			' ',
			seqBPosition,
		)
			.toUpperCase()
			.split('')

		const basePairs = visibleA.map((baseA, i) => {
			return (
				<BasePair
					key={i}
					popOut={i === Math.floor(numVisible / 2)}
					baseA={baseA}
					baseB={visibleB[i]}
					baseSize={baseSize}
				/>
			)
		})

		return (
			<div className={styles.wrapper}>
				<div className={styles.info}>
					{seqALabel} @ {Math.floor(seqAPosition) + 1}
				</div>

				<div className={styles.basePairList}>
					{basePairs}
				</div>

				<div className={styles.info}>
					{seqBLabel} @ {Math.floor(seqBPosition) + 1}
				</div>
			</div>
		)
	}
}

// TODO: Refactor
const padAndSliceCenteredAt = (string, targetLength, padString, center) => {
	let halfLength = Math.floor(targetLength / 2)
	let sliceStart = Math.max(0, center - halfLength)

	return string
		.padStart(string.length + halfLength - center, padString)
		.slice(sliceStart, sliceStart + targetLength)
		.padEnd(targetLength, padString)
}

export default SeqCompare
