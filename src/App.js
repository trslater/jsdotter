import React, { Component } from 'react'
// import logo from './logo.svg';
import './App.css'

import FileUploader from './common/components/FileUploader'

class App extends Component {
	render() {
		return (
			<div className="App">
				<FileUploader onGetFiles={files => this.onGetFiles(files)} />
			</div>
		)
	}
}

export default App
