import React, { Component } from 'react'

import Dropzone from 'react-dropzone'

class FileUploader extends Component {
	url = 'http://142.104.33.14:8001/upload/'

	// TODO: Seq name conflicts
	async handleFileDrop(files) {
		if (files.length > 0) {
			let seqNames = []

			for (let file of files) {
				console.log(file)
				const body = new FormData()

				body.append('file', file)

				const response = await fetch(this.url, {
					method: 'POST',
					body: body,
				})

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
			</div>
		)
	}
}

export default FileUploader
