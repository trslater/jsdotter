import React, { PureComponent } from 'react'

import styles from './JDotterPlotInfo.module.css'

// import log from 'common/dev/Logger'

class JDotterPlotInfo extends PureComponent {
    render() {
        const {
            horizSeqNames,
            vertSeqNames,
            windowSize,
            zoom,
            pixelFactor,
            scoreMatrixName,
        } = this.props

        const horizSeqNameListItems = horizSeqNames.map((name, i) => <li key={i}>{name}</li>)
        const vertSeqNameListItems = vertSeqNames.map((name, i) => <li key={i}>{name}</li>)
        const characteristicsListItems = [
            <li key="0">Window Size: {windowSize}</li>,
            <li key="1">Zoom Factor: {zoom}</li>,
            <li key="2">Pixel Factor: {pixelFactor}</li>,
            <li key="3">Scoring Matrix: {scoreMatrixName}</li>,
        ]
    
        return (
            <div className={styles.wrapper}>
                <h3>Horizontal Sequences</h3>
                <ul>
                    {horizSeqNameListItems}
                </ul>
                <h3>Vertical Sequences</h3>
                <ul>
                    {vertSeqNameListItems}
                </ul>
                <h3>Characteristics</h3>
                <ul>
                    {characteristicsListItems}
                </ul>
            </div>
        )
    }
}

export default JDotterPlotInfo