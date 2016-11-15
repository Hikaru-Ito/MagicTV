import React, { Component } from 'react'
import classNames from 'classnames'
import Menu from './Menu'
import Screen from './Screen'
import { downToPosition, enterPosition, getItemByPosition } from '../middleware/positions'
import { connectLinda } from '../middleware/linda'

const { linda, ts } = connectLinda('http://localhost:8931', 'magicknock')

linda.io.on("connect", function(){
  console.log('connect')
})

var synthesis = new SpeechSynthesisUtterance()
synthesis.lang = 'ja-JP'
synthesis.rate = 1.0

export class Root extends Component {

  constructor(props) {
    super(props)
    this.state = {
      position: [0],
      menu: true,
      now_playing: null
    }
  }

  componentDidMount() {
    // Keybind
    window.addEventListener('keydown', this.handleKeydown.bind(this))
    // LindaServer
    this.startWatchLinda()
  }

  startWatchLinda() {
    if(!ts) return
    ts.watch({type:'knock'}, (err, tuple)=> {
      if(!tuple.data.cmd) return
      if(tuple.data.cmd == 'move') this.movePosition()
      if(tuple.data.cmd == 'enter') this.enterPosition()
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
        position: downToPosition(this.state.position, this.props.menu)
      })
    } else {
      this.showMenu()
    }
  }

  enterPosition() {
    let new_pos = enterPosition(this.state.position, this.props.menu)
    //全画面表示しているときに強打タップすると次のコンテンツを再生する
    if(new_pos === 'play' && !this.state.menu) {
      let position = downToPosition(this.state.position, this.props.menu)
      new_pos = enterPosition(position, this.props.menu)
      if (new_pos === 'play') {
        this.setState({ position: position })
        this.playContents(getItemByPosition(position, this.props.menu))
        return
      }
      this.setState({
        position: position,
        menu: true
      })
      return
    } else if(new_pos === 'play') {
      this.playContents(getItemByPosition(this.state.position, this.props.menu))
      return
    }
    this.setState({
      position: new_pos
    })
  }

  playFeedback({ title }) {
    speechSynthesis.cancel()
    synthesis.text = title
    speechSynthesis.speak(synthesis)
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
        console.log('not found type')
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
    } else {
      this.movePosition()
    }
    console.log(getItemByPosition(this.state.position, this.props.menu))
  }

  render() {
    const now = getItemByPosition(this.state.position, this.props.menu)
    this.playFeedback(now)
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
