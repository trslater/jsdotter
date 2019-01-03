import React, { PureComponent } from 'react'

import KeyListener from 'common/components/KeyListener'
import AlignmentTool from 'common/components/AlignmentTool'
import XYController from 'common/components/XYController'
import GreyMapTool from 'common/components/GreyMapTool'
import JDotterPlotResults from 'JDotterPanel/components/JDotterPlotResults'
import Layers from 'common/components/Layers'
import Axis from 'common/components/Axis'
import JDotterPlotInfo from 'JDotterPanel/components/JDotterPlotInfo'

import log from 'common/dev/Logger'

// TODO: Improve performance
// 		- Convert to stateless functional where possible
// 		- Else, convert everything to PureComponents where possible
// 		- Look for places to use shouldComponentUpdate() { return false }
// TODO: Inspect and clean up state

class JDotterPanel extends PureComponent {
	state = {
		horizSeqPosition: this.props.initHorizSeqPosition,
		vertSeqPosition: this.props.initVerticalSeqPosition,
		blackPoint: this.props.initBlackPoint,
		whitePoint: this.props.initWhitePoint,
	}

	constructor(props) {
		super(props)

		this.horizMin = 0
		this.horizMax = this.props.horizSeq.length - 1

		this.vertMin = 0
		this.vertMax = this.props.vertSeq.length - 1

		this.horizRevComp = this.getRevComp(this.props.horizSeq)
		this.vertRevComp = this.getRevComp(this.props.vertSeq)

		this.numVisible = 37
		this.baseSize = 22

		this.handleScrubBlack = this.handleScrubBlack.bind(this)
		this.handleScrubWhite = this.handleScrubWhite.bind(this)
		this.handleArrowLeft = this.handleArrowLeft.bind(this)
		this.handleArrowRight = this.handleArrowRight.bind(this)
		this.handleArrowUp = this.handleArrowUp.bind(this)
		this.handleArrowDown = this.handleArrowDown.bind(this)
		this.handleScrubA = this.handleScrubA.bind(this)
		this.handleScrubB = this.handleScrubB.bind(this)
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
		this.updateSeqPosition(undefined, Math.floor(seqPosition))
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
							handler: this.handleArrowLeft,
						},
						{
							key: 'ArrowRight',
							handler: this.handleArrowRight,
						},
						{
							key: 'ArrowUp',
							handler: this.handleArrowUp,
						},
						{
							key: 'ArrowDown',
							handler: this.handleArrowDown,
						},
					]}
				/>

				<Layers
					width={width + 25}
					height={height + 25}
					layers={[
						{
							content: (
								<Axis
									type="top"
									length={width}
									thickness={25}
									tickSize={100}
									scale={zoom}
								/>
							),
							leftOffset: 25,
						},
						{
							content: (
								<Axis
									type="left"
									length={width}
									thickness={25}
									tickSize={100}
									scale={zoom}
								/>
							),
							topOffset: 25,
						},
						{
							content: (
								<JDotterPlotResults
									{...{ width, height, pixels }}
									blackPoint={this.state.blackPoint}
									whitePoint={this.state.whitePoint}
								/>
							),
							leftOffset: 25,
							topOffset: 25,
						},
						{
							content: (
								<XYController
									{...{ width, height }}
									x={this.state.horizSeqPosition}
									y={this.state.vertSeqPosition}
									xValueRange={[0, this.horizMax]}
									yValueRange={[0, this.vertMax]}
									xhairsSize={80}
									onXhairsMove={this.handleXhairsMove.bind(
										this,
									)}
								/>
							),
							leftOffset: 25,
							topOffset: 25,
						},
					]}
				/>

				<div>
					<GreyMapTool
						width={200}
						height={50}
						blackPoint={this.state.blackPoint}
						whitePoint={this.state.whitePoint}
						onScrubBlack={this.handleScrubBlack}
						onScrubWhite={this.handleScrubWhite}
					/>
				</div>

				<div>
					<h2>Sequence</h2>
					<AlignmentTool
						seqA={horizSeq}
						seqAPosition={this.state.horizSeqPosition}
						seqAMin={this.horizMin}
						seqAMax={this.horizMax}
						onScrubA={this.handleScrubA}
						seqB={vertSeq}
						seqBPosition={this.state.vertSeqPosition}
						seqBMin={this.vertMin}
						seqBMax={this.vertMax}
						onScrubB={this.handleScrubB}
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
