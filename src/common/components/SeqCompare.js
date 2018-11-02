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

	const basePairs = []
	for (let i = 0; i < visibleA.length; i++) {
		const baseA = visibleA[i]
		const baseB = visibleB[i]

		const basePairClasses = [styles.basePair]

		const isCenter = i === Math.floor(props.width / 2)
		if (isCenter) {
			basePairClasses.push(styles.center)
		}

		if (
			baseA !== ' ' &&
			baseB !== ' ' &&
			baseA === baseB
		) {
			basePairClasses.push(styles.match)
		}

		basePairs.push(
			<div key={i} className={basePairClasses.join(' ')}>
				{makeBase(
					styles.base,
					props.baseSize,
					baseA,
				)}
				{makeBase(
					styles.base,
					props.baseSize,
					baseB,
				)}
			</div>,
		)
	}

	return <div className={styles.wrapper}>{basePairs}</div>
}

const padAndSliceCenteredAt = (string, targetLength, padString, center) => {
	let halfLength = Math.floor(targetLength / 2)
	let sliceStart = Math.max(0, center - halfLength)

	return string
		.padStart(string.length + halfLength - center, padString)
		.slice(sliceStart, sliceStart + targetLength)
		.padEnd(targetLength, padString)
}

const makeBase = (styles, size, value) => (
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
