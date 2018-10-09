import React, { Component } from 'react'
// import logo from './logo.svg';
import './App.css'

import FileUploader from './common/components/FileUploader'
import SequenceList from './common/components/SequenceList'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			seqNames: [],
		}
	}

	handleGetSeqNames(seqNames) {
		this.setState({
			...this.state,
			seqNames: seqNames,
		})
	}
	render() {
		return (
			<div className="App">
				<FileUploader
					onGetSeqNames={this.handleGetSeqNames.bind(this)}
				/>
				<SequenceList seqNames={this.state.seqNames} />
			</div>
		)
	}
}

export default App
