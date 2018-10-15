import React from 'react'

const SequenceList = props => (
	<select
		onChange={props.onChange}
		style={{ width: '200px' }}
		size="10"
		multiple
	>
		{props.seqNames.map((name, i) => (
			<option key={i} value={i}>
				{name}
			</option>
		))}
	</select>
)

export default SequenceList
