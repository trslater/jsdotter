import React, { PureComponent } from 'react'

import log from 'common/dev/Logger'

class KeyListener extends PureComponent {
    constructor(props) {
        super(props)

        document.onkeydown = (event) => {
            event.preventDefault()

            const { key } = event

            for (let map of props.keyMap) {
                if (map.key === key) {
                    map.handler()
                }
            }
        }
    }

    render() { return null }
}

export default KeyListener