import React, { Component } from 'react'
import classNames from 'classnames'
import MainItem from '../components/MainItem'
import Items from './Items'
import Slider from 'react-slick'
import SlideMenu from '../components/SlideMenu'

export class Menu extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('Menu mounted')
  }

  render() {
    // 2階層目以降の場合、サブメニューを表示する
    const subitems = (()=> {
      if(this.props.position.length == 1) {
        return false
      }
      return (
          <Items position={this.props.position} now_playing={this.props.now_playing} items={this.props.menu[this.props.position[0]].children || {}} />
      )
    })()
    const subitems_cx = classNames({
      sub_items: true,
      hide: !subitems
    })
    const position_sum = (()=> {
      var s=0
      for(let i in this.props.position) {
        if(i > 0) s += this.props.position[i] + 1
      }
      return s
    })()
    console.log(position_sum)
    const subitems_style = {
      top: `${400-(position_sum*92)}px`
    }
    return (
      <div id="menu">
        <SlideMenu menu={this.props.menu} position={this.props.position} />
        <div className={subitems_cx} style={subitems_style}>{subitems}</div>
      </div>
    )
  }
}
export default Menu
