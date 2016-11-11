import React, { Component } from 'react'
import classNames from 'classnames'

export class Screen extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('Menu mounted')
  }

  componentDidUpdate() {
    // this.refs.webview.loadURL('https://apple.com/')
    // https://abema.tv/now-on-air/abema-news
  }

  loadURL(url) {
    console.log(url)
    this.refs.webview.loadURL(url)
  }

  render() {
    return (
      <div id="screen">
        <webview id="webview" ref='webview' src="https://apple.com/"></webview>
        <div className="iframe-cover"></div>
      </div>
    )
  }
}
export default Screen
