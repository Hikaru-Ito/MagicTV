import React, { Component } from 'react'
import classNames from 'classnames'
import Items from '../containers/Items'

export class SubItem extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const items = (() => {
      if(this.props.position.length <= this.props.item.position.length) return ""
      var sl = false
      for(let i in this.props.item.position) sl = this.props.position[i] === this.props.item.position[i]
      if(!sl) return ""
      return ( <Items position={this.props.position} now_playing={this.props.now_playing} items={this.props.item.children || []}/> )
    })()
    const item_cx = classNames({
      'item': true,
      'selected': JSON.stringify(this.props.position) === JSON.stringify(this.props.item.position)
    })
    const playing_icon = (() => {
      if(JSON.stringify(this.props.now_playing) === JSON.stringify(this.props.item.position)) {
        return ( <img src="http://localhost:4453/Images/loading.gif" className="playing_icon" /> )
      } else {
        return ""
      }
    })()
    const item_thum_style = {
      background:`url(${this.props.item.image || ''}) center center`,
      backgroundSize:'cover'
    }
    return (
      <div className={item_cx}>
        <div className="inner">
          <div className="thum" style={item_thum_style}></div>
          <div className="title">{this.props.item.title}</div>
          {playing_icon}
        </div>
        {items}
      </div>
    )
  }
}

export default SubItem
