import React, { Component } from 'react'
import Slider from 'react-slick'
import classNames from 'classnames'
import MainItem from './MainItem'

export class SlideMenu extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    setTimeout(()=> {
      this.refs.slider.slickGoTo(this.props.position[0])
    },0)
  }
  render() {
    const items = this.props.menu.map((item, i) => {
      const item_cx = classNames({
        'mainitem': true,
        'selected': this.props.position[0] === i
      })
      return (
        <div className={item_cx} key={i}>
          <div className="inner">
            <img src="./image/len.png" />
            <div className="title">{item.title}</div>
            <div className="description">{item.description || "description"}</div>
          </div>
        </div>
      )
    })
    const settings = {
      className: 'center',
      centerMode: true,
      centerPadding: '200px',
      slidesToShow: 4,
      slidesToScroll: 1,
      vertical: true,
      verticalSwiping: false,
      infinite: false,
      speed: 200,
      arrows:false,
      accessibility:false
    }
    return (
      <div className='mainmenu'>
        <Slider ref='slider' {...settings}>
        {items}
        </Slider>
      </div>
    )
  }
}

export default SlideMenu
