import React, { PureComponent } from 'react'

import styles from './BasePair.module.css'

class BasePair extends PureComponent {
    render() {
        const {
            baseA,
            baseB,
            baseSize,
            popOut,
        } = this.props

        const basePairClasses = [styles.wrapper]

        if (
            baseA === baseB &&
            baseA !== ' ' &&
            baseB !== ' '
        ) {
            basePairClasses.push(styles.match)
        }

        if (popOut) {
            basePairClasses.push(styles.popOut)
        }

        return (
            <div className={basePairClasses.join(' ')}>
                <div
                    className={styles.base}
                    style={{
                        fontSize: baseSize * 0.7,
                        lineHeight: baseSize + 'px',
                        width: baseSize,
                        height: baseSize,
                    }}
                >
                    {baseA}
                </div>
                <div
                    className={styles.base}
                    style={{
                        fontSize: baseSize * 0.7,
                        lineHeight: baseSize + 'px',
                        width: baseSize,
                        height: baseSize,
                    }}
                >
                    {baseB}
                </div>
            </div>
        )
    }
}

export default BasePair