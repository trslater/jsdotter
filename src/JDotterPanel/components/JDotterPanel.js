import React, { PureComponent } from 'react'

import KeyListener from 'common/components/KeyListener'
import AlignmentTool from 'common/components/AlignmentTool'
import XYController from 'common/components/XYController'
import GreyMapTool from 'common/components/GreyMapTool'
import JDotterPlotResults from 'JDotterPanel/components/JDotterPlotResults'
import Layers from 'common/components/Layers'
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
// FIXME: There is a discrepency between scaling of the xycontroller and the seq lengths

class JDotterPanel extends PureComponent {
	state = {
		horizSeqPosition: this.props.initHorizSeqPosition,
		vertSeqPosition: this.props.initVerticalSeqPosition,
		blackPoint: this.props.initBlackPoint,
		whitePoint: this.props.initWhitePoint,
	}

	constructor(props) {
		super(props)

		this.horizMin = 1
		this.horizMax = this.props.horizSeq.length

		this.vertMin = 1
		this.vertMax = this.props.vertSeq.length

		this.horizRevComp = this.getRevComp(this.props.horizSeq)
		this.vertRevComp = this.getRevComp(this.props.vertSeq)

		this.numVisible = 37
		this.baseSize = 22
	}

	updateSeqPosition(horizSeqPosition, vertSeqPosition) {
		this.setState({
			...this.state,
			horizSeqPosition:
				undefined !== horizSeqPosition
					? horizSeqPosition
					: this.state.horizSeqPosition,
			vertSeqPosition:
				undefined !== vertSeqPosition
					? vertSeqPosition
					: this.state.vertSeqPosition,
		})
	}

	handleScrubA(seqPosition) {
		this.updateSeqPosition(Math.floor(seqPosition))
	}

	handleScrubB(seqPosition) {
		this.updateSeqPosition(Math.floor(seqPosition))
	}

	handleXhairsMove(x, y) {
		this.updateSeqPosition(x, y)
	}

	handleScrubBlack(blackPoint) {
		this.setState({ ...this.state, blackPoint })
	}

	handleScrubWhite(whitePoint) {
		this.setState({ ...this.state, whitePoint })
	}

	handleArrowLeft() {
		if (this.state.horizSeqPosition > this.horizMin) {
			this.setState({
				...this.state,
				horizSeqPosition: this.state.horizSeqPosition - 1,
			})
		}
	}
	handleArrowRight() {
		if (this.state.horizSeqPosition < this.horizMax) {
			this.setState({
				...this.state,
				horizSeqPosition: this.state.horizSeqPosition + 1,
			})
		}
	}
	handleArrowUp() {
		if (this.state.vertSeqPosition > this.vertMin) {
			this.setState({
				...this.state,
				vertSeqPosition: this.state.vertSeqPosition - 1,
			})
		}
	}
	handleArrowDown() {
		if (this.state.vertSeqPosition < this.vertMax) {
			this.setState({
				...this.state,
				vertSeqPosition: this.state.vertSeqPosition + 1,
			})
		}
	}

	render() {
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

		return (
			<div>
				<KeyListener
					keyMap={[
						{
							key: 'ArrowLeft',
							handler: this.handleArrowLeft.bind(this),
						},
						{
							key: 'ArrowRight',
							handler: this.handleArrowRight.bind(this),
						},
						{
							key: 'ArrowUp',
							handler: this.handleArrowUp.bind(this),
						},
						{
							key: 'ArrowDown',
							handler: this.handleArrowDown.bind(this),
						},
					]}
				/>

				<Layers width={width + 25} height={height + 25}>
					<JDotterPlotResults
						{...{ width, height, pixels }}
						blackPoint={this.state.blackPoint}
						whitePoint={this.state.whitePoint}
					/>
					{/* <Axes {...{ width, height, zoom, axisWidth, tickWidth }} /> */}
					<XYController
						{...{ width, height }}
						x={this.state.horizSeqPosition}
						y={this.state.vertSeqPosition}
						xValueRange={[0, this.horizMax]}
						yValueRange={[0, this.vertMax]}
						xhairsSize={80}
						onXhairsMove={this.handleXhairsMove.bind(this)}
					/>
				</Layers>

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
						seqAMin={this.horizMin}
						seqAMax={this.horizMax}
						onScrubA={this.handleScrubA.bind(this)}
						seqB={vertSeq}
						seqBPosition={this.state.vertSeqPosition}
						seqBMin={this.vertMin}
						seqBMax={this.vertMax}
						onScrubB={this.handleScrubB.bind(this)}
						numVisible={this.numVisible}
						baseSize={this.baseSize}
					/>
				</div>

				{/* <div>
					<h2>Reverse Complement Sequence</h2>
					<AlignmentTool
						seqA={this.horizRevComp}
						// FIXME: This don't work
						seqAPosition={
							horizSeq.length - this.state.horizSeqPosition - 1
						}
						onScrubA={this.handleScrubA.bind(this)}
						seqB={vertSeq}
						seqBPosition={this.state.vertSeqPosition}
						onScrubB={this.handleScrubB.bind(this)}
						numVisible={this.numVisible}
						baseSize={this.baseSize}
					/>
				</div> */}

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
