import React, { PureComponent } from 'react'
// TODO: This is wonky... find a better solution
import AlignmentTool from 'common/components/AlignmentTool'
import XYController from 'common/components/XYController'
import GreyMapController from 'common/components/GreyMapController'
import JDotterPlotResults from 'JDotterPanel/components/JDotterPlotResults'
import JDotterPlotInfo from 'JDotterPanel/components/JDotterPlotInfo';

import log from 'common/dev/Logger'

// TODO: Improve performance
// 		- Convert everything to PureComponents
// TODO: Figure out better way of dealing with dimensions, styling, layout, etc.
// 			Maybe fine as is (CSS modules)?
// TODO: Implement keyboard controls

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
			x: this.props.initX,
			y: this.props.initY,
			blackPoint: this.props.initBlackPoint,
			whitePoint: this.props.initWhitePoint,
		}
	}

	updateX(x) {
		this.setState({ ...this.state, x })
	}

	updateY(y) {
		this.setState({ ...this.state, y })
	}

	handleScrubA(value) {
		this.updateX(value)
	}

	handleScrubB(value) {
		this.updateY(value)
	}

	handleXhairsMove(e, { x, y }) {
		this.setState({ ...this.state, x, y })
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
						x={this.state.x}
						y={this.state.y}
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
						seqALoc={this.state.x}
						onScrubA={this.handleScrubA.bind(this)}
						seqB={this.props.verticalSeq}
						seqBLoc={this.state.y}
						onScrubB={this.handleScrubB.bind(this)}
						numVisible={this.numVisible}
						baseSize={this.baseSize}
					/>
				</div>

				<div>
					<h2>Reverse Complement Sequence</h2>
					<AlignmentTool
						seqA={this.horizRevComp}
						seqALoc={this.state.x}
						onScrubA={this.handleScrubA.bind(this)}
						seqB={this.verticalRevComp}
						seqBLoc={this.state.y}
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
