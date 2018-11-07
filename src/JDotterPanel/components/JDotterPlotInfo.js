import React from 'react'

import styles from './JDotterPlotInfo.module.css'

const JDotterPlotInfo = props => {
    const horizSeqNameListItems = props.horizSeqNames.map((name, i) => <li key={i}>{name}</li>)
    const vertSeqNameListItems = props.vertSeqNames.map((name, i) => <li key={i}>{name}</li>)
    const characteristicsListItems = [
        <li key="0">Window Size: {props.windowSize}</li>,
        <li key="1">Zoom Factor: {props.zoom}</li>,
        <li key="2">Pixel Factor: {props.pixelFactor}</li>,
        <li key="3">Scoring Matrix: {props.scoreMatrixName}</li>,
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

export default JDotterPlotInfo