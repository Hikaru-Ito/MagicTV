import React, { Component } from 'react'
import SubItem from '../components/SubItem'

export class Items extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const items = this.props.items.map((item, i) => {
      return (
        <SubItem key={i} item={item} position={this.props.position} />
      )
    })
    // [1,1,2]のとき、[1,1,0][1,1,1][1,1,2][1,1,3]
    return (
      <div className="items">
        {items}
      </div>
    )
  }
}

export default Items
