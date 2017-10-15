import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'
import ConvertMenuData from './middleware/convert_menudata'
import request from 'axios'
var format_menudata;

function load() {
  ReactDOM.render(
    <Root menu={format_menudata} />,
    document.getElementById('root')
  )
}
// importMenuData('http://localhost:4453/menudata.json')
importMenuData('http://serencast.com/HikaruCast/Feed/json')

function importMenuData(url) {
  request.get(url)
  .then(res => {
    console.log(res.data)
    format_menudata = ConvertMenuData(res.data)
    load()
  })
  .catch(err => {
    console.log(err)
  })
}
