import React from 'react'

import styles from 'common/components/SeqCompare.module.css'
// import log from 'common/dev/Logger'

const SeqCompare = props => {
	const visibleA = padAndSliceCenteredAt(
		props.seqA,
		props.numVisible,
		' ',
		props.seqALoc,
	).toUpperCase()

	const visibleB = padAndSliceCenteredAt(
		props.seqB,
		props.numVisible,
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
				{makeNucleotide(
					styles.nucleotide,
					props.nucleotideSize,
					nucleotideA,
				)}
				{makeNucleotide(
					styles.nucleotide,
					props.nucleotideSize,
					nucleotideB,
				)}
			</div>,
		)
	}

	return <div className={styles.wrapper}>{nucleotidePairs}</div>
}

const padAndSliceCenteredAt = (string, targetLength, padString, center) => {
	let halfLength = Math.floor(targetLength / 2)
	let sliceStart = Math.max(0, center - halfLength)

	return string
		.padStart(string.length + halfLength - center, padString)
		.slice(sliceStart, sliceStart + targetLength)
		.padEnd(targetLength, padString)
}

const makeNucleotide = (styles, size, value) => (
	<div
		className={styles}
		style={{
			fontSize: size * 0.6,
			// FIXME: Shouldn't need these -2 offsets to compensate for border. There must be a better way
			lineHeight: size - 2 + 'px',
			width: size - 2,
			height: size - 2,
		}}
	>
		{value}
	</div>
)

export default SeqCompare
