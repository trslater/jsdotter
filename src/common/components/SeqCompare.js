import React from 'react'

import styles from 'common/components/SeqCompare.module.css'
import log from 'common/dev/Logger'

const SeqCompare = props => {
	log.debug('render seq compare')

	const visibleA = padAndSliceCenteredAt(
		props.seqA,
		props.width,
		' ',
		props.seqALoc,
	).toUpperCase()

	const visibleB = padAndSliceCenteredAt(
		props.seqB,
		props.width,
		' ',
		props.seqBLoc,
	).toUpperCase()

	const nucleotidePairs = []
	for (let i = 0; i < visibleA.length; i++) {
		const nucleotideA = visibleA[i]
		const nucleotideB = visibleB[i]

		const nucleotidePairClasses = [styles.nucleotidePair]

		const isCenter = i === Math.floor(props.width / 2)
		if (isCenter) {
			nucleotidePairClasses.push(styles.center)
		}

		if (
			nucleotideA !== ' ' &&
			nucleotideB !== ' ' &&
			nucleotideA === nucleotideB
		) {
			nucleotidePairClasses.push(styles.match)
		}

		nucleotidePairs.push(
			<div key={i} className={nucleotidePairClasses.join(' ')}>
				<div className={styles.nucleotide}>{nucleotideA}</div>
				<div className={styles.nucleotide}>{nucleotideB}</div>
			</div>,
		)
	}

	return (
		<div className={styles.wrapper} ref={props.wrapperRef}>
			{nucleotidePairs}
		</div>
	)
}

const padAndSliceCenteredAt = (string, targetLength, padString, center) => {
	let halfLength = Math.floor(targetLength / 2)
	let sliceStart = Math.max(0, center - halfLength)

	return string
		.padStart(string.length + halfLength - center, padString)
		.slice(sliceStart, sliceStart + targetLength)
		.padEnd(targetLength, padString)
}

export default SeqCompare
