import React, { Component } from 'react'
import Items from '../containers/Items'

export class MainItem extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <h4>{this.props.content.title}</h4>
      </div>
    )
  }
}
export default MainItem
