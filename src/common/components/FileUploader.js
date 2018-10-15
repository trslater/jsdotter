/*

FileUploader.js

Author: Tristan Slater <hello@trslater.ca>

*/

import React, { Component } from 'react'

import Dropzone from 'react-dropzone'

import { runDev } from '../dev/DevTools'

// FIXME: Figure out why file upload is hanging up

class FileUploader extends Component {
	url = 'http://142.104.33.14:8001/upload/'

	// FEATURE: Sequence name conflict resolver
	async handleFileDrop(files) {
		console.group('Handle File Drop')
		// console.log('Gets here')

		// console.log(typeof console.log)

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
				const namesInFile = json['names']

				runDev(console.log, namesInFile)

				seqNames.push(...namesInFile)
			}

			runDev(console.log, seqNames)

			this.props.onGetSeqNames(...seqNames)
		}
	}

	render() {
		return (
			<div>
				{/* IMPROVEMENT: Use accept prop */}
				<Dropzone onDrop={files => this.handleFileDrop(files)}>
					<div style={{ marginTop: '20px' }}>Drop files here</div>
				</Dropzone>
			</div>
		)
	}
}

export default FileUploader
