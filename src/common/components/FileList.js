import React, { Component } from 'react'

const FileList = props => {
	const handleChange = event => {
		let selected = event.target.selectedOptions

		console.log(selected)
	}

	return (
		<select onChange={handleChange} style={{ width: '200px' }} size={props.size} multiple>
			{props.files.map((file, i) => (
				<option key={i} value={file.name}>
					{file.name}
				</option>
			))}
		</select>
	)
}

export default FileList