export default function convert_menudata(data) {
  // ReturnItemを追加する(第二階層以降)
  for(let m of data) addReturnItem(m.children)
  // positionを振る
  addItemPosition([], data)
  return data
}

function addItemPosition(prefix, items) {
  for(let a in items) {
    items[a].position = prefix.concat([Number(a)])
    if(items[a].children) {
      addItemPosition(items[a].position, items[a].children)
    }
  }
  return items
}

function addReturnItem(items) {
  const return_data = {
    "title": "Return",
    "image": "",
    "type": "return"
  }
  items.unshift(return_data)
  for(let i of items) {
    if(i.children) addReturnItem(i.children)
  }
  return items
}
