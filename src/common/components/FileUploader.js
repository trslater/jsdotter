import React, { Component } from 'react'

import Dropzone from 'react-dropzone'
import Button from '@material-ui/core/Button'

class FileUploader extends Component {
	url = 'http://142.104.33.14:8000/jdotter/?app=JDotter'

	constructor(props) {
		super(props)
		this.state = { files: [] }
	}

    onDrop(files) {
        this.setState({ ...this.state, files: files })
	}

	onPress() {
		if (this.state.files.length > 0) {
			const data = new FormData()

			data.append('file', this.state.files[0])

			fetch('http://142.104.33.14:8000/upload/', {
				method: 'POST',
				body: data,
			})
				.then(response => response.json)
				.then(json => console.log(json))
                .catch(err => console.log(err))

            this.setState({ ...this.state, files: [] })
		}
    }

    render() {
        return (
			<div>
				<Dropzone onDrop={files => this.onDrop(files)} />
				<Button onClick={() => this.onPress()}>Upload</Button>
			</div>
        )
    }
}

export default FileUploader