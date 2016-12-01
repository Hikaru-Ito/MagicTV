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
    try {
      this.refs.webview.loadURL(url)
    } catch(e) {
      console.log(e)
    }
  }

  render() {
    return (
      <div id="screen">
        <webview id="webview" ref='webview' src="http://localhost:1126/ma_contents/Movie/weatherd.html"></webview>
        <div className="iframe-cover"></div>
      </div>
    )
  }
}
export default Screen
