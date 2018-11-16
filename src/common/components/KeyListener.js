import React, { Component } from 'react'

// import log from 'common/dev/Logger'

class KeyListener extends Component {
    constructor(props) {
        super(props)

        document.addEventListener('keydown', event => {
            for (let keyMapping of props.keyMap) {
                if (keyMapping.key === event.key) {
                    keyMapping.handler(event)
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