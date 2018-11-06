import React from 'react'

import styles from './JDotterPlotInfo.module.css'

const JDotterPlotInfo = props => {
    const horizSeqNameListItems = props.horizSeqNames.map((name, i) => <li key={i}>{name}</li>)
    const verticalSeqNameListItems = props.verticalSeqNames.map((name, i) => <li key={i}>{name}</li>)
    const characteristicsListItems = [
        <li>Window Size: {props.windowSize}</li>,
        <li>Zoom Factor: {props.zoom}</li>,
        <li>Pixel Factor: {props.pixelFactor}</li>,
        <li>Scoring Matrix: {props.scoreMatrixName}</li>,
    ]

    return (
        <div className={styles.wrapper}>
            <h3>Horizontal Sequences</h3>
            <ul>
                {horizSeqNameListItems}
            </ul>
            <h3>Vertical Sequences</h3>
            <ul>
                {verticalSeqNameListItems}
            </ul>
            <h3>Characteristics</h3>
            <ul>
                {characteristicsListItems}
            </ul>
        </div>
    )
}

export default JDotterPlotInfo