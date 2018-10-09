import React, { Component } from 'react'

import Dropzone from 'react-dropzone'
import FileList from './FileList'

class FileUploader extends Component {
	url = 'http://142.104.33.14:8001/upload/'

	constructor(props) {
		super(props)
		this.state = {
			files: [],
			seqNames: [],
		}
		this.selectedFiles = []
	}

	handleFileDrop(files) {
		this.setState({ ...this.state, files: files })
	}

	handleListChange(event) {
		this.selectedFiles = [].slice
			.call(event.target.selectedOptions)
			.map(opt => parseInt(opt.value))
	}

	// TODO: Seq name conflicts
	async handleUploadClick() {
		if (this.state.files.length > 0 && this.selectedFiles.length > 0) {
			let seqNames = []

			for (let i of this.selectedFiles) {
				const body = new FormData()

				body.append('file', this.state.files[i])

				const response = await fetch(
					'http://142.104.33.14:8001/upload/',
					{
						method: 'POST',
						body: body,
					},
				)

				const json = await response.json()
				const namesInFile = json['Sequences']

				seqNames.push(...namesInFile)
			}

			this.props.onGetSeqNames(seqNames)
		}
	}

	render() {
		return (
			<div>
				{/* TODO: Accept prop */}
				<Dropzone onDrop={files => this.handleFileDrop(files)}>
					<div style={{ marginTop: '20px' }}>Drop files here</div>
				</Dropzone>
				{/* TODO: Why do these need bind to make `this` work */}
				<FileList
					files={this.state.files}
					onChange={this.handleListChange.bind(this)}
				/>
				<button onClick={this.handleUploadClick.bind(this)}>
					Upload
				</button>
			</div>
		)
	}
}

export default FileUploader
