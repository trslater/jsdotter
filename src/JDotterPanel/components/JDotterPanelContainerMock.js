import React, { Component } from 'react'

import JDotterPanel from 'JDotterPanel/components/JDotterPanel'

import dotterData from 'jdotter-api-mock.json'

import log from 'common/dev/Logger'

// TODO: Load data from API
// TODO: Missing features
//          - Zooming
//          - Score matrix (what is this?)
//          - Plot info
// TODO: What are features?

class JDotterPanelContainer extends Component {
    state = {
        dataLoaded: false
    }
    
    componentDidMount() {
        // TODO: fetch stuff from JDotter API

        this.horizSeqNames = ['Super virus X', 'Ultra virulent strain from hell']
        this.vertSeqNames = ['Killer mutant flu', 'Common cold']

        this.setState({ ...this.state, dataLoaded: true })
    }

	render() {
        log.debug('Rendering JDotterPanelContainerMock')
        return (
            this.state.dataLoaded &&
                <JDotterPanel
                    // Sequences
                    horizSeqNames={this.horizSeqNames}
                    horizSeq={dotterData.horizontal}
                    vertSeqNames={this.vertSeqNames}
                    vertSeq={dotterData.vertical}

                    // Plot data
                    zoom={dotterData.zoom}
                    windoSize={dotterData.windoSize}
                    width={dotterData.width}
                    height={dotterData.height}
                    pixelFactor={dotterData.pixelFactor}
                    scoreMatrixName={dotterData.scoreMatrixName}
                    scoreMatrix={dotterData.scoreMatrix}

                    // Intial state
                    initHorizSeqPosition={0}
                    initVerticalSeqPosition={0}
                    initBlackPoint={0}
                    initWhitePoint={1}

                    pixels={dotterData.pixels}
                />
		)
	}
}

export default JDotterPanelContainer
