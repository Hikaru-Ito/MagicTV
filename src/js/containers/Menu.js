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
          <Items position={this.props.position} items={this.props.menu[this.props.position[0]].children || {}} />
      )
    })()
    const subitems_cx = classNames({
      sub_items: true,
      hide: !subitems
    })
    return (
      <div id="menu">
        <SlideMenu menu={this.props.menu} position={this.props.position} />
        <div className={subitems_cx}>{subitems}</div>
      </div>
    )
  }
}
export default Menu
