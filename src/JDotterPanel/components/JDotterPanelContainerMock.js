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
	constructor(props) {
        super(props)

        this.state = {
            dataLoaded: false
        }
    }
    
    componentDidMount() {
        // TODO: fetch stuff from JDotter API
        
        this.horizSeqNames = ['Super virus X', 'Ultra virulent strain from hell']
        this.vertSeqNames = ['Killer mutant flu', 'Common cold']

        // TODO: Make this neater
        this.horizSeq = dotterData.horizontal
        this.vertSeq = dotterData.horizontal
        this.zoom = dotterData.zoom
        this.windowSize = dotterData.windowSize
        this.width = dotterData.width
        this.height = dotterData.height
        this.pixelFactor = dotterData.pixelFactor
        this.scoreMatrixName = dotterData.scoreMatrixName
        this.scoreMatrix = dotterData.scoreMatrix

        // Make image
        this.image = new Image()
        this.image.src = 'data:image/png;base64,' + dotterData.pixels

        log.debug('Everything loaded')
        this.setState({ ...this.state, dataLoaded: true })
    }

	render() {
        log.debug('rendering JDotter Panel Container')
        return (
            <div>
                {this.state.dataLoaded &&
                    <JDotterPanel
                        // Sequences
                        horizSeqNames={this.horizSeqNames}
                        horizSeq={this.horizSeq}
                        vertSeqNames={this.vertSeqNames}
                        vertSeq={this.vertSeq}

                        // Plot data
                        zoom={this.zoom}
                        windoSize={this.windoSize}
                        width={this.width}
                        height={this.height}
                        pixelFactor={this.pixelFactor}
                        scoreMatrixName={this.scoreMatrixName}
                        scoreMatrix={this.scoreMatrix}

                        // Intial state
                        initHorizSeqPosition={0}
                        initVerticalSeqPosition={0}
                        initBlackPoint={0}
                        initWhitePoint={1}

                        image={this.image}
                    />
                }
            </div>
		)
	}
}

export default JDotterPanelContainer
