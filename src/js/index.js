import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'
import MenuData from '../../menudata.json'
import ConvertMenuData from './middleware/convert_menudata'
import request from 'axios'

var format_menudata = ConvertMenuData(MenuData.menu)
console.log(format_menudata)

function load() {
  ReactDOM.render(
    <Root menu={format_menudata} />,
    document.getElementById('root')
  )
}
importMenuData('http://localhost:1126/contents/data.json')

function importMenuData(url) {
  request.get(url)
  .then(res => {
    console.log(res.data.menu)
    format_menudata = ConvertMenuData(res.data.menu)
    load()
  })
  .catch(err => {
    console.log(err)
  })
}
