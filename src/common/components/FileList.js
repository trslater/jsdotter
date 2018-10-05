import React, { Component } from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
// import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
// import Divider from '@material-ui/core/Divider'
// import InboxIcon from '@material-ui/icons/Inbox'
// import DraftsIcon from '@material-ui/icons/Drafts'

class FileList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            files: this.props.files,
            listItems: [],
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({ ...this.state, files: newProps.files})
    }
    
    render() {
        console.log(this.state.files)
        const listItems = this.state.files.map((file, i) =>
            <ListItem key={i} button>
                {/* <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon> */}
                <ListItemText primary={file.name} />
            </ListItem>
        )
        return (
            <div>
                <List component="nav">{listItems}</List>
            </div>
        )
    }
}

export default FileList