import React, { Component } from 'react'

import Dropzone from 'react-dropzone'

class FileUploader extends Component {
    onDrop(files) {
        console.log(files)
    }

    render() {
        return (
            <Dropzone onDrop={(files) => this.onDrop(files)} />
        )
    }
}

export default FileUploader