import React, { PureComponent } from 'react'

import AlignmentTool from 'common/components/AlignmentTool'
import XYController from 'common/components/XYController'
import GreyMapController from 'common/components/GreyMapController'
import JDotterPlotResults from 'JDotterPanel/components/JDotterPlotResults'
import JDotterPlotInfo from 'JDotterPanel/components/JDotterPlotInfo'

import log from 'common/dev/Logger'

// TODO: Improve performance
// 		- Convert everything to PureComponents
// TODO: Figure out better way of dealing with dimensions, styling, layout, etc.
// 			Maybe fine as is (CSS modules)?
// TODO: Implement keyboard controls
// TODO: Improve accuracy
// TODO: Inspect and clean up state
// TODO: Make as many components pure or functional/stateless as possible

class JDotterPanel extends PureComponent {
	constructor(props) {
		super(props)

		// Constants
		this.horizRevComp = this.getRevComp(this.props.horizSeq)
		this.vertRevComp = this.getRevComp(this.props.vertSeq)
		this.numVisible = 37
		this.baseSize = 22

		// Init state
		this.state = {
			horizSeqPosition: this.props.initHorizSeqPosition,
			vertSeqPosition: this.props.initVerticalSeqPosition,
			blackPoint: this.props.initBlackPoint,
			whitePoint: this.props.initWhitePoint,
		}
	}

	updateHorizSeqPosition(horizSeqPosition) {
		this.setState({ ...this.state, horizSeqPosition })
	}

	updateVerticalSeqPosition(vertSeqPosition) {
		this.setState({ ...this.state, vertSeqPosition })
	}

	handleScrubA(seqPosition) {
		this.updateHorizSeqPosition(Math.floor(seqPosition))
	}

	handleScrubB(seqPosition) {
		this.updateVerticalSeqPosition(Math.floor(seqPosition))
	}

	handleXhairsMove(e, { x, y }) {
		this.updateHorizSeqPosition(x * this.props.zoom)
		this.updateVerticalSeqPosition(y * this.props.zoom)
	}

	handleScrubBlack(blackPoint) {
		this.setState({ ...this.state, blackPoint })
	}

	handleScrubWhite(whitePoint) {
		this.setState({ ...this.state, whitePoint })
	}

	render() {
		return (
			<div>
				<div>
					<XYController
						width={this.props.width}
						height={this.props.height}
						x={Math.floor(this.state.horizSeqPosition / this.props.zoom)}
						y={Math.floor(this.state.vertSeqPosition / this.props.zoom)}
						xhairsSize={50}
						onXhairsMove={this.handleXhairsMove.bind(this)}
					>
						<JDotterPlotResults
							blackPoint={this.state.blackPoint}
							whitePoint={this.state.whitePoint}
							image={this.props.image}
						/>
					</XYController>
				</div>

				<div>
					<GreyMapController
						width={200}
						height={50}
						blackPoint={this.state.blackPoint}
						whitePoint={this.state.whitePoint}
						onScrubBlack={this.handleScrubBlack.bind(this)}
						onScrubWhite={this.handleScrubWhite.bind(this)}
					/>
				</div>

				<div>
					<h2>Sequence</h2>
					<AlignmentTool
						seqA={this.props.horizSeq}
						seqAPosition={this.state.horizSeqPosition}
						onScrubA={this.handleScrubA.bind(this)}
						seqB={this.props.vertSeq}
						seqBPosition={this.state.vertSeqPosition}
						onScrubB={this.handleScrubB.bind(this)}
						numVisible={this.numVisible}
						baseSize={this.baseSize}
					/>
				</div>

				<div>
					<h2>Reverse Complement Sequence</h2>
					<AlignmentTool
						seqA={this.horizRevComp}
						seqAPosition={this.state.horizSeqPosition}
						onScrubA={this.handleScrubA.bind(this)}
						seqB={this.vertRevComp}
						seqBPosition={this.state.vertSeqPosition}
						onScrubB={this.handleScrubB.bind(this)}
						numVisible={this.numVisible}
						baseSize={this.baseSize}
					/>
				</div>

				<div>
					<h2>Plot Info</h2>
					<JDotterPlotInfo
						horizSeqNames={this.props.horizSeqNames}
						vertSeqNames={this.props.vertSeqNames}
						windowSize={this.props.windowSize}
						zoom={this.props.zoom}
						pixelFactor={this.props.pixelFactor}
						scoreMatrixName={this.props.scoreMatrixName}
					/>
				</div>
			</div>
		)
	}

	// TODO: Move to external tool
	getRevComp(seq) {
		let revComp = ''

		const tt = {
			C: 'G',
			G: 'C',
			T: 'A',
			A: 'T',
		}

		for (let base of seq) {
			revComp = tt[base] + revComp
		}

		return revComp
	}
}

export default JDotterPanel
