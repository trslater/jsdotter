import React, { PureComponent } from 'react'
// TODO: This is wonky... find a better solution
import AlignmentTool from 'common/components/AlignmentTool'

// import log from 'common/dev/Logger'

// TODO: Figure out better way of dealing with dimensions, styling, layout, etc.

class JDotterPanel extends PureComponent {
	constructor(props) {
		super(props)

		this.horizontalSeq =
			'atgctttgtggttgtagacaacattgcaggtgtgacacagcgcttagccgtccgctgtggctgaccatcgtcgcgagtacgaggtcagcatcgagtcacctgctgatgccggtaccacattcggtaagcggatttcacttgacagctggtaattattctacccgacccctggtttcccataatggggtagtcgggctgaacgcgcgtagagacagcgggatctgtttacagcgccaactcgatagtgccgtatatttgacacgcttacccatatatcaagcgcgtccggtgggaagataa'
		this.verticalSeq =
			'atgccttatggcgtgttatcagagttatctgtgaaacagaccccgcctacaggtgtcttaattcgaatatcccgctgtagcaaagtcacttcgcttgagaatcctaagttaaatgtcttgtgtagggatgggccgatagatgaaccttttttaaagtgcagcgcgttgctagatggagcgatgagagaatttccctccacgagattttgccttaaggtcgactcagttgtcttgaccctacgactcgagggtgcgcagggacagtctcgggcaaactctgatctaccccctttcgcttaa'
		this.numVisible = 37
		this.baseSize = 22

		this.state = { x: 0, y: 0 }
	}

	updateX(x) {
		this.setState({ ...this.state, x })
	}

	updateY(y) {
		this.setState({ ...this.state, y })
	}

	handleScrubA(percent) {
		this.updateX(Math.floor(this.horizontalSeq.length * percent))
	}

	handleScrubB(percent) {
		this.updateY(Math.floor(this.verticalSeq.length * percent))
	}

	render() {
		return (
			<AlignmentTool
				seqA={this.horizontalSeq}
				seqAStart={this.state.x}
				onScrubA={this.handleScrubA.bind(this)}
				seqB={this.verticalSeq}
				seqBStart={this.state.y}
				onScrubB={this.handleScrubB.bind(this)}
				numVisible={this.numVisible}
				nucleotideSize={this.nucleotideSize}
			/>
		)
	}
}

export default JDotterPanel
