/*

App.js

Tasks
-----
TODO: Set up repo on BitBucket
TODO: Convert all handlers to use "class properties"
	- 'transform-class-property'

TODO: Soonish
	- Clean up multiple upload UI

TODO: Components
	- Selectable list component
	- Sequence selector/viewer
	- Apps bar
	- Modal for picking horiz/vert sequences

TODO: Later considerations
    - Drag and drop
	- GraphQL
	- Restructuring
	- Redux

*/

import React, { Component } from 'react'
// import logo from './logo.svg';
import './App.css'

import JDotterLauncher from './common/components/JDotterLauncher'
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

	sendToDotter(horizontal, vertical) {
		console.log(horizontal, vertical)
	}

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
