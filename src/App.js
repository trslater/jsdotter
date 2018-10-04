import React, { Component } from 'react'
// import logo from './logo.svg';
import './App.css'

import Header       from './common/components/Header'
import FileUploader from './common/components/FileUploader'

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header />
				<FileUploader />
				{/* TODO: Make these */}
				{/* <SequenceList /> */}
				{/* <AppButtons /> */}
			</div>
		)
	}
}

export default App
