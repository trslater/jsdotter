/*

App.js

Tasks
-----
TODO: Rewrite README.md
TODO: Implement testing framework
		- For now, thinking Jest + Enzyme
TODO: Start using prop-types

BACKBURNER: Drag and drop
BACKBURNER: GraphQL
BACKBURNER: Restructuring
BACKBURNER: Redux

*/

import React, { Component } from 'react'
import 'App.css'

// import JDotterLauncher from 'common/components/JDotterLauncher'
// import FileUploader from 'common/components/FileUploader'
// import SequenceList from 'common/components/SequenceList'

// import log from 'common/dev/Logger'

// TESTING:
import JDotterPanelContainerMock from 'JDotterPanel/components/JDotterPanelContainerMock'

class App extends Component {
	state = {
		seqNames: [],
	}

	handleGetSeqNames(seqNames) {
		this.setState({
			...this.state,
			seqNames: seqNames,
		})
	}

	sendToDotter(horizontal, vertical) {
	}

	// FEATURE: Send vertical and horizontal sequences to JDotter
	handleJDotterClick() {}

	render() {
		return (
			<div className="App">
				{/* <JDotterLauncher seqNames={this.state.seqNames} />
				<FileUploader
					onGetSeqNames={this.handleGetSeqNames.bind(this)}
				/>
				<SequenceList seqNames={this.state.seqNames} /> */}
				{/* TESTING: */}
				<JDotterPanelContainerMock />
			</div>
		)
	}
}

export default App
