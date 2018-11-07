import React, { PureComponent } from 'react'

import styles from 'common/components/HorizontalScrubber.module.css'
import Draggable from 'react-draggable'

import log from 'common/dev/Logger'

/*
The scrubber takes its position in the form of a value
*/
class HorizontalScrubber extends PureComponent {
	constructor(props) {
		super(props)

		this.minScrub = 0
		this.maxScrub = this.props.trackWidth - this.props.scrubberWidth
		this.minValue = this.props.valueRange[0]
		this.maxValue = this.props.valueRange[1]
	}

	handleDrag(e, data) {
		this.props.onScrub(this.scrubberPositionToValue(data.x))
	}

	render() {
		return (
			<div
				style={{ width: this.props.trackWidth }}
				className={styles.track}
			>
				<Draggable
					axis="x"
					bounds={{ left: this.minScrub, right: this.maxScrub }}
					onDrag={this.handleDrag.bind(this)}
					position={{
						x: this.valueToScrubberPostion(this.props.value),
						y: 0,
                    }}
				>
					<div
						style={{ width: this.props.scrubberWidth }}
						className={styles.scrubber}
					/>
				</Draggable>
			</div>
		)
	}

	valueToScrubberPostion(value) {
		return value * this.maxScrub / this.maxValue
	}

	scrubberPositionToValue(position) {
		return position * this.maxValue / this.maxScrub
	}
}

export default HorizontalScrubber
