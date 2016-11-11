export function downToPosition(position, menudata) {
  var assign_position = position.concat()
  var list = menudata
  for(let i in [...Array(assign_position.length-1).keys()]) {
    if(!list[assign_position[i]].children) return false
    list = list[assign_position[i]].children
  }
  assign_position[assign_position.length-1] = list.length-1 === assign_position[assign_position.length-1] ? 0 : assign_position[assign_position.length-1] + 1
  return assign_position
}


export function enterPosition(position, menudata) {
  var assign_position = position.concat()
  if(assign_position.length > 1 && assign_position[assign_position.length-1] == 0) {
    return returnPosition(assign_position, menudata)
  }
  let now_item = getItemByPosition(assign_position, menudata)
  if(now_item.children) {
    assign_position.push(0)
  } else {
    return 'play'
  }
  return assign_position
}

export function returnPosition(position, menudata) {
  var assign_position = position.concat()
  assign_position.pop()
  return assign_position
}

export function getItemByPosition(position, menudata) {
  var assign_position = position.concat() // [1,1,2]
  var assign_menudata = Object.assign({}, menudata)
  var item = assign_menudata
  for(let i in [...Array(assign_position.length-1).keys()]) {
    if(!item[assign_position[i]].children) return false
    item = item[assign_position[i]].children
  }
  return item[assign_position[assign_position.length-1]]
}
