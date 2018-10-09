import React from 'react'

const FileList = props =>
	<select style={{ width: '200px' }} size="10" multiple>
		{props.files.map((file, i) => (
			<option key={i} value={file.name}>
				{file.name}
			</option>
		))}
	</select>

export default FileList