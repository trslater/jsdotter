import React from 'react'

import styles from 'common/components/SeqCompare.module.css'

import log from 'common/dev/Logger'

// TODO: Add current position indicator and number
// TODO: Make this faster!
// TODO: Change 'loc' to 'position'

const SeqCompare = props => {
	const visibleA = padAndSliceCenteredAt(
		props.seqA,
		props.numVisible,
		' ',
		props.seqAPosition,
	)
		.toUpperCase()
		.split('')

	const visibleB = padAndSliceCenteredAt(
		props.seqB,
		props.numVisible,
		' ',
		props.seqBPosition,
	)
		.toUpperCase()
		.split('')

	const basePairs = visibleA.map((baseA, i) => {
		return (
			<BasePair
				key={i}
				popOut={i === Math.floor(props.numVisible / 2)}
				baseA={baseA}
				baseB={visibleB[i]}
				baseSize={props.baseSize}
			/>
		)
	})

	return (
		<div className={styles.wrapper}>
			<div className={styles.info}>
				{props.seqAPosition}
			</div>

			<div className={styles.basePairList}>
				{basePairs}
			</div>

			<div className={styles.info}>
				{props.seqBPosition}
			</div>
		</div>
	)
}

const BasePair = props => {
	const basePairClasses = [styles.basePair]
	if (
		props.baseA === props.baseB &&
		props.baseA !== ' ' &&
		props.baseB !== ' '
	) {
		basePairClasses.push(styles.match)
	}

	if (props.popOut) {
		basePairClasses.push(styles.popOut)
	}

	return (
		<div className={basePairClasses.join(' ')}>
			<Base size={props.baseSize} type={props.baseA} />
			<Base size={props.baseSize} type={props.baseB} />
		</div>
	)
}

const Base = props => {
	return (
		<div
			className={styles.base}
			style={{
				fontSize: props.size * 0.7,
				lineHeight: props.size + 'px',
				width: props.size,
				height: props.size,
			}}
		>
			{props.type}
		</div>
	)
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
