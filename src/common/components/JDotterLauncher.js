import React, { Component } from 'react'

import Modal from 'react-modal'
import SequenceList from './SequenceList'

Modal.setAppElement('#root')

class JDotterLauncher extends Component {
	constructor(props) {
		super(props)

		this.state = {
			modalIsOpen: false,
			verticalSeqs: [],
			horizontalSeqs: [],
		}

		this.selectedSeqs = []

		this.handleOpenClick = this.handleOpenClick.bind(this)
		this.handleCloseClick = this.handleCloseClick.bind(this)
		this.handleListChange = this.handleListChange.bind(this)
		this.handleAddVerticalClick = this.handleAddVerticalClick.bind(this)
		this.handleAddHorizontalClick = this.handleAddHorizontalClick.bind(this)
		this.handleLaunchClick = this.handleLaunchClick.bind(this)
	}

	handleOpenClick() {
		this.setState({ modalIsOpen: true })
	}

	handleCloseClick() {
		this.setState({ modalIsOpen: false })
	}

	handleListChange(event) {
		this.selectedSeqs = [].slice
			.call(event.target.selectedOptions)
			.map(opt => parseInt(opt.value))
	}

	handleAddVerticalClick() {
		this.setState({ verticalSeqs: this.selectedSeqs })
	}

	handleAddHorizontalClick() {
		this.setState({ horizontalSeqs: this.selectedSeqs })
	}

	handleLaunchClick() {
		console.log('Launching JDotter with:')
		console.log(
			'Horizontal: ' + this.props.seqNames[this.state.horizontalSeqs],
		)
		console.log('Vertical: ' + this.props.seqNames[this.state.verticalSeqs])
	}

	render() {
		return (
			<div>
				<Modal isOpen={this.state.modalIsOpen}>
					<div>
						<button onClick={this.handleCloseClick}>X</button>
					</div>

					<div>
						<SequenceList
							onChange={this.handleListChange}
							seqNames={this.props.seqNames}
						/>
					</div>

					<div>
						<button onClick={this.handleAddVerticalClick}>
							Add Vertical
						</button>
						<SequenceList
							seqNames={this.state.verticalSeqs.map(
								i => this.props.seqNames[i],
							)}
						/>
					</div>

					<div>
						<button onClick={this.handleAddHorizontalClick}>
							Add Horizontal
						</button>
						<SequenceList
							seqNames={this.state.horizontalSeqs.map(
								i => this.props.seqNames[i],
							)}
						/>
					</div>

					<div>
						<button onClick={this.handleLaunchClick}>
							Launch JDotter
						</button>
					</div>
				</Modal>
				<button onClick={this.handleOpenClick}>JDotter</button>
			</div>
		)
	}
}

export default JDotterLauncher
