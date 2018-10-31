/*

FileUploader.js

Author: Tristan Slater <hello@trslater.ca>

*/

import React, { Component } from 'react'

import Dropzone from 'react-dropzone'

import log from 'common/dev/Logger'

// import { runDev } from '../dev/DevTools'

// FIXME: Figure out why file upload is hanging up

class FileUploader extends Component {
	url = 'http://142.104.33.14:8001/upload/'

	// FEATURE: Sequence name conflict resolver
	// IMPROVEMENT: Clean this up
	async handleFileDrop(files) {
		log.info('Files dropped: %O', files)

		if (files.length > 0) {
			let seqNames = []

			log.info('Uploading batch...')
			for (let file of files) {
				const body = new FormData()

				body.append('file', file)

				log.info(`Uploading ${file.name}`)
				let response
				try {
					response = await fetch(this.url, {
						method: 'POST',
						body: body,
					})
				} catch (e) {
					log.error(e)
				}

				log.info(`Done.`)

				const json = await response.json()
				const namesInFile = json['names']

				seqNames.push(...namesInFile)
			}

			this.props.onGetSeqNames(seqNames)
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
