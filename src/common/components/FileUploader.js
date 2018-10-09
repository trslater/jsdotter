import React, { Component } from 'react'

import Dropzone from 'react-dropzone'
import FileList from './FileList'

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

			fetch('http://142.104.33.14:8001/upload/', {
				method: 'POST',
				body: data,
			})
				.then(response => response.json())
				.then(data => this.props.onGetFiles(data["Sequences"]))
				.catch(err => console.log(err))
		}
	}

	render() {
		return (
			<div>
				<Dropzone onDrop={files => this.onDrop(files)}>
					<div style={{ marginTop: '20px' }}>Drop files here</div>
				</Dropzone>
				<FileList files={this.state.files} size="10" />
				<button onClick={() => this.onPress()}>Upload</button>
			</div>
		)
	}
}

export default FileUploader
