import React, { Component } from 'react'
import classNames from 'classnames'
import Menu from './Menu'
import Screen from './Screen'
import ToolBox from './ToolBox'

import { downToPosition, enterPosition, getItemByPosition } from '../middleware/positions'
import loadSerenData from '../middleware/load_content_data'

var ipcRenderer = window.require('electron').ipcRenderer

export class Root extends Component {

  constructor(props) {
    super(props)
    this.state = {
      position: [0],
      menu: true,
      now_playing: null,
        menu_content: this.props.menu
    }
      this.handleChangeSrcURL = this.handleChangeSrcURL.bind(this)
  }

  componentDidMount() {
    // Keybind
    window.addEventListener('keydown', this.handleKeydown.bind(this))
    this.watchControllerCmd()
  }

  watchControllerCmd() {
    ipcRenderer.on('cmd', (event, message) => {
      if(message == 'move') this.movePosition()
      if(message == 'enter') this.enterPosition()
    })
  }

  showMenu() {
    this.setState({ menu: true })
  }

  hideMenu() {
    this.setState({ menu: false })
  }

  movePosition() {
    // MENUが隠れた状態だったらMENUを表示する
    if (this.state.menu) {
      this.setState({
        position: downToPosition(this.state.position, this.state.menu_content)
      })
    } else {
      this.showMenu()
    }
  }

  enterPosition() {
    let new_pos = enterPosition(this.state.position, this.state.menu_content)
    //全画面表示しているときに強打タップすると次のコンテンツを再生する
    if(new_pos === 'play' && !this.state.menu) {
      let position = downToPosition(this.state.position, this.state.menu_content)
      new_pos = enterPosition(position, this.state.menu_content)
      if (new_pos === 'play') {
        this.setState({ position: position })
        this.playContents(getItemByPosition(position, this.state.menu_content))
        return
      }
      this.setState({
        position: position,
        menu: true
      })
      return
    } else if(new_pos === 'play') {
      this.playContents(getItemByPosition(this.state.position, this.state.menu_content))
      return
    }
    this.setState({
      position: new_pos
    })
  }

  playFeedback({ title }) {
    ipcRenderer.send('speech-message', title)
  }

  playContents({ position, type, url }) {
    switch(type) {
      case 'web':
        this.hideMenu()
        this.refs.screen.loadURL(url)
      break;

      case 'script':
        this.runJS(url)
      break;

      default:
        this.hideMenu()
        this.refs.screen.loadURL(url)
    }
    this.setState({
      now_playing: position
    })
  }

  runJS(url) {
    var script = document.createElement("script")
    script.setAttribute("src", url)
    window.document.body.appendChild(script);
  }

  handleKeydown(e) {
    if(e.key == 'Enter') {
      this.enterPosition()
    } else if(e.key == 'ArrowDown'){
      this.movePosition()
    }
  }

  handleChangeSrcURL(e, value) {
      let url = `http://serencast.com/${value}/json`
      console.log(url);
      loadSerenData(url).then(data => {
          this.setState({menu_content: data, position: [0]})
      }).catch(err => {
          console.log('ERR')
          console.log(err)
      });
  }

  render() {
    const now = getItemByPosition(this.state.position, this.state.menu_content)
    this.playFeedback(now)
    const cx = this.state.menu ? classNames({
      main_menu: this.state.position.length === 1,
      full_menu: this.state.position.length > 1
    }) : 'full_screen'
    return (
      <div id="container" className={cx}>
          <ToolBox changeSrcURL={this.handleChangeSrcURL} />
          <Screen ref="screen" />
        <Menu
          {...this.state}
          menu={this.state.menu_content}
        />
      </div>
    )
  }
}
export default Root
