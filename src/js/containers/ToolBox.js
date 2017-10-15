import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export class ToolBox extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    render() {
        const { changeSrcURL } = this.props
        return (
            <div id="toolbox">
                <input type="text" ref="inputText" defaultValue="HikaruCast/Feed" />
                <div className="loadButton" onClick={e => changeSrcURL(e, ReactDOM.findDOMNode(this.refs.inputText).value)}>change</div>
            </div>
        )
    }
}

export default ToolBox
