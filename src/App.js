/*

App.js

Tasks
-----
TODO: Rewrite README.md

BACKBURNER: Later considerations
BACKBURNER: Drag and drop
BACKBURNER: GraphQL
BACKBURNER: Restructuring
BACKBURNER: Redux

*/

import React, { Component } from 'react'
// FIXME:
// import logo from './logo.svg';
import './App.css'

import JDotterLauncher from './common/components/JDotterLauncher'
import FileUploader from './common/components/FileUploader'
import SequenceList from './common/components/SequenceList'

import log from './common/dev/Logger'

class App extends Component {
	constructor(props) {
		super(props)
		log.debug('Creating: %O', this)
		this.state = {
			seqNames: [],
		}
		log.debug('Initial state: %O', this.state)
	}

	handleGetSeqNames(seqNames) {
		this.setState({
			...this.state,
			seqNames: seqNames,
		})
	}

	sendToDotter(horizontal, vertical) {
		console.log(horizontal, vertical)
	}

	// FEATURE: Send vertical and horizontal sequences to JDotter
	handleJDotterClick() {}

	render() {
		return (
			<div className="App">
				<JDotterLauncher seqNames={this.state.seqNames} />
				<FileUploader
					onGetSeqNames={this.handleGetSeqNames.bind(this)}
				/>
				<SequenceList seqNames={this.state.seqNames} />
			</div>
		)
	}
}

export default App
