import React, { Component } from 'react'

import log from 'common/dev/Logger'

class KeyListener extends Component {
    constructor(props) {
        super(props)

        document.addEventListener('keydown', event => {
            for (let map of props.keyMap) {
                if (map.key === event.key) {
                    map.handler(event)
                }
            }
        })
    }

    shouldComponentUpdate() {
        return false
    }

    render() { return null }
}

export default KeyListener