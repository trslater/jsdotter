import React, { Component } from 'react'

class FileList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			files: this.props.files,
			options: [],
		}
	}

	componentWillReceiveProps(newProps) {
		this.setState({ ...this.state, files: newProps.files })
	}

	render() {
		const options = this.state.files.map((file, i) => (
			<option key={i} value={file.name}>
				{file.name}
			</option>
		))
		return (
			<select style={{ width: '200px' }} size={this.props.size} multiple>
				{options}
			</select>
		)
	}
}

export default FileList