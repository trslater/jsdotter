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
		this.verticalRevComp = this.getRevComp(this.props.verticalSeq)
		this.numVisible = 37
		this.baseSize = 22

		// Init state
		this.state = {
			horizSeqLoc: this.props.initHorizSeqLoc,
			verticalSeqLoc: this.props.initVerticalSeqLoc,
			blackPoint: this.props.initBlackPoint,
			whitePoint: this.props.initWhitePoint,
		}
	}

	updateHorizSeqLoc(horizSeqLoc) {
		this.setState({ ...this.state, horizSeqLoc })
	}

	updateVerticalSeqLoc(verticalSeqLoc) {
		this.setState({ ...this.state, verticalSeqLoc })
	}

	handleScrubA(seqLoc) {
		this.updateHorizSeqLoc(seqLoc)
	}

	handleScrubB(seqLoc) {
		this.updateVerticalSeqLoc(seqLoc)
	}

	handleXhairsMove(e, { x, y }) {
		this.updateHorizSeqLoc(x * this.props.zoom)
		this.updateVerticalSeqLoc(y * this.props.zoom)
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
						x={this.state.horizSeqLoc / this.props.zoom}
						y={this.state.verticalSeqLoc / this.props.zoom}
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
						seqALoc={this.state.horizSeqLoc}
						onScrubA={this.handleScrubA.bind(this)}
						seqB={this.props.verticalSeq}
						seqBLoc={this.state.verticalSeqLoc}
						onScrubB={this.handleScrubB.bind(this)}
						numVisible={this.numVisible}
						baseSize={this.baseSize}
					/>
				</div>

				<div>
					<h2>Reverse Complement Sequence</h2>
					<AlignmentTool
						seqA={this.horizRevComp}
						seqALoc={this.state.horizSeqLoc}
						onScrubA={this.handleScrubA.bind(this)}
						seqB={this.verticalRevComp}
						seqBLoc={this.state.verticalSeqLoc}
						onScrubB={this.handleScrubB.bind(this)}
						numVisible={this.numVisible}
						baseSize={this.baseSize}
					/>
				</div>

				<div>
					<h2>Plot Info</h2>
					<JDotterPlotInfo
						horizSeqNames={this.props.horizSeqNames}
						verticalSeqNames={this.props.verticalSeqNames}
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
