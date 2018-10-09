import React, { Component } from 'react'

import Dropzone from 'react-dropzone'
import FileList from './FileList'

class FileUploader extends Component {
	url = 'http://142.104.33.14:8001/upload/'

	constructor(props) {
		super(props)
		this.state = {
			files: [],
		}
		this.selected = []
	}

	handleFileDrop(files) {
		this.setState({ ...this.state, files: files })
	}

	handleListChange(event) {
		this.selected = [].slice
			.call(event.target.selectedOptions)
			.map(opt => parseInt(opt.value))
	}

	handleUploadClick() {
		if (this.state.files.length > 0 && this.selected.length > 0) {
			let stuff = this.uploadFiles(this.selected)

			console.log(stuff)
		}
	}

	// TODO: Make this nicer
	async uploadFiles(indices) {
		let allSeqs = []

		for (let i of this.selected) {
			const data = new FormData()

			data.append('file', this.state.files[i])

			const response = await fetch('http://142.104.33.14:8001/upload/', {
				method: 'POST',
				body: data,
			})

			const json = await response.json()
			const seqs = json["Sequences"]

			allSeqs.push(...seqs)
		}

		return allSeqs
	}

	render() {
		return (
			<div>
				{/* TODO: Figure out what goes in accept prop */}
				<Dropzone onDrop={files => this.handleFileDrop(files)}>
					<div style={{ marginTop: '20px' }}>Drop files here</div>
				</Dropzone>
				{/* TODO: Figure out why these need bind to make this work */}
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
