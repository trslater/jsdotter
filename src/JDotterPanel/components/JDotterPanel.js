import React, { PureComponent } from 'react'

import AlignmentTool from 'common/components/AlignmentTool'
import XYController from 'common/components/XYController'
import GreyMapTool from 'common/components/GreyMapTool'
import JDotterPlotResults from 'JDotterPanel/components/JDotterPlotResults'
import JDotterPlotInfo from 'JDotterPanel/components/JDotterPlotInfo'

import log from 'common/dev/Logger'

// TODO: Improve performance
// 		- Convert everything to PureComponents
// 		- Look for places to use shouldComponentUpdate() { return false }
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

	handleXYClick(e) {
		const horizSeqPosition = (e.clientX - e.currentTarget.offsetLeft) * this.props.zoom
		const vertSeqPosition = (e.clientY - e.currentTarget.offsetTop) * this.props.zoom
		
		log.debug('Clicking on', e.currentTarget)
		log.debug('(x, y)', horizSeqPosition, vertSeqPosition)
		this.setState({ ...this.state, horizSeqPosition, vertSeqPosition})
	}

	handleScrubBlack(blackPoint) {
		this.setState({ ...this.state, blackPoint })
	}

	handleScrubWhite(whitePoint) {
		this.setState({ ...this.state, whitePoint })
	}

	render() {
		log.debug('Rendering JDotterPanel')

		const {
			width,
			height,
			pixels,
			horizSeqNames,
			horizSeq,
			vertSeqNames,
			vertSeq,
			windowSize,
			zoom,
			pixelFactor,
			scoreMatrixName,
		} = this.props

		const x = Math.floor(this.state.horizSeqPosition / this.props.zoom)
		const y = Math.floor(this.state.vertSeqPosition / this.props.zoom)

		return (
			<div>
				<div>
					<XYController
						{...{ x, y, width, height }}
						xhairsSize={50}
						onXhairsMove={this.handleXhairsMove.bind(this)}
						onMouseDown={this.handleXYClick.bind(this)}
					>
						<JDotterPlotResults
							{...{ width, height, pixels }}
							blackPoint={this.state.blackPoint}
							whitePoint={this.state.whitePoint}
						/>
					</XYController>
				</div>

				<div>
					<GreyMapTool
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
						seqA={horizSeq}
						seqAPosition={this.state.horizSeqPosition}
						onScrubA={this.handleScrubA.bind(this)}
						seqB={vertSeq}
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
						{...{
							horizSeqNames,
							vertSeqNames,
							windowSize,
							zoom,
							pixelFactor,
							scoreMatrixName,
						}}
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
