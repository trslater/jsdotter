import React, { PureComponent } from 'react'

import styles from 'common/components/HorizontalScrubber.module.css'
import Draggable from 'react-draggable'

// import log from 'common/dev/Logger'

class HorizontalScrubber extends PureComponent {
    constructor(props) {
        super(props)

        this.scrubberWidth = 30
        this.maxScrub      = this.props.width - this.scrubberWidth
        this.minValue      = this.props.valueRange[0]
        this.maxValue      = this.props.valueRange[1]
    }

    handleDrag(e, data) {
        const value = data.x * this.maxValue / this.maxScrub
        this.props.onScrub(value)
    }

    render() {
        return (
            <div style={{ width: this.props.width }} className={styles.track}>
                <Draggable
                    axis="x"
                    bounds={{ left: 0, right: this.maxScrub }}
                    onDrag={this.handleDrag.bind(this)}
                    position={{ x: this.props.loc * this.maxScrub / this.maxValue, y: 0 }}
                >
                    <div
                        style={{ width: this.scrubberWidth }}
                        className={styles.scrubber}
                    />
                </Draggable>
            </div>
        )
    }
}

export default HorizontalScrubber
