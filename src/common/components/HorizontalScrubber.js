import React, { PureComponent } from 'react'

import styles from 'common/components/HorizontalScrubber.module.css'
import Draggable from 'react-draggable'

// import log from 'common/dev/Logger'

class HorizontalScrubber extends PureComponent {
    constructor(props) {
        super(props)

        this.scrubberWidth = 30
        this.maxScrub      = this.props.width - this.scrubberWidth
    }

    handleDrag(e, data) {
        const percent = data.x / this.maxScrub
        this.props.onScrub(percent)
    }

    render() {
        return (
            <div style={{ width: this.props.width }} className={styles.track}>
                <Draggable
                    axis="x"
                    bounds={{ left: 0, right: this.maxScrub }}
                    onDrag={this.handleDrag.bind(this)}
                    // FIXME: need to apply a scale factor. Probably will require refactoring the whole position system
                    position={{ x: this.props.loc, y: 0 }}
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
