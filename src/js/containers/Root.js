import React, { Component } from 'react'
import classNames from 'classnames'
import Menu from './Menu'
import Screen from './Screen'
import { downToPosition, enterPosition, getItemByPosition } from '../middleware/positions'
import SocketIO from 'socket.io-client'

const server_url = "http://localhost:8931"
const socket = SocketIO(server_url)
const linda = new Linda().connect(socket)
const ts = linda.tuplespace("magicknock")

linda.io.on("connect", function(){
  console.log('connect')
})

export class Root extends Component {

  constructor(props) {
    super(props)
    this.state = {
      position: [0],
      menu: true
    }
  }

  componentDidMount() {
    // Keybind
    window.addEventListener('keydown', this.handleKeydown.bind(this))
    // LindaServer
    this.startWatchLinda()
  }

  startWatchLinda() {
    ts.watch({type:'knock'}, (err, tuple)=> {
      if(!tuple.data.cmd) return
      if(tuple.data.cmd == 'move') this.movePosition()
      if(tuple.data.cmd == 'enter') this.enterPosition()
    })
  }

  hideMenu() {
    this.setState({ menu: false })
  }

  showMenu() {
    this.setState({ menu: true })
  }

  movePosition() {
    this.showMenu()
    this.setState({
      position: downToPosition(this.state.position, this.props.menu)
    })
  }

  enterPosition() {
    let new_pos = enterPosition(this.state.position, this.props.menu)
    if(new_pos === 'play') {
      this.playContents(getItemByPosition(this.state.position, this.props.menu))
      return
    }
    this.setState({
      position: new_pos
    })
  }

  playFeedback({ title }) {
    speechSynthesis.cancel()
    let synthesis = new SpeechSynthesisUtterance()
    synthesis.lang = 'ja-JP'
    synthesis.rate = 1.0
    synthesis.text = title
    speechSynthesis.speak(synthesis)
  }


  playContents({ type, url }) {
    // Typeによって、URLの実行方法を変更する
    console.log(type)
    switch(type) {
      case 'web':
        this.hideMenu()
        this.refs.screen.loadURL(url)
      break;

      case 'script':
        this.runJS(url)
      break;

      default:
        console.log('not found type')
    }
  }

  runJS(url) {
    var script = document.createElement("script")
    script.setAttribute("src", url)
    window.document.body.appendChild(script);
  }

  handleKeydown(e) {
    if(e.key == 'Enter') {
      this.enterPosition()
    } else {
      this.movePosition()
    }
    console.log(getItemByPosition(this.state.position, this.props.menu))
  }

  render() {
    this.playFeedback(getItemByPosition(this.state.position, this.props.menu))
    const cx = this.state.menu ? classNames({
      main_menu: this.state.position.length === 1,
      full_menu: this.state.position.length > 1
    }) : 'full_screen'
    return (
      <div id="container" className={cx}>
        <Screen ref="screen" />
        <Menu
          {...this.state}
          menu={this.props.menu}
        />
      </div>
    )
  }
}
export default Root
