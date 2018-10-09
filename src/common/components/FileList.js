// TODO: Combine with SequenceList

import React from 'react'

const FileList = props => (
	<select
		onChange={props.onChange}
		style={{ width: '200px' }}
		size="10"
		multiple
	>
		{props.files.map((file, i) => (
			<option key={i} value={i}>
				{file.name}
			</option>
		))}
	</select>
)

export default FileList
